// pop up one and close

const btns = document.querySelectorAll(".bbtn");
const popupBox = document.querySelectorAll(".popup");
const closePop = document.querySelectorAll("#close");

btns.forEach((item) => {
  item.addEventListener("click", function () {
    const getbtnsAttr = item.getAttribute("popupbutton");

    popupBox.forEach((pop) => {
      const getPopAtrr = pop.getAttribute("popup");

      if (getbtnsAttr === getPopAtrr) {
        pop.classList.add("active");
      } else {
        pop.classList.remove("active");
      }
    });
  });
});

closePop.forEach((item) => {
  item.addEventListener("click", function () {
    const getCloseAttr = item.getAttribute("closepop");

    popupBox.forEach((pop) => {
      const getPopAtrr = pop.getAttribute("popup");

      if (getCloseAttr === getPopAtrr) {
        pop.classList.remove("active");
      }
    });
  });
});
