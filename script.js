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
    .getElementById("solutions-area-toggle")
    .addEventListener("click", () => {
      let solutionsArea = document.getElementById("solutions-area");
      let solutions = document.getElementById("solutions");

      if (solutionsArea.classList.contains("showing")) {
        solutionsArea.classList.remove("showing");
      } else {
        solutionsArea.classList.add("showing");
      }
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

  //tutorials area show
  document
    .getElementById("tutorials-area-toggle")
    .addEventListener("click", () => {
      let tutorialsArea = document.getElementById("tutorials-area");
      let tutorialsDiv = document.getElementById("tutorials");
      let button = document.getElementById("tutorials-show-more-toggle");

      if (tutorialsArea.classList.contains("showing")) {
        if (tutorialsDiv.classList.contains("showing")) {
          setTimeout(() => {
            tutorialsArea.classList.remove("showing");
          }, 1000);

          tutorialsDiv.classList.remove("showing");
          button.classList.remove("showing");
          button.innerHTML = "Ver mais";
        } else {
          tutorialsArea.classList.remove("showing");
        }
      } else {
        tutorialsArea.classList.add("showing");
      }
    });

  //tutorials area show more
  document
    .getElementById("tutorials-show-more-toggle")
    .addEventListener("click", () => {
      let tutorialsArea = document.getElementById("tutorials-area");
      let tutorialsDiv = document.getElementById("tutorials");
      let button = document.getElementById("tutorials-show-more-toggle");

      if (tutorialsArea.classList.contains("showing")) {
        if (tutorialsDiv.classList.contains("showing")) {
          window.location.href = "#";
        } else {
          tutorialsDiv.classList.add("showing");
          button.classList.add("showing");
          button.innerHTML = "Ver tudo";
        }
      }
    });

  //tutorial
  let tutorials = document.getElementsByClassName("tutorial");

  //playing video
  for (let i = 0; i < tutorials.length; i++) {
    tutorials[i]
      .querySelector(".box >.wrapper >.play >img")
      .addEventListener("click", () => {
        if (
          document
            .getElementById("tutorials-area")
            .classList.contains("showing")
        ) {
          let video = tutorials[i]
            .querySelector(".box")
            .children.namedItem("video");
          if (tutorials[i].classList.contains("playing")) {
            video.pause();

            tutorials[i].classList.remove("playing");
          } else {
            tutorials[i].classList.add("playing");
            video.play();
          }
        }
      });
  }

  //fullscreen
  for (let i = 0; i < tutorials.length; i++) {
    tutorials[i].querySelector(".fullscreen").addEventListener("click", () => {
      console.log("clic");
      if (
        document.getElementById("tutorials-area").classList.contains("showing")
      ) {
        console.log("hes");
        let box = tutorials[i].querySelector(".box");
        if (tutorials[i].classList.contains("fullscreen")) {
          box.style.height = null;

          tutorials[i].classList.remove("fullscreen");
        } else {
          var elementTransition = box.style.transition;
          box.style.transition = "";

          requestAnimationFrame(function () {
            box.style.height = 0 + "px";
            box.style.transition = elementTransition;

            requestAnimationFrame(function () {
              box.style.height = window.innerHeight + "px";
            });
          });
          tutorials[i].classList.add("fullscreen");
        }
      }
    });
  }
}
