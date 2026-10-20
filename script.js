(function () {
  var KEY = "tom-lang";
  var lang = "en";
  try {
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("lang");
    var saved = localStorage.getItem(KEY);
    if (fromUrl === "vi" || fromUrl === "en") lang = fromUrl;
    else if (saved === "vi" || saved === "en") lang = saved;
  } catch (e) {}

  function apply(l) {
    lang = l;
    document.documentElement.setAttribute("lang", l);
    try { localStorage.setItem(KEY, l); } catch (e) {}
    var t = document.querySelector("title");
    if (t) {
      var v = t.getAttribute("data-" + l);
      if (v) document.title = v;
    }
    var btns = document.querySelectorAll(".lang button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].getAttribute("data-lang") === l);
    }
  }

  // Set language immediately so the page doesn't flash the wrong one
  document.documentElement.setAttribute("lang", lang);

  document.addEventListener("DOMContentLoaded", function () {
    var btns = document.querySelectorAll(".lang button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        apply(this.getAttribute("data-lang"));
      });
    }
    apply(lang);
  });
})();
