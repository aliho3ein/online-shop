import CallApi from "../instance/api";
import { setCategory } from "../../app/store/slice/portalSlice";
import { setUsers } from "../store/slice/loginSlice";

/* Check user */
export default function checkUser(user) {
  const username = document.getElementById("formUser");
  const pass = document.getElementById("formPass");

  CallApi()
    .get("/users.json")
    .then((res) => {
      const dt = Object.entries(res.data).find(
        ([key, item]) =>
          item.title === username.value && item.pss === pass.value
      );
      dt && user(dt[1].title, dt[0], dt[1].ability);
    })
    .catch((err) => console.log(err));
}

const checkUserWithKey = (myKey, user) => {
  CallApi()
    .get("/users.json")
    .then((res) => {
      const dt = Object.entries(res.data).find(([key, item]) => key === myKey);
      dt && user(dt[1].title, dt[0], dt[1].ability);
    })
    .catch((err) => console.log(err));
};

/** Get User with Token */
const getUser = (key, user) => {
  CallApi()
    .get(`/users/${key}.json`)
    .then((res) => {
      user(res.data.title, key, res.data.ability);
    })
    .catch((err) => console.log(err));
};

/* Get Cat and Items */
const getDataFromDB = (dispatcher) => {
  CallApi()
    .get(".json")
    .then((res) => {
      let Cat = Object.entries(res.data.category).map(([key, value]) => {
        return { ...value, key };
      });
      let item = Object.entries(res.data.items).map(([key, value]) => {
        return { ...value, key };
      });
      dispatcher(setCategory({ Cat, item }));
      /* Set Theme */
      setBaseTheme(res.data.theme.colors);
      setBaseFont(res.data.theme.fonts);
    })
    .catch((err) => console.log("No Item To show"));
};

/* set color Theme */
const setBaseTheme = (color) => {
  const main = document.getElementById("MAIN");
  main.style.setProperty("--prime-color", `#${color[0]}`);
  main.style.setProperty("--second-color", `#${color[1]}`);

  const loginBc = document.getElementById("loginBc");
  loginBc &&
    (loginBc.style.backgroundImage = `url("data:image/svg+xml,%3Csvg id='visual' viewBox='0 0 900 600' width='900' height='600' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Crect x='0' y='0' width='900' height='600' fill='%23${color[1]}'%3E%3C/rect%3E%3Cdefs%3E%3ClinearGradient id='grad1_0' x1='33.3%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='20%25' stop-color='%23001220' stop-opacity='1'%3E%3C/stop%3E%3Cstop offset='80%25' stop-color='%23001220' stop-opacity='1'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cdefs%3E%3ClinearGradient id='grad2_0' x1='0%25' y1='0%25' x2='66.7%25' y2='100%25'%3E%3Cstop offset='20%25' stop-color='%23001220' stop-opacity='1'%3E%3C/stop%3E%3Cstop offset='80%25' stop-color='%23001220' stop-opacity='1'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg transform='translate(900, 0)'%3E%3Cpath d='M0 486.7C-58.1 462.3 -116.3 437.8 -171.1 413C-225.9 388.2 -277.3 363.1 -326.7 326.7C-376.1 290.3 -423.4 242.6 -449.7 186.3C-476 129.9 -481.4 65 -486.7 0L0 0Z' fill='%23${color[0]}'%3E%3C/path%3E%3C/g%3E%3Cg transform='translate(0, 600)'%3E%3Cpath d='M0 -486.7C62.5 -479.6 125.1 -472.4 186.3 -449.7C247.5 -427 307.3 -388.9 336.6 -336.6C365.8 -284.2 364.4 -217.7 384.3 -159.2C404.3 -100.7 445.5 -50.4 486.7 0L0 0Z' fill='%23${color[0]}'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`);
};

/* set Fonts */
const setBaseFont = (font = "Ubuntu") => {
  document.querySelector("body").style.fontFamily = font[0];
};

/* Get Users */
const getUsersFromDB = (dispatcher) => {
  CallApi()
    .get("/users.json")
    .then((res) => {
      let user = Object.entries(res.data).map(([key, value]) => {
        return { ...value, key };
      });
      dispatcher(setUsers(user));
    })
    .catch((err) => console.log("No Item To show"));
};

export {
  getDataFromDB,
  checkUserWithKey,
  getUsersFromDB,
  setBaseTheme,
  setBaseFont,
};
