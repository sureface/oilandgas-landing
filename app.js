let onSlide = false;

window.addEventListener("load", () => {
  autoSlide();
});

function autoSlide() {
  setInterval(() => {
    slide(getItemActiveIndex() + 1);
  }, 6000); // slide speed = 3s
}

function slide(toIndex) {
  if (onSlide) return;
  onSlide = true;

  const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
  const itemActive = document.querySelector(".carousel_item__active");
  const itemActiveIndex = itemsArray.indexOf(itemActive);
  let newItemActive = null;

  if (toIndex > itemActiveIndex) {
    // check if toIndex exceeds the number of carousel items
    if (toIndex >= itemsArray.length) {
      toIndex = 0;
    }

    newItemActive = itemsArray[toIndex];

    // start transition
    newItemActive.classList.add("carousel_item__pos_next");
    setTimeout(() => {
      newItemActive.classList.add("carousel_item__next");
      itemActive.classList.add("carousel_item__next");
    }, 20);
  } else {
    // check if toIndex exceeds the number of carousel items
    if (toIndex < 0) {
      toIndex = itemsArray.length - 1;
    }

    newItemActive = itemsArray[toIndex];

    // start transition
    newItemActive.classList.add("carousel_item__pos_prev");
    setTimeout(() => {
      newItemActive.classList.add("carousel_item__prev");
      itemActive.classList.add("carousel_item__prev");
    }, 20);
  }

  // remove all transition class and switch active class
  newItemActive.addEventListener(
    "transitionend",
    () => {
      itemActive.className = "carousel_item";
      newItemActive.className = "carousel_item carousel_item__active";
      onSlide = false;
    },
    {
      once: true,
    }
  );
}

function getItemActiveIndex() {
  const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
  const itemActive = document.querySelector(".carousel_item__active");
  const itemActiveIndex = itemsArray.indexOf(itemActive);
  return itemActiveIndex;
}

// /////////////////////////////////////////   Chat Js //////////////

