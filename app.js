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
