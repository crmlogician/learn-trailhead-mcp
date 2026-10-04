# Step 1 · Intro & overview

> Demo section: `#intro` in [`site/index.html`](../site/index.html)

**Trailhead MCP** is a free, open server that lets an AI assistant search and read Trailhead badges and trails, so its answers cite real learning content instead of guesses.

## Server endpoint

```
https://mcp.trailhead.salesforce.com/mcp
```

| | |
|---|---|
| **Free** | No account and no sign-in for public content. |
| **Always on** | Nothing to host or deploy. |
| **Fresh daily** | Content refreshes once a day. |

## What is MCP?

The **Model Context Protocol** is a standard way for AI assistants such as Slackbot, Claude or Cursor to connect to outside tools and data, so they can pull in fresh information as they answer.

## Who is it for?

- Enablement teams building learning experiences
- Trailblazers who want learning on demand
- Admins and developers working in Claude, Cursor or VS Code
- Agent builders grounding answers in trusted content

## The two tools

| Tool | What it does |
|---|---|
| `content_search` | Find badges, trails, and (as they arrive) Journeys and Superbadges by topic. Filter by **role** and **level**. |
| `fetch_content` | Get the full content of a named badge or trail, formatted as Markdown for AI. |

## Good to know

- You can't earn badges or track progress through MCP.
- It doesn't touch your private learner data.
- Journeys and Superbadges are listed as coming soon.

## Presenter notes

1. Open the page and show the endpoint. Click **Copy** and point out that this one URL is all a client needs.
2. Walk through the three cards: free, always on, fresh daily.
3. Explain MCP in one sentence, then show the two tools. Every demo later uses one of them.
4. Call out the limits under **Good to know** so nobody expects badge progress tracking.