import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
/** */
import { asideEffect, innerNav } from "../../actions/basicActions";
import activeNav from "../../actions/asideNavActions";
/* Styles */
import CSS from "csstype";
import style from "./../../../styles/component/_aside.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faPalette,
  faUserLock,
  faLifeRing,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectCat, selectItem } from "../../store/slice/portalSlice";
import { logOutUser } from "../../store/slice/loginSlice";

export default function MainAside() {
  const router = useRouter();
  const dispatcher = useAppDispatch();
  const allCategorys = useAppSelector(selectCat);
  const allItems = useAppSelector(selectItem);

  useEffect(() => {
    asideEffect();
    innerNav();
  }, []);

  /* Get Router must every time running */
  useEffect(() => {
    activeNav(router.asPath, allCategorys, allItems);
  });

  /* Styles Variable */
  const wd_1: CSS.Properties = {
    ["--wd" as any]: "165",
  };
  const wd_2: CSS.Properties = {
    ["--wd" as any]: "115",
  };
  const i_1: CSS.Properties = {
    ["--i" as any]: "1",
  };
  const i_2: CSS.Properties = {
    ["--i" as any]: "2",
  };
  const i_3: CSS.Properties = {
    ["--i" as any]: "3",
  };

  const [cookies, setCookies] = useCookies(["login"]);

  const logOut = () => {
    setCookies("login", null, { path: "/" });
    dispatcher(logOutUser());
  };

  return (
    <aside id="aside">
      <ul className="mainNavBase">
        <li className={`mainNav`} data-nav="1">
          <FontAwesomeIcon className="icon" icon={faSliders} />
          Verwaltung
          <ul className="innerNav1" style={wd_1}>
            <li
              className="inNav"
              style={i_1}
              onClick={() => router.push("/portal/categorys")}
            >
              Kategorien
            </li>

            <li
              className="inNav"
              style={i_2}
              onClick={() => router.push("/portal/itemsGroup")}
            >
              Artikel
            </li>
            <li className={`noDrop ${style.inNav}`} style={i_3}>
              Überblick
            </li>
          </ul>
        </li>
        <li className="mainNav" data-nav="2">
          <FontAwesomeIcon className="icon" icon={faPalette} />
          Erscheinungsbild
          <ul className="innerNav2" style={wd_2}>
            <li
              className="inNav"
              onClick={() => router.push("/theme/paint")}
              style={i_1}
            >
              Thema
            </li>
            <li
              className="inNav"
              onClick={() => router.push("/theme/fonts")}
              style={i_2}
            >
              Schriftart
            </li>
          </ul>
        </li>
        <li className={`mainNav`} data-nav="3">
          <FontAwesomeIcon className="icon" icon={faUserLock} />
          Sicherheit
          <ul className="innerNav3" style={wd_1}>
            <li
              className="inNav"
              onClick={() => router.push("/security/profile")}
              style={i_1}
            >
              Profile
            </li>
            <li
              className="inNav"
              onClick={() => router.push("/security")}
              style={i_2}
            >
              Alle Nutzer
            </li>
            <li
              className="inNav"
              onClick={() => router.push("/security/userForm")}
              style={i_3}
            >
              neuer Benutzer
            </li>
          </ul>
        </li>
        <li className="mainNav" data-nav="4">
          <FontAwesomeIcon className="icon" icon={faLifeRing} />
          Tutorial
          <ul className="innerNav4" style={wd_1}>
            <li className={style.inNav} style={i_1}>
              Verwaltung
            </li>
            <li className={style.inNav} style={i_2}>
              Benutzer
            </li>
            <li className={style.inNav} style={i_3}>
              Erscheinungsbild
            </li>
          </ul>
        </li>
        <li className="mainNav noDrop" data-nav="5">
          <FontAwesomeIcon className="icon" icon={faFlag} />
          Fehler Melden
        </li>
      </ul>
      <button className="logout" onClick={logOut}>
        Abmelden
      </button>
    </aside>
  );
}
