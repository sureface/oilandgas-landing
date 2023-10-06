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
    {
      country: "Czech Republic",
      litres: 301.9,
    },
    {
      country: "Ireland",
      litres: 201.1,
    },
    {
      country: "Germany",
      litres: 165.8,
    },
    {
      country: "Australia",
      litres: 139.9,
    },
    {
      country: "Austria",
      litres: 128.3,
    },
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
      // Update chart data based on the clicked path
      var newData = getChartData(index); // Replace with your own logic to get the appropriate data for each path

      // Set the new data to the chart
      chart.data = newData;
    });
  });

  // Function to return the appropriate data for each path
  function getChartData(index) {
    // Replace with your own logic to return the appropriate data based on the index
    // Example:
    if (index === 0) {
      return [
        { country: "Neft", litres: 50 },
        { country: "Gaz", litres: 75 },
        { country: "Benzin", litres: 150 },
        // Add more data as needed
      ];
    } else if (index === 1) {
      return [
        { country: "Benzin(Litr)", litres: 20000 },
        { country: "Gaz(kub)", litres: 30000 },
        { country: "Moy(Litr)", litres: 5000 },
        // Add more data as needed
      ];
    } else {
      // Handle other indices or return default data
      return [
        { country: "Default 1", litres: 10 },
        { country: "Default 2", litres: 20 },
        { country: "Default 3", litres: 30 },
        // Add more data as needed
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
