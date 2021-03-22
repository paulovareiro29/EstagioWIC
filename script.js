loadSidebar();
loadSelects();

function loadHome() {
  let slide_counter = document.getElementById("landing-carrossel")
    .childElementCount;
  let pos = 0;
  let background_list = document.getElementById("landing-carrossel").children;

  function updateSlideCounter(direction = true) {
    //true = right
    //false = left
    if (direction) {
      pos++;
      if (pos >= slide_counter) {
        pos = 0;
      }
    } else {
      pos--;
      if (pos < 0) {
        pos = slide_counter - 1;
      }
    }

    for (let i = 0; i < background_list.length; i++) {
      background_list[i].classList.remove("showing");
      background_list[i].classList.remove("playing");
      background_list[i].querySelector("video").pause();
      background_list[i].querySelector("video").currentTime = 0;

      if (i == pos) {
        background_list[i].classList.add("showing");
      }
    }

    document.getElementById("slide-counter").innerHTML = `${pos + 1} / ${
      background_list.length
    }`;

    console.log(pos);
  }

  //carrossel
  document
    .getElementById("landing-carrossel-slide-left")
    .addEventListener("click", () => {
      updateSlideCounter(false);
    });

  document
    .getElementById("landing-carrossel-slide-right")
    .addEventListener("click", () => {
      updateSlideCounter(true);
    });

  //landing play button
  for (let background_video of background_list) {
    background_video
      .querySelector(".landing-play-btn")
      .addEventListener("click", () => {
        if (background_video.classList.contains("playing")) {
          background_video.classList.remove("playing");
          background_video.querySelector("video").pause();
        } else {
          background_video.classList.add("playing");
          background_video.querySelector("video").play();
        }
      });
  }

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
      if (
        document.getElementById("tutorials-area").classList.contains("showing")
      ) {
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

function loadSidebar() {
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
}

function loadSelects() {
  //selects
  for (let select of document.querySelectorAll("select.input")) {
    select.addEventListener("click", () => {
      select.setAttribute("value", select.value);
    });
  }
}

function loadTutorials() {
  let slide_counter = document.getElementById("tutorials").childElementCount;
  let pos = 0;
  let tutorial_pages = document.getElementById("tutorials").children;

  document.getElementById("tutorials-slide-counter").innerHTML = `${
    pos + 1
  } / ${slide_counter}`;

  function changeTutorialPage(direction = true) {
    if (direction) {
      pos++;
      if (pos >= slide_counter) {
        pos = 0;
      }
    } else {
      pos--;
      if (pos < 0) {
        pos = slide_counter - 1;
      }
    }

    for (let i = 0; i < tutorial_pages.length; i++) {
      tutorial_pages[i].classList.add("hide");

      if (i == pos) {
        tutorial_pages[i].classList.remove("hide");
      }
    }


    document.getElementById("tutorials-slide-counter").innerHTML = `${
      pos + 1
    } / ${slide_counter}`;
  }

  document
    .getElementById("tutorials-slide-left")
    .addEventListener("click", () => {
      changeTutorialPage(false);
    });

  document
    .getElementById("tutorials-slide-right")
    .addEventListener("click", () => {
      changeTutorialPage(true);
    });

  //tutorial
  let tutorials = document.getElementsByClassName("tutorial");

  //playing video
  for (let i = 0; i < tutorials.length; i++) {
    tutorials[i]
      .querySelector(".box >.wrapper >.play >img")
      .addEventListener("click", () => {
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
      });
  }

  //fullscreen
  for (let i = 0; i < tutorials.length; i++) {
    tutorials[i].querySelector(".fullscreen").addEventListener("click", () => {
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
    });
  }
}

// Initialize and add the map
function initMap() {
  // The location of wic
  const wic = { lat: 41.693, lng: -8.826  };
  // The map, centered at wic
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: wic,
  });
  // The marker, positioned at wic
  const marker = new google.maps.Marker({
    position: wic,
    map: map,
  });
}
