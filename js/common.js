const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
    toggle.querySelector("a").innerHTML = "<img src='./assets/img/menu-icon.svg' >";
  } else {
    menu.classList.add("active");
    toggle.querySelector("a").innerHTML = "<img src='./assets/img/menu-icon.svg' >";
  }
}


/* Event Listeners */
toggle.addEventListener("click", toggleMenu, false);



