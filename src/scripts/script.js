loadSidebar();
loadSelects();
loadShowOnScroll();
initMap();

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

  //   /* NEWS CARROSSEL*/
  //   let news_counter = document.getElementById("news-carrossel").childElementCount - 1; //menos o slider
  //   let newsPos = 0;
  //   let newsList = document.getElementById("news-carrossel").querySelectorAll(".slide")

  //   function updateNewsSlideCounter(direction = true){

  //     if (direction) {
  //       newsPos++;
  //       if (newsPos >= news_counter) {
  //         newsPos = 0;
  //       }
  //     } else {
  //       newsPos--;
  //       if (newsPos < 0) {
  //         newsPos = news_counter - 1;
  //       }
  //     }

  //     for(let news of newsList){
  //       news.classList.remove("partial-hidden")
  //       news.classList.add("hidden")
  //     }

  //     for(let i = 0; i < 3; i++){

  //       let number = newsPos + i
  //       if(number >= newsList.length){
  //         number -= newsList.length
  //       }

  //       newsList[number].classList.remove("hidden")
  //     }
  //   }

  //  document
  //     .getElementById("landing-news-slide-left")
  //     .addEventListener("click", () => {
  //       updateNewsSlideCounter(false);
  //     });

  //   document
  //     .getElementById("landing-news-slide-right")
  //     .addEventListener("click", () => {
  //       updateNewsSlideCounter(true);
  //     });

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

  //tutorial
  let tutorials = document.getElementsByClassName("tutorial");

  //playing video
  for (let i = 0; i < tutorials.length; i++) {
    tutorials[i]
      .querySelector(".box >.wrapper >.play >img")
      .addEventListener("click", () => {
        let clientWidth =
          document.documentElement.clientWidth || document.body.clientWidth;

        if (clientWidth > 768) {
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
        } else {
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
      let clientWidth =
        document.documentElement.clientWidth || document.body.clientWidth;

      console.log();

      if (clientWidth > 768) {
        if (
          document
            .getElementById("tutorials-area")
            .classList.contains("showing")
        ) {
          let box = tutorials[i].querySelector(".box");
          if (tutorials[i].classList.contains("fullscreen")) {
            // box.style.height = null;
            document.exitFullscreen();
            tutorials[i].classList.remove("fullscreen");
          } else {
            // var elementTransition = box.style.transition;
            // box.style.transition = "";

            // requestAnimationFrame(function () {
            //   box.style.height = 0 + "px";
            //   box.style.transition = elementTransition;

            //   requestAnimationFrame(function () {
            //     box.style.height = window.screen.height + "px";
            //   });
            // });
            box.requestFullscreen();
            tutorials[i].classList.add("fullscreen");
          }
        }
      } else {
        let box = tutorials[i].querySelector(".box");
        if (tutorials[i].classList.contains("fullscreen")) {
          document.exitFullscreen();
          tutorials[i].classList.remove("fullscreen");
        } else {
          box.requestFullscreen();
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
        document.exitFullscreen();
        tutorials[i].classList.remove("fullscreen");
      } else {
        box.requestFullscreen();
        tutorials[i].classList.add("fullscreen");
      }
    });
  }
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
