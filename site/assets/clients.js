/* Step 2 · Hands-on with supported clients.
   One entry per client. A client's own step PR adds its setup details
   (how, code, say, tips, and optional link); until then its card shows "Setup coming soon". */
var CL = [
  { n: "Agentforce",           ic: "🤖", best: "Ground your agents in trusted content",   need: "A Salesforce org with Setup access",
    how: [
      "In Setup, search 'MCP' in Quick Find and open Registered MCP Servers.",
      "On the Agentforce Registry page, click New, then Register MCP Server.",
      "Name it, add a description, set the Server URL to the endpoint above, and set Authentication to No Authentication.",
      "Click Create and Continue. Under Tools, add the tools you want, then Allow and Continue.",
      "Pick any policies you need (optional) and click Save."
    ],
    code: [["Server URL", URL_]],
    say: "Ground your agent so it answers learning questions with cited Trailhead modules.", sayLbl: "Goal",
    next: "Add the Trailhead tools to an agent topic and test it in Agentforce Builder.",
    tips: [
      "Help desk agents grounded in Trailhead best practices",
      "Onboarding agents that point new hires to the right content",
      "Enablement agents that cite official modules"
    ] },
  { n: "Claude",               ic: "🧠", best: "Chat on the web or desktop, or use it in your terminal", need: "A Claude account, or Claude Code",
    how: [
      "Open Settings, then Connectors, and click Add custom connector.",
      "Name it Trailhead, paste the Connector URL below and click Add. It also appears in Claude Desktop.",
      "In a chat, open the + (tools) menu and turn on Trailhead.",
      "Run the command below in your terminal. The user scope makes it available in every project."
    ],
    paths: [{ n: "Claude web & Desktop", s: [0, 1, 2] }, { n: "Claude Code", s: [3] }],
    next: "Start prompts with \"Use Trailhead MCP to…\" so Claude picks the Trailhead tools.",
    code: [
      ["Connector URL (claude.ai and Desktop)", URL_],
      ["Claude Code", "claude mcp add --transport http --scope user trailhead " + URL_]
    ],
    say: "What does Trailhead say about Apex bulkification best practices?",
    tips: [
      "You should see Claude call a Trailhead tool and cite Trailhead content in the answer",
      "Team or Enterprise plan? An owner may need to add the connector under Organization settings first",
      "Claude Code not working? Check the command has --transport http, then run claude mcp list"
    ] },
  { n: "Slackbot",             ic: "💬", best: "Ask Trailhead from your team chat",       need: "Slack workspace and admin approval",
    how: [
      "Ask your Slack admin to enable the Trailhead MCP app for your workspace.",
      "Go to api.slack.com/apps, choose Create New App, then From a manifest, and pick your workspace.",
      "Paste a manifest that turns MCP on and lists the Trailhead server with no authentication (key settings below), then create the app.",
      "Open Slackbot, click the App integrations icon in the message box and add Trailhead MCP. Refresh Slack if you don't see the icon.",
      "Under Manage Apps, open Trailhead MCP and set its tools to Always allow."
    ],
    code: [["Key manifest settings", "bot scopes: mcp:connect, commands\nis_mcp_enabled: true\nmcp_servers → Trailhead MCP\n  url: https://mcp.trailhead.salesforce.com\n  auth_type: no_auth"]],
    say: "Use Trailhead MCP to find beginner content on Salesforce Flow.",
    next: "Share the app with your channel so teammates can ask Trailhead too.",
    tips: [
      "Always allow stops Slackbot asking permission on every request",
      "Icon missing? Hard refresh Slack (Cmd+Shift+R or Ctrl+Shift+R)"
    ] }
];

/* Sample tool calls shown on every client's setup view. */
var DM = [
  { p: "Find beginner content on Salesforce Flow", t: "content_search", a: '{ "query": "Salesforce Flow", "level": "Foundational" }', r: [["Build Flows with Flow Builder", "Trail"], ["Flow Fundamentals", "Superbadge"]] },
  { p: "Fetch the 'Apex Triggers' badge",          t: "fetch_content",  a: '{ "name": "Apex Triggers" }',                             r: [["Apex Triggers", "Full badge content as Markdown"]] },
  { p: "Find Agentforce content for developers",   t: "content_search", a: '{ "query": "Agentforce", "role": "Developer" }',          r: [["Build Agentforce Solutions with Pro-Code Tools", "Learning path"]] }
];

var ci = -1, st = 1, di = 0, dn = {};
var STAGES = ["Choose a client", "Set it up", "Summary"];

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
function ready(c) { return !!(c && c.how); }
function nd(i) { return dn[i] ? Object.keys(dn[i]).length : 0; }

/* Progress on the client's closest-to-done path. Clients without paths have one path: every step. */
function prog(i) {
  var c = CL[i], k = dn[i] || {},
    ps = c.paths || [{ s: c.how.map(function (_, j) { return j; }) }],
    left = function (p) { return p.s.filter(function (j) { return !k[j]; }); },
    p = ps.reduce(function (b, x) { return left(x).length / x.s.length < left(b).length / b.s.length ? x : b; }),
    l = left(p);
  return { path: p.n, n: p.s.length, done: p.s.length - l.length, all: !l.length, left: l };
}

function demo() {
  var d = DM[di];
  return '<p class="lbl" style="margin-top:14px">See what it returns (sample)</p><div class="chips">' +
    DM.map(function (x, i) { return '<button class="chip' + (i === di ? " on" : "") + '" type="button" data-d="' + i + '">' + esc(x.p) + "</button>"; }).join("") +
    '</div><div class="res"><p class="lbl">Assistant calls</p><pre>' + d.t + "(" + esc(d.a) + ")</pre>" +
    d.r.map(function (x) { return '<div class="row"><span>' + esc(x[0]) + '</span><span class="pill">' + esc(x[1]) + "</span></div>"; }).join("") + "</div>";
}

