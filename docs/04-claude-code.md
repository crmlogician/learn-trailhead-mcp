# Step 4 · Connect Claude (web, Desktop & Claude Code)

> Demo section: `#clients` in [`site/index.html`](../site/index.html) → choose **🧠 Claude**

Add Trailhead MCP to Claude as a custom connector for chat on claude.ai and Claude Desktop, or to Claude Code in your terminal.

**You need:** a Claude account (claude.ai or Claude Desktop), or Claude Code.
**Best for:** chatting in the browser or desktop app, or looking things up from your terminal.

## Set it up

### Claude on the web and Claude Desktop

Claude on the web and Claude Desktop share the same connectors. Add it once at [claude.ai](https://claude.ai) and it also appears in Desktop.

1. Open **Settings → Connectors** and click **Add custom connector**.
2. Name it `Trailhead`, paste the **Connector URL** below and click **Add**. No authentication is needed.
3. In a chat, open the **+** (tools) menu and turn on **Trailhead**.

**Connector URL**

```
https://mcp.trailhead.salesforce.com/mcp
```

> On a Team or Enterprise plan, an owner may need to add the connector under **Organization settings → Connectors** before members can turn it on.

### Claude Code

4. Run the command below in your terminal. The `user` scope makes it available in every project.

```bash
claude mcp add --transport http --scope user trailhead https://mcp.trailhead.salesforce.com/mcp
```

Check it's connected with `claude mcp list`, or type `/mcp` inside Claude Code.

## What to do

**Try this prompt**

> What does Trailhead say about Apex bulkification best practices?

**Tips**

- You should see Claude call a Trailhead tool and cite Trailhead content in the answer.
- No Trailhead tools in chat? Check the connector is turned on in the **+** menu for that conversation.
- Claude Code not working? Check the command has `--transport http`, then run `claude mcp list`.

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
| **Setup** | 4 steps: add a custom connector and turn it on in chat for claude.ai and Desktop, or run one terminal command for Claude Code |
| **Endpoint** | `https://mcp.trailhead.salesforce.com/mcp` |
| **Transport** | `http` (Streamable HTTP), no authentication |
| **First prompt** | What does Trailhead say about Apex bulkification best practices? |
| **What you can do now** | Search Trailhead by topic, role and level, or fetch a full badge by name. Say "Use Trailhead MCP to…" for best results. |

## Presenter notes

1. In **Hands-on with clients**, click the **Claude** card.
2. For business users, demo on **claude.ai**. It needs no install, and the connector also appears in Claude Desktop.
3. For developers, run the `claude mcp add` command live. It's the fastest setup of any client.
4. Ask the prompt and point out the Trailhead tool call and citations in the answer.
5. Click **See summary →** to recap.
