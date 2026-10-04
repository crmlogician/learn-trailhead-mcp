/* Step 2 · Hands-on with supported clients.
   One entry per client. A client's own step PR adds its setup details
   (how, code, say, tips); until then its card shows "Setup coming soon". */
var CL = [
  { n: "Slackbot",             ic: "💬", best: "Ask Trailhead from your team chat",       need: "Slack workspace and admin approval" },
  { n: "Agentforce",           ic: "🤖", best: "Ground your agents in trusted content",   need: "A Salesforce org with Setup access" },
  { n: "Claude / Claude Code", ic: "🧠", best: "Use it in chat or in your terminal",      need: "Claude Desktop or Claude Code" },
  { n: "Cursor",               ic: "⌨️", best: "Look things up while you code",           need: "Cursor installed" }
];

var ci = -1, st = 1;
var STAGES = ["Choose a client", "Set it up", "Summary"];

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
function ready(c) { return !!(c && c.how); }

function renderClients() {
  $("#steps").innerHTML = STAGES.map(function (t, i) {
    var n = i + 1;
    return '<div class="sp' + (n === st ? " on" : n < st ? " ok" : "") + '"><b>' + (n < st ? "✓" : n) + "</b>" + t + "</div>";
  }).join("");
  $("#hsub").textContent = "Pick the client you want to demo with.";
  $("#hbody").innerHTML =
    '<div class="opts">' + CL.map(function (x, i) {
      var ok = ready(x);
      return '<button class="oc' + (i === ci ? " on" : "") + (ok ? "" : " soon") + '" type="button" data-o="' + i + '"' + (ok ? "" : ' aria-disabled="true"') + ">" +
        '<span class="ic">' + x.ic + "</span><b>" + esc(x.n) + "</b><span>" + esc(x.best) + "</span><small>Needs: " + esc(x.need) + "</small>" +
        (ok ? "" : '<span class="tag">Setup coming soon</span>') + "</button>";
    }).join("") + "</div>" +
    '<p class="sub" style="margin-top:16px">Using something else? Any client that supports Streamable HTTP should work with the same endpoint, including VS Code with GitHub Copilot.</p>';
}

document.addEventListener("click", function (e) {
  var t = e.target.closest("[data-o]");
  if (!t || !ready(CL[+t.dataset.o])) return;
  ci = +t.dataset.o; st = 2; renderClients();
});

renderClients();