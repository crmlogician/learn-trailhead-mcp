/* Shared behaviour: section nav, theme toggle, copy-endpoint button.
   The whole site is one page. Each step is a <section class="view" id="…" data-label="…">
   in index.html; the top nav is built from those sections. */
var $ = function (s) { return document.querySelector(s); };
var URL_ = "https://mcp.trailhead.salesforce.com/mcp";
var VIEWS = Array.prototype.slice.call(document.querySelectorAll("section.view"));

function view(id) {
  if (!VIEWS.some(function (s) { return s.id === id; })) id = VIEWS[0].id;
  VIEWS.forEach(function (s) { s.hidden = s.id !== id; });
  document.querySelectorAll(".nb").forEach(function (b) { b.classList.toggle("on", b.dataset.v === id); });
  if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id);
  document.dispatchEvent(new CustomEvent("view", { detail: id }));
  window.scrollTo(0, 0);
}

(function nav() {
  var top = document.createElement("div");
  top.className = "top";
  top.innerHTML =
    '<span class="brand">🏔️ Trailhead MCP</span>' +
    '<div class="nav" role="tablist">' + VIEWS.map(function (s, i) {
      return '<button class="nb" type="button" data-v="' + s.id + '">' + (i + 1) + " · " + s.dataset.label + "</button>";
    }).join("") + "</div>" +
    '<button class="theme" id="theme" type="button">Theme</button>';
  $(".wrap").prepend(top);
})();

document.addEventListener("click", function (e) {
  var t = e.target.closest("button,a");
  if (!t) return;
  if (t.dataset.v) { view(t.dataset.v); return; }
  if (t.dataset.copy) {
    var done = function (m) { t.textContent = m; setTimeout(function () { t.textContent = "Copy"; }, 1600); };
    try { navigator.clipboard.writeText(t.dataset.copy).then(function () { done("Copied"); }, function () { done("Select to copy"); }); }
    catch (x) { done("Select to copy"); }
  }
});

$("#theme").addEventListener("click", function () {
  var r = document.documentElement,
    d = r.dataset.theme === "dark" || (!r.dataset.theme && matchMedia("(prefers-color-scheme:dark)").matches);
  r.dataset.theme = d ? "light" : "dark";
});

window.addEventListener("hashchange", function () { view(location.hash.slice(1)); });
view(location.hash.slice(1));