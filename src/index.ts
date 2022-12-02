export interface Env {
  slackToken: string
}

async function linkTitle(url: URL) {
  let title = ''
  let resp = await fetch(url.href, { redirect: 'follow' })

  if (resp.redirected) {
    resp = await fetch(resp.url)
  }

  const rewriter = new HTMLRewriter() // TODO: #1 figure out how HTMLRewriter() really works
  await rewriter
    .on('*', {
      element(el) {
        const getTitle = el.getAttribute('title')
        if (getTitle && !getTitle.includes('YouTube')) {
          title = getTitle
        }
      },
    })
    .transform(resp)
    .text()
  return title
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const method = request.method

    if (method === 'POST') {
      const body: any = await request.json() // eslint-disable-line
      const challenge = body.challenge
      if (challenge) {
        return new Response(challenge, { status: 200 })
      }

      const event = body.event
      const { type, source, channel } = event

      if (type === 'link_shared' && source === 'conversations_history') {
        const { links } = event

        for (let index = 0; index < links.length; index++) {
          const element = links[index].url
          const url = new URL(element)
          console.log('incoming link: ', url)
          const title = await linkTitle(url)
          await fetch('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${env.slackToken}`,
            },
            body: JSON.stringify({
              channel,
              text: title,
            }),
          })
        }
        return new Response('ok', { status: 200 })
      }
    }
    return new Response('Hello World!')
  },
}
