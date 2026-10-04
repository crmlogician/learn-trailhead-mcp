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
    say: "Ground your agent so it answers learning questions with cited Trailhead modules.",
    tips: [
      "Help desk agents grounded in Trailhead best practices",
      "Onboarding agents that point new hires to the right content",
      "Enablement agents that cite official modules"
    ] },
  { n: "Claude",               ic: "🧠", best: "Chat on the web or desktop, or use it in your terminal", need: "A Claude account, or Claude Code",
    how: [
      "Claude web or Desktop: open Settings, then Connectors, and click Add custom connector.",
      "Name it Trailhead, paste the Connector URL below and click Add. It also appears in Claude Desktop.",
      "In a chat, open the + (tools) menu and turn on Trailhead.",
      "Claude Code: run the command below in your terminal. The user scope makes it available in every project."
    ],
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
  { n: "Slackbot",             ic: "💬", best: "Ask Trailhead from your team chat",       need: "Slack workspace and admin approval" },
  { n: "Cursor",               ic: "⌨️", best: "Look things up while you code",           need: "Cursor installed" }
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
      var ok = ready(x), d = nd(i);
      return '<button class="oc' + (i === ci ? " on" : "") + (ok ? "" : " soon") + '" type="button" data-o="' + i + '"' + (ok ? "" : ' aria-disabled="true"') + ">" +
        '<span class="ic">' + x.ic + "</span><b>" + esc(x.n) + "</b><span>" + esc(x.best) + "</span><small>Needs: " + esc(x.need) + "</small>" +
        (ok ? (d ? "<em>" + d + " of " + x.how.length + " steps done</em>" : "") : '<span class="tag">Setup coming soon</span>') + "</button>";
    }).join("") + "</div>" +
    '<p class="sub" style="margin-top:16px">Using something else? Any client that supports Streamable HTTP should work with the same endpoint, including VS Code with GitHub Copilot.</p>';
}

function setup(c) {
  $("#hsub").textContent = "Set up " + c.n + ". Tick each step as you finish it.";
  return '<div class="g2"><div class="card"><h2>How to set it up</h2><div class="lst">' +
    c.how.map(function (s, j) {
      var d = dn[ci] && dn[ci][j];
      return '<button class="ckb' + (d ? " d" : "") + '" type="button" data-k="' + j + '" aria-pressed="' + !!d + '"><i>' + (d ? "✓" : j + 1) + "</i><span>" + esc(s) + "</span></button>";
    }).join("") + "</div>" +
    (c.link ? '<a class="s" href="' + esc(c.link.href) + '" target="_blank" rel="noopener">' + esc(c.link.label) + " ↗</a>" : "") +
    c.code.map(function (k) {
      return '<div class="cl"><p class="lbl">' + esc(k[0]) + '</p><button class="s cp" type="button" data-copy="' + esc(k[1]) + '">Copy</button></div><pre>' + esc(k[1]) + "</pre>";
    }).join("") + "</div>" +
    '<div class="card"><h2>What to do</h2><p class="lbl">Try this prompt</p><div class="say">' + esc(c.say) + "</div>" +
    c.tips.map(function (t) { return '<div class="tip">' + esc(t) + "</div>"; }).join("") + demo() + "</div></div>" +
    '<div class="acts"><button class="s" type="button" data-a="pick">← Choose another</button><button class="p" type="button" data-a="sum">See summary →</button></div>';
}

function summary(c) {
  var d = nd(ci), all = d === c.how.length;
  $("#hsub").textContent = "Here is where you landed.";
  return '<div class="card"><h2>' + c.ic + " " + (all ? "You're set up with " : "Your progress with ") + esc(c.n) + "</h2>" +
    '<div class="sum"><div><small>Setup</small>' + d + " of " + c.how.length + " steps done" + (all ? "" : ". Go back to finish the rest.") + "</div>" +
    "<div><small>Endpoint</small><code>" + URL_ + "</code></div>" +
    "<div><small>First prompt</small>" + esc(c.say) + "</div>" +
    '<div><small>What you can do now</small>Search Trailhead by topic, role and level, or fetch a full badge by name. Say "Use Trailhead MCP to…" for best results.</div></div>' +
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