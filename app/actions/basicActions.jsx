import { addPm } from "./alerts";

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

/* Copy text to the Keyboard */
function copyCode() {
  const Code = document.querySelector(".formPass");
  Code.value
    ? (Code.select(),
      document.execCommand("copy", false),
      addPm("info", "Das Kennwort wurde kopiert"))
    : addPm("warning", "Kennwort ist noch nicht da");
}

/** Login Show Pass */
function showPass() {
  let icon = document.getElementById("CPass");

  let pss = document.getElementById("formPass");
  pss.getAttribute("type") === "input" ? (
    <>
      {pss.setAttribute("type", "password")} , {(icon.innerHTML = eyeLow)}
    </>
  ) : (
    <>
      {pss.setAttribute("type", "input")} , {(icon.innerHTML = eye)}
    </>
  );
}

/** Enable Inputs in User Profile **/
const enableInputs = () => {
  const inPuts = document.querySelectorAll(".changeAble");
  inPuts.forEach((item) => item?.toggleAttribute("disabled"));

  /** Btns */
  const edit = document.querySelector(".editBtn");
  if (edit.style.display === "none") {
    edit.style.display = "block";
    document.querySelector(".saveBtn").style.display = "none";
    document.querySelector(".cnBtn").style.display = "none";
  } else {
    edit.style.display = "none";
    document.querySelector(".saveBtn").style.display = "block";
    document.querySelector(".cnBtn").style.display = "block";
  }

  /* Show Pass */
  const pss = document.getElementById("prPass");
  pss.getAttribute("type") === "input"
    ? pss.setAttribute("type", "password")
    : pss.setAttribute("type", "input");
};

export {
  maniNavEffect,
  asideEffect,
  innerNav,
  openGroup,
  copyCode,
  showPass,
  enableInputs,
};

/** Login Form Eye Icon  */
const eye =
  '<path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"></path>';
const eyeLow =
  '<path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"></path>';
