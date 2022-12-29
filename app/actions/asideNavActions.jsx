export default function activeNav(link, nav) {
  let menu = link.split("/");

  link.includes("?") && (menu[2] = menu[2].split("?")[0]);

  return nav([menu[1], menu[2], menu[3]]);
}
