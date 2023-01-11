/* Check Items Form Inputs Validations */
const checkValidation = (func, item) => {
  /* Brand */
  if (!item.brand) return func(false, "Brand ist nicht gültig", "formBrand");
  /* Title */ else if (!item.title)
    return func(false, "Title ist nicht gültig", "formTitle");
  /* Image */ else if (!item.image)
    return func(false, "Das Bild ist nicht gültig", "formUrl");
  /* Price */ else if (!item.price)
    return func(false, "Preis ist nicht gültig", "formPrice");
  /* Sale Price */ else if (item.off && !item.offPrice)
    return func(false, "neue Preis ist nicht gültig", "offPrice");
  /* Description */ else if (item.description <= 10)
    return func(
      false,
      "Die Beschreibung muss mindestens 10 Zeichen lang sein",
      "desc"
    );
  else return func(true);
};

/* Check Category validation */
const catValidation = (func, cat) => {
  /* Brand */
  if (!cat.title) return func(false, "Tittle ist nicht gültig", "formTitle");
  /* Image */ else if (!cat.image)
    return func(false, "Das Bild ist nicht gültig", "formUrl");
  else return func(true);
};

/* Check User Validation */
const userValidation = (func, us) => {
  /* Brand */
  if (!us.mail) return func(false, "Email ist nicht gültig", "formEmail");
  /* Image */ else if (!us.title)
    return func(false, "UserName ist nicht gültig", "formUsername");
  /* Image */ else if (!us.pss)
    return func(false, "Kennwort ist nicht gültig", "formPass");
  /* position */ else if (!us.position)
    return func(false, "Position ist nicht gültig", "formPosition");
  else return func(true);
};

/* Shake invalid Input */
function inValidInput(cls) {
  document.querySelector(".inValidInput")?.classList.remove("inValidInput");
  document.querySelector(`.${cls}`).classList.add("inValidInput");
}

export { checkValidation, inValidInput, catValidation, userValidation };
