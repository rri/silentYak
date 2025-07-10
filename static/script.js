function initScript() {
    var elements = document.getElementsByClassName("noscript");
    Array.from(elements).forEach(elem => elem.classList.remove("noscript"));
}

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    initScript();
} else {
    document.addEventListener("DOMContentLoaded", initScript);
}
