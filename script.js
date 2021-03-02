//sidebar menu open
document.getElementById("sidebar-menu-closed").addEventListener("click", () => {
  let sidebar = document.getElementById("sidebar");
  let content = document.getElementById("sidebar");

  sidebar.classList.add("open");
  sidebar.classList.remove("closed");
});

document.getElementById("sidebar-menu-open").addEventListener("click", () => {
  let sidebar = document.getElementById("sidebar");
  let content = document.getElementById("sidebar");

  sidebar.classList.remove("open");
  sidebar.classList.add("closed");
});

function collapseSidebar(sidebar) {
  let transition = content.style.transition;
  sidebar.style.transition = "";

  requestAnimationFrame(function () {
    sidebar.style.width = screenWidth - 160 + "px";
    sidebar.style.transition = transition;
  });

  requestAnimationFrame(function () {
    sidebar.style.width = 80 + "px";
  });
}

function openSidebar(sidebar) {
  let transition = sidebar.style.transition;
  sidebar.style.transition = "";

  requestAnimationFrame(function () {
    sidebar.style.width = 0 + "px";
    sidebar.style.minWidth = 0 + "px";
    sidebar.style.transition = transition;
  });

  requestAnimationFrame(function () {
    sidebar.style.width = screenWidth - 160 + "px";
  });

  sidebar.addEventListener("transitionend", function (e) {
    sidebar.removeEventListener("transitionend", arguments.callee);
  });

  requestAnimationFrame(function () {
    sidebar.style.width = null;
  });
}
