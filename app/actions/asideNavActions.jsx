export default function activeNav(link, cats, items) {
  let menu = link.split("/");
  let head = document.querySelector(".mainHeader");

  let thisItem = "",
    newPr = "",
    thisCat = "";

  /* Get Category Name */
  if (link.includes("?")) {
    let ca = "";

    ca = cats.find(
      (item) => item.key === link.split("?")[1].split("=")[1].slice(0, 20)
    );

    thisCat = `<span class='siteMap'>${ca?.title}</span>`;
  }

  /* Get Item Name */
  if (link.includes("&")) {
    const it = items.find(
      (item) => item.key === link.split("&")[1].split("=")[1]
    );
    thisItem = `<span class='siteMap'>${it?.title}</span>`;
  }

  /* remove keys and ides */
  link.includes("?") && (menu[2] = menu[2].split("?")[0]);

  let siteMap = "";
  /* First part */
  switch (menu[1]) {
    case "portal":
      siteMap = `<span class='siteMap'>Verwaltung</span>`;
      break;
    case "theme":
      siteMap = `<span class='siteMap'>Ersheinungsbild</span>`;
      break;
    case "security":
      siteMap = `<span class='siteMap'>Sicherheit</span>`;
      break;
    case "tutorial":
      siteMap = `<span class='siteMap'>Tutorial</span>`;
      break;
    case "report":
      siteMap = `<span class='siteMap'>Fehler Meldung</span>`;
      break;
    default:
      siteMap = `<span class='siteMap'>Manage Portal</span>`;
      break;
  }
  /* Second part */
  switch (menu[2]) {
    case "categorys":
      siteMap += `<span class='siteMap'>Kategories</span>`;
      break;
    case "catForm":
      siteMap += `<span class='siteMap'>Kategories</span>
      ${!thisCat ? "<span class='siteMap'>Neue Kategorie</span>" : ""}`;
      break;
    case "itemsGroup":
      siteMap += `<span class='siteMap'>Produkt Gruop</span>`;
      break;
    case "itForm":
      siteMap += "<span class='siteMap'>Produkt Gruop</span>";
      !thisItem && (newPr = "<span class='siteMap'>Neues Product</span>");
      break;
    case "paint":
      siteMap += `<span class='siteMap'>Farben</span>`;
      break;
    case "fonts":
      siteMap += `<span class='siteMap'>Shriftart</span>`;
      break;
    case "profile":
      siteMap += `<span class='siteMap'>Profile</span>`;
      break;
    case "userForm":
      siteMap += `<span class='siteMap'>Benutzer</span><span class='siteMap'>Neue Benutzer</span>`;
      break;
    case undefined:
      menu[1] == "security" && (thisCat = `<span class='siteMap'>Users</span>`);
      break;
    default:
      siteMap += `<span class='siteMap'>Not found</span>`;
      break;
  }

  head.innerHTML = siteMap + thisCat + thisItem + newPr;
}
