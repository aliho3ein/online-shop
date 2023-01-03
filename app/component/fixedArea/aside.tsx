import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { useAppSelector } from "../../hooks";
import { selectCat, selectItem } from "../../store/slice/portalSlice";

export default function MainAside() {
  const router = useRouter();
  let [thisNav, setThisNav] = useState([]);

  const allCategorys = useAppSelector(selectCat);
  const allItems = useAppSelector(selectItem);

  useEffect(() => {
    asideEffect();
    innerNav();
    activeNav(router.asPath, allCategorys, allItems, getNav);
  }, []);

  /* Set Nav */
  let getNav = (nav: any) => {
    setThisNav(nav);
  };

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

  return (
    <aside id="aside">
      <ul className="mainNavBase">
        <li
          className={`mainNav ${thisNav[0] == "portal" && "navActive"}`}
          data-nav="1"
        >
          <FontAwesomeIcon className="icon" icon={faSliders} />
          Verwaltung
          <ul className="innerNav1" style={wd_1}>
            <li
              className={`inNav
               ${thisNav[1] == "categorys" && "inNavActive"}`}
              style={i_1}
              onClick={() => router.push("/portal/categorys")}
            >
              Kategorien
            </li>

            <li
              className={`inNav
               ${thisNav[1] == "itemsGroup" && "inNavActive"}`}
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
            <li className={style.inNav} style={i_1}>
              Thema
            </li>
            <li className={style.inNav} style={i_2}>
              Schriftart
            </li>
          </ul>
        </li>
        <li
          className={`mainNav ${thisNav[0] == "security" && "navActive"}`}
          data-nav="3"
          onClick={() => router.push("/security")}
        >
          <FontAwesomeIcon className="icon" icon={faUserLock} />
          Sicherheit
          <ul className="innerNav3" style={wd_1}>
            <li className={style.inNav} style={i_1}>
              Kennwort
            </li>
            <li className={style.inNav} style={i_2}>
              Alle Nutzer
            </li>
            <li
              className={style.inNav}
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
      <button className="logout">Abmelden</button>
    </aside>
  );
}
