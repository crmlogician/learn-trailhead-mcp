# Step 2 · Hands-on with supported clients

> Demo section: `#clients` in [`site/index.html`](../site/index.html)

Trailhead MCP works with any AI client that can connect to a remote MCP server over **Streamable HTTP**. Every client uses the same endpoint:

```
https://mcp.trailhead.salesforce.com/mcp
```

The demo walks through three stages for each client: **Choose a client → Set it up → Summary**. This step covers the first stage, choosing a client.

## Supported clients

| Client | Best for | You need |
|---|---|---|
| 🤖 [**Agentforce**](03-agentforce.md) | Ground your agents in trusted content | A Salesforce org with Setup access |
| 🧠 [**Claude**](04-claude-code.md) (web, Desktop & Claude Code) | Chat on the web or desktop, or use it in your terminal | A Claude account, or Claude Code |
| 💬 [**Slackbot**](05-slackbot.md) | Ask Trailhead from your team chat | Slack workspace and admin approval |
| ⌨️ **Cursor** | Look things up while you code | Cursor installed |

## Other clients

Any client that supports Streamable HTTP should work with the same endpoint, including **VS Code with GitHub Copilot**.

## How to choose

- **Presenting to admins or business users?** Use Slackbot, Agentforce or Claude on the web, so nobody needs to install anything.
- **Presenting to developers?** Use Claude Code or Cursor, so they see answers next to their code.
- **Building agents?** Use Agentforce, so the agent's answers cite Trailhead modules.

## Presenter notes

1. From the intro, click **Next: hands-on with clients**, or open the **Hands-on with clients** tab.
2. Point out the three-stage tracker at the top: choose, set up, summary.
3. Read across the cards and match one to your audience using *How to choose*.
4. Mention that any other client that supports Streamable HTTP works with the same URL.

Setup for each client is covered in its own step.