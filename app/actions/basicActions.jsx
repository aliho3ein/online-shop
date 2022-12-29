/* aside Nav*/
function asideEffect() {
  const nav = document.querySelectorAll(".mainNav");
  nav.forEach((item) =>
    item.addEventListener("click", () => {
      document.querySelector(".navActive")?.classList.remove("navActive");
      item.classList.add("navActive");

      /*under Navbar*/
      document.querySelector(".activeInNav")?.classList.remove("activeInNav");
      document
        .querySelector(`.innerNav${item.dataset.nav}`)
        ?.classList.add("activeInNav");
    })
  );
}

function maniNavEffect(event) {
  event.target.classList.add("navActive");
}

/* inner Nav*/
function innerNav() {
  const inNav = document.querySelectorAll(".inNav");
  inNav.forEach((item) =>
    item.addEventListener("click", () => {
      document.querySelector(".inNavActive")?.classList.remove("inNavActive");
      item.classList.add("inNavActive");
    })
  );
}

/* category Group */
function openGroup(id) {
  document.querySelector(`.bd${id}`)?.classList.toggle("activeGroup");
  document.querySelector(`.ar${id}`)?.classList.toggle("activeCat");
}

export { maniNavEffect, asideEffect, innerNav, openGroup };
