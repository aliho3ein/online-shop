/* Check Items Form Inputs Validations */
const checkValidation = (
  func,
  title,
  brand,
  img,
  url,
  price,
  off,
  offPrice,
  desc
) => {
  /* Brand */
  if (!brand.value) return func(false, "Brand ist nicht gültig", "formBrand");
  /* Title */ else if (!title.value)
    return func(false, "Title ist nicht gültig", "formTitle");
  /* Image */ else if (!img && !url.value)
    return func(false, "Das Bild ist nicht gültig", "formUrl");
  /* Price */ else if (!price.value)
    return func(false, "Preis ist nicht gültig", "formPrice");
  /* Sale Price */ else if (off.checked && !offPrice.value)
    return func(false, "neue Preis ist nicht gültig", "offPrice");
  /* Description */ else if (desc.value <= 10)
    return func(
      false,
      "Die Beschreibung muss mindestens 10 Zeichen lang sein",
      "desc"
    );
  else return func(true);
};

const catValidation = (func, title, img, url) => {
  /* Brand */
  if (!title.value) return func(false, "Tittle ist nicht gültig", "formTitle");
  /* Image */ else if (!img && !url.value)
    return func(false, "Das Bild ist nicht gültig", "formUrl");
  else return func(true);
};

const userValidation = (func, mail, userName, password) => {
  /* Brand */
  if (!mail.value) return func(false, "Email ist nicht gültig", "formEmail");
  /* Image */ else if (!userName.value)
    return func(false, "UserName ist nicht gültig", "formUsername");
  /* Image */ else if (!password.value)
    return func(false, "Kennwort ist nicht gültig", "formPass");
  else return func(true);
};

function inValidInput(cls) {
  document.querySelector(".inValidInput")?.classList.remove("inValidInput");
  document.querySelector(`.${cls}`).classList.add("inValidInput");
}

export { checkValidation, inValidInput, catValidation, userValidation };
