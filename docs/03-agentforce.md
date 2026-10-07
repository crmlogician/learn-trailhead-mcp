# Step 3 · Connect Agentforce

> Demo section: `#clients` in [`site/index.html`](../site/index.html) → choose **🤖 Agentforce**

Register Trailhead MCP in your Salesforce org so your Agentforce agents can ground their answers in official Trailhead content.

**You need:** a Salesforce org with Setup access.
**Best for:** grounding your agents in trusted content.

## Set it up

1. In **Setup**, search `MCP` in Quick Find and open **Registered MCP Servers**.
2. On the **Agentforce Registry** page, click **New**, then **Register MCP Server**.
3. Name it, add a description, set the **Server URL** to the endpoint below, and set **Authentication** to **No Authentication**.
4. Click **Create and Continue**. Under **Tools**, add the tools you want, then **Allow and Continue**.
5. Pick any policies you need (optional) and click **Save**.

**Server URL**

```
https://mcp.trailhead.salesforce.com/mcp
```

## What to do

**Try this prompt**

> Ground your agent so it answers learning questions with cited Trailhead modules.

**Ideas for agents**

- Help desk agents grounded in Trailhead best practices
- Onboarding agents that point new hires to the right content
- Enablement agents that cite official modules

## See what it returns (sample)

| Prompt | Tool call | Returns |
|---|---|---|
| Find beginner content on Salesforce Flow | `content_search({ "query": "Salesforce Flow", "level": "Foundational" })` | Build Flows with Flow Builder (Trail), Flow Fundamentals (Superbage) |
| Fetch the 'Apex Triggers' badge | `fetch_content({ "name": "Apex Triggers" })` | Apex Triggers: full badge content as Markdown |
| Find Agentforce content for developers | `content_search({ "query": "Agentforce", "role": "Developer" })` | Build Agentforce Solutions with Pro-Code Tools (Badge) |

These are illustrative samples; real results come from the live Trailhead catalog.

## Summary

| | |
|---|---|
| **Setup** | 5 steps in Setup → Registered MCP Servers |
| **Endpoint** | `https://mcp.trailhead.salesforce.com/mcp` |
| **Authentication** | None |
| **Goal** | Ground your agent so it answers learning questions with cited Trailhead modules. |
| **What you can do now** | Search Trailhead by topic, role and level, or fetch a full badge by name. Say "Use Trailhead MCP to…" for best results. |
| **Next step** | Add the Trailhead tools to an agent topic and test it in Agentforce Builder. |

## Presenter notes

1. In **Hands-on with clients**, click the **Agentforce** card. The tracker moves to **Set it up**.
2. Tick each setup step as you show it in a live org. Your progress is kept if you switch clients and come back.
3. Click the sample chips to show what `content_search` and `fetch_content` return.
4. Click **See summary →** to recap the endpoint, the first prompt and what the agent can do now.