export async function getSong(sourceURL: URL) {
  const resp = await fetch('https://songwhip.com/', {
    method: 'POST',
    body: JSON.stringify({
      url: sourceURL.href,
    }),
  })
  const data: any = await resp.json() // eslint-disable-line
  if (data?.status === 'error') {
    return { url: '' }
  }
  const { name, url } = data
  return { name, url }
}