function choose() {
  $("#hsub").textContent = "Pick the client you want to demo with. Your progress is kept while you switch.";
  return '<div class="opts">' + CL.map(function (x, i) {
      var ok = ready(x), d = nd(i), p = ok && prog(i);
      return '<button class="oc' + (i === ci ? " on" : "") + (ok ? "" : " soon") + '" type="button" data-o="' + i + '"' + (ok ? "" : ' aria-disabled="true"') + ">" +
        '<span class="ic">' + x.ic + "</span><b>" + esc(x.n) + "</b><span>" + esc(x.best) + "</span><small>Needs: " + esc(x.need) + "</small>" +
        (ok ? (d ? "<em>" + (p.all ? "✓ Set up" + (p.path ? " via " + esc(p.path) : "") : d + " of " + x.how.length + " steps done") + "</em>" : "") : '<span class="tag">Setup coming soon</span>') + "</button>";
    }).join("") + "</div>" +
    '<p class="sub" style="margin-top:16px">Using something else? Any client that supports Streamable HTTP should work with the same endpoint, including VS Code with GitHub Copilot.</p>';
}

/* Step checklist, shared by setup and summary; clicking a step toggles it in either view. */
function steps(c) {
  return '<div class="lst">' + c.how.map(function (s, j) {
    var d = dn[ci] && dn[ci][j],
      p = (c.paths || []).filter(function (x) { return x.s[0] === j; })[0];
    return (p ? '<p class="lbl pth">' + esc(p.n) + "</p>" : "") + '<button class="ckb' + (d ? " d" : "") + '" type="button" data-k="' + j + '" aria-pressed="' + !!d + '"><i>' + (d ? "✓" : j + 1) + "</i><span>" + esc(s) + "</span></button>";
  }).join("") + "</div>";
}

function setup(c) {
  $("#hsub").textContent = "Set up " + c.n + ". Tick each step as you finish it.";
  return '<div class="g2"><div class="card"><h2>How to set it up</h2>' + steps(c) +
    (c.link ? '<a class="s" href="' + esc(c.link.href) + '" target="_blank" rel="noopener">' + esc(c.link.label) + " ↗</a>" : "") +
    c.code.map(function (k) {
      return '<div class="cl"><p class="lbl">' + esc(k[0]) + '</p><button class="s cp" type="button" data-copy="' + esc(k[1]) + '">Copy</button></div><pre>' + esc(k[1]) + "</pre>";
    }).join("") + "</div>" +
    '<div class="card"><h2>What to do</h2><p class="lbl">Try this prompt</p><div class="say">' + esc(c.say) + "</div>" +
    c.tips.map(function (t) { return '<div class="tip">' + esc(t) + "</div>"; }).join("") + demo() + "</div></div>" +
    '<div class="acts"><button class="s" type="button" data-a="pick">← Choose another</button><button class="p" type="button" data-a="sum">See summary →</button></div>';
}

function summary(c) {
  var p = prog(ci), via = p.path ? " for " + esc(p.path) : "";
  $("#hsub").textContent = "Here is where you landed.";
  return '<div class="card"><h2>' + c.ic + " " + (p.all ? "You're set up with " : "Your progress with ") + esc(c.n) + (p.all && p.path ? " (" + esc(p.path) + ")" : "") + "</h2>" +
    '<div class="sum"><div><small>Setup</small>' + (p.all ? (p.n === 1 ? "The step" + via + " is" : "All " + p.n + " steps" + via + " are") + " done" :
      p.done + " of " + p.n + " steps" + via + " done. Tick any you've finished.") + steps(c) + "</div>" +
    "<div><small>Endpoint</small><code>" + URL_ + "</code></div>" +
    "<div><small>" + esc(c.sayLbl || "First prompt") + "</small>" + esc(c.say) + "</div>" +
    '<div><small>What you can do now</small>Search Trailhead by topic, role and level, or fetch a full badge by name. Say "Use Trailhead MCP to…" for best results.</div>' +
    (c.next ? "<div><small>Next step</small>" + esc(c.next) + "</div>" : "") + "</div>" +
    '<div class="acts"><button class="p" type="button" data-a="pick">Try another client</button><button class="s" type="button" data-a="back">Back to setup</button><button class="s" type="button" data-v="intro">Back to overview</button></div></div>';
}

function renderClients() {
  $("#steps").innerHTML = STAGES.map(function (t, i) {
    var n = i + 1;
    return '<div class="sp' + (n === st ? " on" : n < st ? " ok" : "") + '"><b>' + (n < st ? "✓" : n) + "</b>" + t + "</div>";
  }).join("");
  var c = CL[ci];
  $("#hbody").innerHTML = st === 1 || !ready(c) ? choose() : st === 2 ? setup(c) : summary(c);
}

document.addEventListener("click", function (e) {
  var t = e.target.closest("button");
  if (!t || !t.closest("#clients")) return;
  var D = t.dataset;
  if (D.o !== undefined) { if (!ready(CL[+D.o])) return; ci = +D.o; st = 2; }
  else if (D.k !== undefined) { dn[ci] = dn[ci] || {}; if (dn[ci][D.k]) delete dn[ci][D.k]; else dn[ci][D.k] = 1; }
  else if (D.a) { st = D.a === "sum" ? 3 : D.a === "back" ? 2 : 1; if (D.a !== "back") window.scrollTo(0, 0); }
  else if (D.d !== undefined) { di = +D.d; }
  else return;
  renderClients();
});

renderClients();