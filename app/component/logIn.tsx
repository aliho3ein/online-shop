import { useAppDispatch } from "../hooks";
import { logInUser } from "../store/slice/loginSlice";
import { showPass } from "../actions/basicActions";
import checkUser, {
  checkUserWithKey,
  getThemeFromDB,
} from "../actions/logInUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faFingerprint,
  faEyeLowVision,
} from "@fortawesome/free-solid-svg-icons";
import style from "../../styles/component/_login.module.scss";
import { useEffect } from "react";

/** */
import { useCookies } from "react-cookie";

export default function LoginHome() {
  const [cookie, setCookie] = useCookies(["login"]);

  function setKey(key: string) {
    setCookie("login", key, { path: "/" });
  }

  useEffect(() => {
    getThemeFromDB();
    cookie.login && checkUserWithKey(cookie.login, userIsTrue);
  }, []);

  const dispatcher = useAppDispatch();

  const userIsTrue = (name: string, token: string, ability: any) => {
    dispatcher(logInUser({ name, token, ability }));
    const saveLogin = document.getElementById("stayLogin") as HTMLInputElement;
    saveLogin?.checked && setKey(token);
  };

  return (
    <div id="loginBc" className={style.loginPage}>
      <div className={style.logInForm}>
        <section>
          <label htmlFor="">User name</label>
          <FontAwesomeIcon className={style.icon} icon={faUserTie} />
          <input type="input" id="formUser" placeholder="Username" />
        </section>
        <section>
          <label htmlFor="">Password</label>
          <FontAwesomeIcon className={style.icon} icon={faFingerprint} />
          <input id="formPass" type="password" placeholder="Kennwort" />
          <FontAwesomeIcon
            className={style.eyeIcon}
            id="CPass"
            icon={faEyeLowVision}
            onClick={showPass}
          />
        </section>
        <label htmlFor="stayLogin" className={style.styLogin}>
          <input id="stayLogin" type="checkbox" />
          <span>angemeldet bleiben</span>
        </label>

        <button onClick={() => checkUser(userIsTrue)}>LogIn</button>
      </div>
    </div>
  );
}
