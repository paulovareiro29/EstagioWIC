function loadHome() {
  //sidebar
  document.getElementById("sidebar-menu-open").addEventListener("click", () => {
    let sidebar = document.getElementById("sidebar");

    sidebar.classList.add("open");
    sidebar.classList.remove("closed");
  });

  document
    .getElementById("sidebar-menu-close")
    .addEventListener("click", () => {
      let sidebar = document.getElementById("sidebar");

      sidebar.classList.remove("open");
      sidebar.classList.add("closed");
    });

  //solutions area
  document
    .getElementById("solutions-area-open")
    .addEventListener("click", () => {
      let solutionsArea = document.getElementById("solutions-area");
      let solutions = document.getElementById("solutions");

      solutionsArea.classList.add("showing");
    });

  document
    .getElementById("solutions-area-close")
    .addEventListener("click", () => {
      let solutionsArea = document.getElementById("solutions-area");
      let solutions = document.getElementById("solutions");

      solutionsArea.classList.remove("showing");
    });

  //solution
  let solutions = document.getElementsByClassName("solution");

  for (let i = 0; i < solutions.length; i++) {
    solutions[i].addEventListener("click", () => {
      if (
        document.getElementById("solutions-area").classList.contains("showing")
      ) {
        let children = solutions[i].children;
        for (let j = 0; j < children.length; j++) {
          if (children[j].id == "info") {
            if (children[j].classList.contains("open")) {
              children[j].classList.remove("open");
            } else {
              children[j].classList.add("open");
            }
          }
        }
      }
    });
  }
}
