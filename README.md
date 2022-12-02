# Slack Bot to Get Youtube Video Titles

This is an example Cloudflare Workers Slack App/Bot to retrieve titles of shared YouTube links and post them back to the channel. It uses the [Slack Events API](https://api.slack.com/events-api) to listen for and respond to events. This is just a quick and dirty Worker script. Things will probably break when YouTube does a slight change to their site. 🤷

The whole process was a bit confusing, I hope the steps below help you get started.

**Cloudflare Part:**

1. Clone this repo
2. Optionally make adjustments to `wrangler.toml` to add your own name, domain etc. or just deploy it with `npm run deploy`
3. Create the Slack App now to retrieve your OAuth token etc.
4. Add the OAuth token to your Cloudflare Worker secrets with `wrangler secret put slackToken`

**Slack Part:**

3. Create a new Slack App
4. Add these *features and functionality* from the Slack App information page:
   1. Event Subscriptions
   2. Bots
   3. Permissions
5. Note down the *OAuth Token* under *OAuth & Permissions*
6. Add the following *Bot Token Scopes*: `chat:write` and `links:read`
7. Add your Cloudflare Workers domain to *Event Subscriptions* and…
   1. Add `link_shared` as a *Bot User Event*
   2. add `youtube.com` and `youtu.be` to the *App unfurl domains*

**Resources:**

- [Link Shared Event Documentation](https://api.slack.com/events/link_shared)
- [links:read scope](https://api.slack.com/scopes/links:read)
- [chat:write scope](https://api.slack.com/scopes/chat:write)
