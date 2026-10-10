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
  { n: "Slackbot",             ic: "💬", best: "Ask Trailhead from your team chat",       need: "A Slack workspace where you can create apps",
    how: [
      "Go to [api.slack.com/apps](https://api.slack.com/apps) and click Create New App.",
      "Choose From a manifest, pick your workspace and click Next.",
      "Paste the Slack app manifest below (JSON), review the settings on the summary, then click Create.",
      "Open any Slackbot conversation and click the App integrations icon in the message box. Refresh Slack if you don't see it.",
      "Find Trailhead MCP and click it to add it.",
      "Go to Manage Apps, open Trailhead MCP and set all its tools to Always allow."
    ],
    code: [["Slack app manifest (JSON)", JSON.stringify({
      display_information: { name: "Trailhead MCP App", description: "Interact with Trailhead via MCP", background_color: "#1d7c00" },
      features: { bot_user: { display_name: "Trailhead MCP App", always_online: false } },
      oauth_config: { scopes: { bot: ["mcp:connect", "commands"] }, pkce_enabled: false },
      settings: { org_deploy_enabled: false, socket_mode_enabled: false, token_rotation_enabled: false, is_mcp_enabled: true },
      mcp_servers: { "Trailhead MCP": { url: "https://mcp.trailhead.salesforce.com", auth_type: "no_auth" } }
    }, null, 2)]],
    say: "Use Trailhead MCP to find beginner content on Salesforce Flow.",
    next: "Share the app with your channel so teammates can ask Trailhead too.",
    tips: [
      "Always allow stops Slackbot asking permission on every request",
      "Icon missing? Hard refresh Slack (Cmd+Shift+R or Ctrl+Shift+R)",
      "Can't create apps in your workspace? Ask your Slack admin for access"
    ] }
];

/* Sample tool calls shown on every client's setup view. */
var DM = [
  { p: "Find beginner content on Salesforce Flow", t: "content_search", a: '{ "query": "Salesforce Flow", "level": "Foundational" }', r: [["Build Flows with Flow Builder", "Trail"], ["Flow Fundamentals", "Superbadge"]] },
  { p: "Fetch the 'Apex Triggers' badge",          t: "fetch_content",  a: '{ "name": "Apex Triggers" }',                             r: [["Apex Triggers", "Full badge content as Markdown"]] },
  { p: "Find Agentforce content for developers",   t: "content_search", a: '{ "query": "Agentforce", "role": "Developer" }',          r: [["Build Agentforce Solutions with Pro-Code Tools", "Learning path"]] }
];

var ci = -1, st = 1, di = 0, dn = {}, op = {};
var STAGES = ["Choose a client", "Set it up", "Summary"];
var FOLD = 10; /* code blocks longer than this many lines start collapsed */
var ICO = {
  more: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 3h4v4M13 3L8.5 7.5M7 13H3V9M3 13l4.5-4.5"/></svg>',
  less: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 3v4h4M9 7l4-4M7 13V9H3M7 9l-4 4"/></svg>'
};

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
/* Escape a step and turn [text](https://…) into an external link. */
function md(s) { return esc(s).replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1 ↗</a>'); }
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
    /* A div, not a button, so a step can hold a link. */
    return (p ? '<p class="lbl pth">' + esc(p.n) + "</p>" : "") + '<div class="ckb' + (d ? " d" : "") + '" role="button" tabindex="0" data-k="' + j + '" aria-pressed="' + !!d + '"><i>' + (d ? "✓" : j + 1) + "</i><span>" + md(s) + "</span></div>";
  }).join("") + "</div>";
}

/* Code block with a Copy button; long blocks collapse behind a Show more / Show less pill. */
function code(k, i) {
  var id = ci + ":" + i, long = k[1].split("\n").length > FOLD, open = op[id],
    pre = "<pre>" + esc(k[1]) + "</pre>";
  return '<div class="cl"><p class="lbl">' + esc(k[0]) + '</p><button class="s cp" type="button" data-copy="' + esc(k[1]) + '">Copy</button></div>' +
    (long ? '<div class="fold' + (open ? "" : " shut") + '">' + pre +
      '<button class="more" type="button" data-f="' + id + '" aria-expanded="' + !!open + '">' + (open ? ICO.less + "Show less" : ICO.more + "Show more") + "</button></div>" : pre);
}

function setup(c) {
  $("#hsub").textContent = "Set up " + c.n + ". Tick each step as you finish it.";
  return '<div class="g2"><div class="card"><h2>How to set it up</h2>' + steps(c) +
    (c.link ? '<a class="s" href="' + esc(c.link.href) + '" target="_blank" rel="noopener">' + esc(c.link.label) + " ↗</a>" : "") +
    c.code.map(code).join("") + "</div>" +
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
  if (e.target.closest("a")) return;
  var t = e.target.closest("button,[data-k]");
  if (!t || !t.closest("#clients")) return;
  var D = t.dataset;
  if (D.o !== undefined) { if (!ready(CL[+D.o])) return; ci = +D.o; st = 2; }
  else if (D.k !== undefined) { dn[ci] = dn[ci] || {}; if (dn[ci][D.k]) delete dn[ci][D.k]; else dn[ci][D.k] = 1; }
  else if (D.f) { op[D.f] = !op[D.f]; }
  else if (D.a) { st = D.a === "sum" ? 3 : D.a === "back" ? 2 : 1; if (D.a !== "back") window.scrollTo(0, 0); }
  else if (D.d !== undefined) { di = +D.d; }
  else return;
  renderClients();
});

/* Steps are role="button" divs, so give them the keyboard behaviour of a button. */
document.addEventListener("keydown", function (e) {
  var t = e.target;
  if (t.dataset && t.dataset.k !== undefined && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    var k = t.dataset.k;
    t.click();
    var n = document.querySelector('#clients [data-k="' + k + '"]');
    if (n) n.focus();
  }
});

renderClients();