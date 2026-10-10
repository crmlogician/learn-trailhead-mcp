# Step 5 · Connect Slackbot

> Demo section: `#clients` in [`site/index.html`](../site/index.html) → choose **💬 Slackbot**
>
> Source: [Trailhead MCP support page](https://trailhead.salesforce.com/support/mcp)

Add Trailhead MCP to Slackbot so your team can ask Trailhead questions right from Slack.

**You need:** a Slack workspace where you can create apps.
**Best for:** asking Trailhead from your team chat.

## Set it up

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and click **Create New App**.
2. Choose **From a manifest**, pick your workspace and click **Next**.
3. Paste the [Slack app manifest](#slack-app-manifest) below (JSON), review the settings on the summary, then click **Create**.
4. Open any **Slackbot** conversation and click the **App integrations** icon in the message box. Refresh Slack if you don't see it.
5. Find **Trailhead MCP** and click it to add it.
6. Go to **Manage Apps**, open **Trailhead MCP** and set all its tools to **Always allow**.

### Slack app manifest

On the demo site this block starts collapsed: use **Show more** / **Show less** to expand it and **Copy** to copy the whole manifest.

```json
{
  "display_information": {
    "name": "Trailhead MCP App",
    "description": "Interact with Trailhead via MCP",
    "background_color": "#1d7c00"
  },
  "features": {
    "bot_user": {
      "display_name": "Trailhead MCP App",
      "always_online": false
    }
  },
  "oauth_config": {
    "scopes": {
      "bot": ["mcp:connect", "commands"]
    },
    "pkce_enabled": false
  },
  "settings": {
    "org_deploy_enabled": false,
    "socket_mode_enabled": false,
    "token_rotation_enabled": false,
    "is_mcp_enabled": true
  },
  "mcp_servers": {
    "Trailhead MCP": {
      "url": "https://mcp.trailhead.salesforce.com",
      "auth_type": "no_auth"
    }
  }
}
```

**The settings that matter**

| Setting | Value | Why |
|---|---|---|
| `oauth_config.scopes.bot` | `mcp:connect`, `commands` | Lets the app connect to MCP servers |
| `settings.is_mcp_enabled` | `true` | Turns MCP on for the app |
| `mcp_servers."Trailhead MCP".url` | `https://mcp.trailhead.salesforce.com` | The Trailhead MCP server |
| `mcp_servers."Trailhead MCP".auth_type` | `no_auth` | Trailhead MCP needs no authentication |

## What to do

**Try this prompt**

> Use Trailhead MCP to find beginner content on Salesforce Flow.

**Tips**

- **Always allow** stops Slackbot asking permission on every request.
- Icon missing? Hard refresh Slack (**Cmd+Shift+R** on Mac or **Ctrl+Shift+R** on Windows/Linux).
- Can't create apps in your workspace? Ask your Slack admin for access.

## See what it returns (sample)

| Prompt | Tool call | Returns |
|---|---|---|
| Find beginner content on Salesforce Flow | `content_search({ "query": "Salesforce Flow", "level": "Foundational" })` | Build Flows with Flow Builder (Trail), Flow Fundamentals (Superbadge) |
| Fetch the 'Apex Triggers' badge | `fetch_content({ "name": "Apex Triggers" })` | Apex Triggers: full badge content as Markdown |
| Find Agentforce content for developers | `content_search({ "query": "Agentforce", "role": "Developer" })` | Build Agentforce Solutions with Pro-Code Tools (Learning path) |

These are illustrative samples; real results come from the live Trailhead catalog.

## Summary

| | |
|---|---|
| **Setup** | 6 steps: create app from manifest → add Trailhead MCP in Slackbot → Always allow |
| **Endpoint** | `https://mcp.trailhead.salesforce.com/mcp` |
| **Authentication** | None (`auth_type: no_auth`) |
| **First prompt** | Use Trailhead MCP to find beginner content on Salesforce Flow. |
| **What you can do now** | Search Trailhead by topic, role and level, or fetch a full badge by name. Say "Use Trailhead MCP to…" for best results. |
| **Next step** | Share the app with your channel so teammates can ask Trailhead too. |

## Presenter notes

1. In **Hands-on with clients**, click the **Slackbot** card.
2. Before the demo, check you can create apps in the workspace. If not, get your Slack admin to grant access, since this is the step most likely to hold you up.
3. Click the **api.slack.com/apps** link in step 1, then click **Show more** on the manifest and **Copy** it to paste into Slack.
4. Add the app in Slackbot and set **Always allow** so permission prompts don't interrupt the live demo.
5. Run the prompt in Slack, then click **See summary →** to recap.
