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

var chart;
var legend;

var chartData = [
  {
    country: "Lithuania",
    value: 260,
  },
  {
    country: "Ireland",
    value: 201,
  },
  {
    country: "Germany",
    value: 65,
  },
  {
    country: "Australia",
    value: 39,
  },
  {
    country: "UK",
    value: 19,
  },
  {
    country: "Latvia",
    value: 10,
  },
];

am4core.ready(function () {
  // PIE CHART
  chart = new am4charts.PieChart3D();
  chart.dataProvider = chartData;
  chart.titleField = "country";
  chart.valueField = "value";
  chart.outlineColor = "";
  chart.outlineAlpha = 0.8;
  chart.outlineThickness = 2;
  // this makes the chart 3D
  chart.depth3D = 20;
  chart.angle = 30;

  // WRITE
  chart.write("chartdiv");
});
