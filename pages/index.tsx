import { useRouter } from "next/router";
import { useAppDispatch } from "../app/hooks";
import { logInUser } from "../app/store/slice/loginSlice";
import { showPass } from "../app/actions/basicActions";
import checkUser from "./../app/actions/logInUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faFingerprint,
  faEyeLowVision,
} from "@fortawesome/free-solid-svg-icons";
import style from "./../styles/component/_login.module.scss";

export default function Home() {
  const router = useRouter();
  const dispatcher = useAppDispatch();

  const userIsTrue = (name: string, token: string, ability: any) => {
    dispatcher(logInUser({ name, token, ability }));
    router.push("/portal");
  };

  return (
    <div className={style.loginPage}>
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
        <button onClick={() => checkUser(userIsTrue)}>LogIn</button>
      </div>
    </div>
  );
}
