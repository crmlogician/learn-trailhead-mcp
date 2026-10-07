# Step 5 · Connect Slackbot

> Demo section: `#clients` in [`site/index.html`](../site/index.html) → choose **💬 Slackbot**

Add Trailhead MCP to Slackbot so your team can ask Trailhead questions right from Slack.

**You need:** a Slack workspace and admin approval.
**Best for:** asking Trailhead from your team chat.

## Set it up

1. Ask your **Slack admin** to enable the Trailhead MCP app for your workspace.
2. Go to [api.slack.com/apps](https://api.slack.com/apps), choose **Create New App**, then **From a manifest**, and pick your workspace.
3. Paste a manifest that turns MCP on and lists the Trailhead server with no authentication (key settings below), then create the app.
4. Open **Slackbot**, click the **App integrations** icon in the message box and add **Trailhead MCP**. Refresh Slack if you don't see the icon.
5. Under **Manage Apps**, open Trailhead MCP and set its tools to **Always allow**.

**Key manifest settings**

```
bot scopes: mcp:connect, commands
is_mcp_enabled: true
mcp_servers → Trailhead MCP
  url: https://mcp.trailhead.salesforce.com
  auth_type: no_auth
```

## What to do

**Try this prompt**

> Use Trailhead MCP to find beginner content on Salesforce Flow.

**Tips**

- **Always allow** stops Slackbot asking permission on every request.
- Icon missing? Hard refresh Slack (**Cmd+Shift+R** or **Ctrl+Shift+R**).

## See what it returns (sample)

| Prompt | Tool call | Returns |
|---|---|---|
| Find beginner content on Salesforce Flow | `content_search({ "query": "Salesforce Flow", "level": "Foundational" })` | Salesforce Flow badges (Badge), Flow trail for admins (Trail) |
| Fetch the 'Apex Triggers' badge | `fetch_content({ "name": "Apex Triggers" })` | Apex Triggers: full badge content as Markdown |
| Find Agentforce content for developers | `content_search({ "query": "Agentforce", "role": "Developer" })` | Get Started with Agentforce (Badge), Agentforce learning trail (Trail) |

These are illustrative samples; real results come from the live Trailhead catalog.

## Summary

| | |
|---|---|
| **Setup** | 5 steps: admin approval → app from manifest → add to Slackbot → Always allow |
| **Endpoint** | `https://mcp.trailhead.salesforce.com/mcp` |
| **Authentication** | None (`auth_type: no_auth`) |
| **First prompt** | Use Trailhead MCP to find beginner content on Salesforce Flow. |
| **What you can do now** | Search Trailhead by topic, role and level, or fetch a full badge by name. Say "Use Trailhead MCP to…" for best results. |
| **Next step** | Share the app with your channel so teammates can ask Trailhead too. |

## Presenter notes

1. In **Hands-on with clients**, click the **Slackbot** card.
2. Get admin approval before the demo. It's the step most likely to hold you up.
3. Show the manifest settings, then add the app in Slackbot and set **Always allow** so the live demo isn't interrupted by permission prompts.
4. Run the prompt in Slack, then click **See summary →** to recap.