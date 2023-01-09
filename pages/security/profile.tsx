import CallApi from "../../app/instance/api";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../app/store/slice/loginSlice";
/** Component */
import style from "./../../styles/component/_userProfile.module.scss";
import { enableInputs } from "../../app/actions/basicActions";
import UserPanelLayout from "../../app/component/fixedArea/main";

/** */
interface userInterFace {
  image: string | null;
  date: string;
  mail: string;
  pss: string;
  title: string;
  user: string;
  ability: boolean[];
}

export default function Profile() {
  const [userData, setUserData] = useState<userInterFace>();

  const key = useAppSelector(selectToken);

  useEffect(() => {
    CallApi()
      .get(`/users/${key}.json`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log("User Error"));
  }, []);

  const saveData = (): void => {
    CallApi()
      .put(`/users/${key}.json`, userData)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log("User Error"));
  };

  const getNewData = (e: any) => {
    console.log(e.target.value);
    /* setUserData((state: any) => {
      return (state = [...state , state.title =  e.target.value]);
    });*/
    console.log(userData);
  };

  return (
    <div className={style.baseProfile}>
      <div className={style.prImg}></div>
      <h2>{userData?.title}</h2>
      <ul>
        <button className="editBtn" onClick={enableInputs}>
          Edit
        </button>
        <button className="saveBtn" onClick={saveData}>
          Speichern
        </button>
        <button className="cnBtn" onClick={enableInputs}>
          Abbrechen
        </button>

        <h3>Öffentliches Profil</h3>
        <li>
          Firma
          <input type="input" defaultValue="DCI" disabled />
        </li>
        <li>
          Vorname
          <input
            type="input"
            className="changeAble"
            defaultValue={userData?.title}
            onChange={getNewData}
            disabled
          />
        </li>
        <li>
          Nachname
          <input
            type="input"
            className="changeAble"
            defaultValue={userData?.title}
            disabled
          />
        </li>
        <li>
          Email
          <input
            type="input"
            className="changeAble"
            defaultValue={userData?.mail}
            disabled
          />
        </li>
        <li>
          Password
          <input
            type="password"
            id="prPass"
            className="changeAble"
            defaultValue={userData?.pss}
            disabled
          />
        </li>
        <li>
          Standort
          <input
            type="input"
            className="changeAble"
            defaultValue="düssldorf"
            disabled
          />
        </li>
        <li>
          Position
          <input type="input" defaultValue="Manager" disabled />
        </li>
        <li>
          Geschlecht
          <input
            type="input"
            className="changeAble"
            defaultValue="Männlich"
            disabled
          />
        </li>
        <li>
          Geburtstag
          <input
            type="input"
            className="changeAble"
            defaultValue="28.05.1994"
            disabled
          />
        </li>
        <li>
          Work phone
          <input
            type="input"
            className="changeAble"
            defaultValue="01759874589"
            disabled
          />
        </li>
        <li>
          Konto Zugang
          <strong>
            <br />
            {userData?.ability[0] && "Manager"}
            <br />
            {userData?.ability[1] && "Verwaltung"}
            <br />
            {userData?.ability[2] && "ErscheinungsBild"}
            <br />
            {userData?.ability[3] && "Sicherheit"}
          </strong>
        </li>
      </ul>
      <span className={style.prDate}>
        Dieses Konto wurde am {userData?.date} vom {userData?.user} erstellt
      </span>
      <div className="freePlace"></div>
    </div>
  );
}

Profile.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