am4core.ready(function () {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create("chartdiv", am4charts.PieChart3D);
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

  chart.legend = new am4charts.Legend();

  chart.data = [
    { country: "Neft", litres: 600 },
    { country: "Gaz", litres: 500 },
    { country: "Benzin", litres: 100 },
    { country: "Dizel", litres: 600 },
    { country: "Asfalt", litres: 500 },
    { country: "Ko'mir", litres: 800 },
    { country: "Mator Moyi", litres: 900 },
    { country: "kerasin", litres: 150 },
  ];

  var series = chart.series.push(new am4charts.PieSeries3D());
  series.dataFields.value = "litres";
  series.dataFields.category = "country";
  series.ticks.template.disabled = true;
  series.alignLabels = false;
  series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
  series.labels.template.radius = am4core.percent(-40);
  series.labels.template.fill = am4core.color("white");
  series.labels.template.relativeRotation = 90;

  chart.responsive.enabled = true;
  chart.responsive.useDefault = false;
  chart.responsive.rules.push({
    relevant: function (target) {
      if (target.pixelWidth <= 767) {
        return true;
      }

      return false;
    },
    state: function (target, stateId) {
      if (target instanceof am4charts.Chart) {
        var state = target.states.create(stateId);
        state.properties.paddingTop = 0;
        state.properties.paddingRight = 0;
        state.properties.paddingBottom = 0;
        state.properties.paddingLeft = 0;
        return state;
      } else if (
        target instanceof am4charts.AxisLabelCircular ||
        target instanceof am4charts.PieTick
      ) {
        var state = target.states.create(stateId);
        state.properties.disabled = true;
        return state;
      }
      return null;
    },
  });

  // Add click event listener to each path
  var paths = document.querySelectorAll(".path");
  paths.forEach(function (path, index) {
    path.addEventListener("click", function () {
      console.log(index);
      paths.forEach(function (p) {
        p.classList.remove("active");
      });
      path.classList.add("active");
      var newData = getChartData(index); // Replace with your own logic to get the appropriate data for each path

      // Set the new data to the chart
      chart.data = newData;
    });
  });

  // Function to return the appropriate data for each path
  function getChartData(index) {
    if (index === 0) {
      return [
        { country: "Neft", litres: 50 },
        { country: "Gaz", litres: 75 },
        { country: "Benzin", litres: 150 },
        { country: "Dizel", litres: 90.4 },
        { country: "Asfalt", litres: 600 },
        { country: "Ko'mir", litres: 400 },
        { country: "Mator Moyi", litres: 900 },
        { country: "kerasin", litres: 75.6 },
      ];
    } else if (index === 1) {
      return [
        { country: "Neft", litres: 90 },
        { country: "Gaz", litres: 250 },
        { country: "Benzin", litres: 550 },
        { country: "Dizel", litres: 80.4 },
        { country: "Asfalt", litres: 100 },
        { country: "Ko'mir", litres: 500 },
        { country: "Mator Moyi", litres: 400 },
        { country: "kerasin", litres: 95.6 },
      ];
    } else if (index === 2) {
      return [
        { country: "Neft", litres: 100 },
        { country: "Gaz", litres: 95 },
        { country: "Benzin", litres: 550 },
        { country: "Dizel", litres: 40.4 },
        { country: "Asfalt", litres: 800 },
        { country: "Ko'mir", litres: 900 },
        { country: "Mator Moyi", litres: 200 },
        { country: "kerasin", litres: 65.6 },
      ];
    } else if (index === 3) {
      return [
        { country: "Neft", litres: 800 },
        { country: "Gaz", litres: 150 },
        { country: "Benzin", litres: 950 },
        { country: "Dizel", litres: 20.4 },
        { country: "Asfalt", litres: 500 },
        { country: "Ko'mir", litres: 700 },
        { country: "Mator Moyi", litres: 700 },
        { country: "kerasin", litres: 55.6 },
      ];
    } else if (index === 4) {
      return [
        { country: "Neft", litres: 700 },
        { country: "Gaz", litres: 550 },
        { country: "Benzin", litres: 150 },
        { country: "Dizel", litres: 900 },
        { country: "Asfalt", litres: 500 },
        { country: "Ko'mir", litres: 100 },
        { country: "Mator Moyi", litres: 700 },
        { country: "kerasin", litres: 25.6 },
      ];
    } else if (index === 5) {
      return [
        { country: "Neft", litres: 80 },
        { country: "Gaz", litres: 555 },
        { country: "Benzin", litres: 660 },
        { country: "Dizel", litres: 568 },
        { country: "Asfalt", litres: 489 },
        { country: "Ko'mir", litres: 156 },
        { country: "Mator Moyi", litres: 700 },
        { country: "kerasin", litres: 485 },
      ];
    } else if (index === 6) {
      return [
        { country: "Neft", litres: 100 },
        { country: "Gaz", litres: 95 },
        { country: "Benzin", litres: 550 },
        { country: "Dizel", litres: 40.4 },
        { country: "Asfalt", litres: 800 },
        { country: "Ko'mir", litres: 900 },
        { country: "Mator Moyi", litres: 200 },
        { country: "kerasin", litres: 65.6 },
      ];
    } else if (index === 7) {
      return [
        { country: "Neft", litres: 850 },
        { country: "Gaz", litres: 565 },
        { country: "Benzin", litres: 850 },
        { country: "Dizel", litres: 102 },
        { country: "Asfalt", litres: 300 },
        { country: "Ko'mir", litres: 400 },
        { country: "Mator Moyi", litres: 500 },
        { country: "kerasin", litres: 700 },
      ];
    } else if (index === 8) {
      return [
        { country: "Neft", litres: 800 },
        { country: "Gaz", litres: 900 },
        { country: "Benzin", litres: 750 },
        { country: "Dizel", litres: 60.4 },
        { country: "Asfalt", litres: 500 },
        { country: "Ko'mir", litres: 400 },
        { country: "Mator Moyi", litres: 300 },
        { country: "kerasin", litres: 25.6 },
      ];
    } else if (index === 9) {
      return [
        { country: "Neft", litres: 800 },
        { country: "Gaz", litres: 250 },
        { country: "Benzin", litres: 150 },
        { country: "Dizel", litres: 900 },
        { country: "Asfalt", litres: 600 },
        { country: "Ko'mir", litres: 400 },
        { country: "Mator Moyi", litres: 900 },
        { country: "kerasin", litres: 750 },
      ];
    } else if (index === 10) {
      return [
        { country: "Neft", litres: 100 },
        { country: "Gaz", litres: 752 },
        { country: "Benzin", litres: 450 },
        { country: "Dizel", litres: 400 },
        { country: "Asfalt", litres: 600 },
        { country: "Ko'mir", litres: 400 },
        { country: "Mator Moyi", litrs: 900 },
        { country: "kerasin", litres: 540 },
      ];
    } else if (index === 11) {
      return [
        { country: "Neft", litres: 500 },
        { country: "Gaz", litres: 250 },
        { country: "Benzin", litres: 550 },
        { country: "Dizel", litres: 45.4 },
        { country: "Asfalt", litres: 800 },
        { country: "Ko'mir", litres: 900 },
        { country: "Mator Moyi", litres: 200 },
        { country: "kerasin", litres: 65.6 },
      ];
    } else if (index === 12) {
      return [
        { country: "Neft", litres: 600 },
        { country: "Gaz", litres: 500 },
        { country: "Benzin", litres: 100 },
        { country: "Dizel", litres: 600 },
        { country: "Asfalt", litres: 500 },
        { country: "Ko'mir", litres: 800 },
        { country: "Mator Moyi", litres: 900 },
        { country: "kerasin", litres: 150 },
      ];
    } else if (index === 13) {
      return [
        { country: "Neft", litres: 180 },
        { country: "Gaz", litres: 160 },
        { country: "Benzin", litres: 190 },
        { country: "Dizel", litres: 150 },
        { country: "Asfalt", litres: 130 },
        { country: "Ko'mir", litres: 350 },
        { country: "Mator Moyi", litres: 300 },
        { country: "kerasin", litres: 550 },
      ];
    } else {
      // Handle other indices or return default data
      return [
        { country: "Neft", litres: 600 },
        { country: "Gaz", litres: 500 },
        { country: "Benzin", litres: 100 },
        { country: "Dizel", litres: 600 },
        { country: "Asfalt", litres: 500 },
        { country: "Ko'mir", litres: 800 },
        { country: "Mator Moyi", litres: 900 },
        { country: "kerasin", litres: 150 },
      ];
    }
  }
}); // end am4core.ready()

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// stop Video when modal Closed

var modal = document.getElementById("exampleModal");
var video = document.getElementById("youtube-video");

modal.addEventListener("hidden.bs.modal", function () {
  video.contentWindow.postMessage(
    '{"event":"command","func":"pauseVideo","args":""}',
    "*"
  );
});

var offcanvasElement = document.getElementById("navbarOffcanvas");
offcanvasElement.addEventListener("click", function (event) {
  if (event.target === offcanvasElement) {
    event.stopPropagation();
  }
});
