let tutorialsIntervals = [];

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

loadSidebar();
loadSelects();
loadShowOnScroll();
loadTutorialVideos();
// initMap();

function initMap() {
  // The location of wic
  const wic = { lat: 41.693, lng: -8.826 };
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

function loadHome() {
  /* BACKGROUND CARROSSEL */
  let slide_counter = document.getElementById("landing-carrossel")
    .childElementCount;
  let pos = 0;
  let background_list = document.getElementById("landing-carrossel").children;

  let solutionsAreaCounterMobile = 0;
  let tutorialsAreaCounterMobile = 0;

  new Splide(".splide", {
    type: "loop",
    perPage: 3,
    pagination: false,
    padding: 32,
    arrows: false,
    // focus  : 'center',
    // arrows: false,
  }).mount();

  //BACKGROUND CARROSSEL
  function updateBackgroundSlideCounter(direction = true) {
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

  document
    .getElementById("landing-carrossel-slide-left")
    .addEventListener("click", () => {
      updateBackgroundSlideCounter(false);
    });

  document
    .getElementById("landing-carrossel-slide-right")
    .addEventListener("click", () => {
      updateBackgroundSlideCounter(true);
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
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      if (clientWidth > 768) {
        if (solutionsArea.classList.contains("showing")) {
          solutionsArea.classList.remove("showing");
        } else {
          solutionsArea.classList.add("showing");
        }
      } else {
        let solutionsItems = solutions.querySelectorAll(".solution");
        solutionsAreaCounterMobile++;
        if (solutionsAreaCounterMobile >= 3) {
          solutionsAreaCounterMobile = 0;
        }
        console.log(solutions.clientWidth);
        for (let solution of solutionsItems) {
          solution.style.transform = `translateX(${
            solutionsAreaCounterMobile * (solutions.clientWidth * 0.53)
          }px)`;
        }
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

      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      if (clientWidth > 768) {
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
      } else {
        let rows = tutorialsDiv.querySelectorAll(".wrapper .row");
        let tutorialsVideoCount = 0;
        let tutorials = [];
        for (let row of rows) {
          let tuts = row.querySelectorAll(".tutorial");

          tuts.forEach((t) => {
            tutorials.push(t);
          });
          tutorialsVideoCount += tuts.length;
        }

        tutorialsAreaCounterMobile++;
        if (tutorialsAreaCounterMobile >= tutorialsVideoCount) {
          tutorialsAreaCounterMobile = 0;
        }

        tutorials.forEach((t) => {
          t.style.transform = `translateX(-${
            tutorialsAreaCounterMobile * tutorials[0].clientWidth
          }px)`;
        });
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
}

function loadShowOnScroll() {
  var scroll =
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  var elementsToShow = document.querySelectorAll(".show-on-scroll");

  function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight)) ||
      (rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight))
    );
  }

  function loop() {
    elementsToShow.forEach(function (element) {
      if (isElementInViewport(element)) {
        element.classList.add("is-visible");
      }
    });

    scroll(loop);
  }

  loop();
}

function updateTutorialProgressBar(tutorial, progress) {
  let progressBar = tutorial.querySelector("progress");
  let progressIndicator = tutorial.querySelector(".progress .indicator");

  progressBar.value = progress;
  progressIndicator.style.left =
    scale(
      progressBar.value,
      0,
      100,
      25,
      progressBar.getBoundingClientRect().width
    ) + "px";
}

function tutorialTogglePlay(tutorial) {
  let video = tutorial.querySelector(".box").children.namedItem("video");

  if (tutorial.classList.contains("playing")) {
    video.pause();
    window.clearInterval(tutorialsIntervals[tutorial.getAttribute("data-id")]);
    tutorial.classList.remove("playing");
  } else {
    video.play();

    tutorialsIntervals[tutorial.getAttribute("data-id")] = setInterval(() => {
      let progressBar = tutorial.querySelector("progress");
      let progressIndicator = tutorial.querySelector(".progress .indicator");

      if (!video.ended) {
        updateTutorialProgressBar(
          tutorial,
          parseInt((video.currentTime * 100) / video.duration)
        );
      }
    }, 500);

    tutorial.classList.add("playing");
  }
}

function tutorialToggleFullscreen(tutorial) {
  let box = tutorial.querySelector(".box");
  if (tutorial.classList.contains("fullscreen")) {
    document.exitFullscreen();
    tutorial.classList.remove("fullscreen");
  } else {
    box.requestFullscreen();
    tutorial.classList.add("fullscreen");
  }
}

function loadTutorialVideos() {
  let tutorials = document.getElementsByClassName("tutorial");

  for (let i = 0; i < tutorials.length; i++) {
    let tutorial = tutorials[i];
    let video = tutorial.querySelector(".box video");
    let timeout;

    tutorial.setAttribute("data-id", i);

    //video timer
    video.addEventListener("loadedmetadata", () => {
      let minutes = Math.floor(video.duration / 60);
      let seconds = Math.floor((video.duration / 60 - minutes) * 60);

      tutorial.querySelector(".timer h6").innerHTML = minutes + ":" + seconds;
    });

    //mouse hover
    tutorial.addEventListener("mousemove", function () {
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      if (clientWidth > 768) {
        if (timeout) {
          tutorial.setAttribute("data-controls", "true");
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          tutorial.setAttribute("data-controls", "false");
        }, 1000);
      }
    });

    //play pause
    tutorial
      .querySelector(".box >.wrapper >.play >img")
      .addEventListener("click", () => {
        tutorialTogglePlay(tutorial);
      });

    //fullscreen
    tutorial.querySelectorAll(".fullscreen").forEach((button) => {
      button.addEventListener("click", () => {
        tutorialToggleFullscreen(tutorial);
      });
    });

    tutorial.querySelector(".box").addEventListener("fullscreenchange", () => {
      if( !document.fullscreenElement && tutorial.classList.contains("fullscreen") ){
        tutorial.classList.remove("fullscreen")
      }
    })

    //overlay when playing
    tutorial.addEventListener("mouseover", () => {
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      if (clientWidth > 768) {
        tutorial.setAttribute("data-controls", "true");
      }
    });

    tutorial.addEventListener("mouseout", () => {
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      if (clientWidth > 768) {
        tutorial.setAttribute("data-controls", "false");
      }
    });

    tutorial.addEventListener("click", () => {
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      if (clientWidth <= 768) {
        if (tutorial.getAttribute("data-controls") == "true") {
          tutorial.setAttribute("data-controls", "false");
        } else {
          tutorial.setAttribute("data-controls", "true");
        }
      }
    });

    //audio
    tutorial.querySelector(".lower_sound").addEventListener("click", () => {
      let currentVolume = video.volume.toFixed(1);

      if (currentVolume > 0) {
        video.volume -= 0.1;
      }
    });

    tutorial.querySelector(".higher_sound").addEventListener("click", () => {
      let currentVolume = video.volume.toFixed(1);

      if (currentVolume < 1) {
        video.volume += 0.1;
      }
    });

    //progress change on bar click
    tutorial.querySelector(".progress").addEventListener("click", (e) => {
      let progressBar = tutorial.querySelector("progress");
      video.currentTime = scale(
        e.pageX,
        32,
        progressBar.getBoundingClientRect().width + 32,
        0,
        video.duration
      );

      updateTutorialProgressBar(
        tutorial,
        parseInt((video.currentTime * 100) / video.duration)
      );
    });


  }
}
