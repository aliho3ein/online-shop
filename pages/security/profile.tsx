import CallApi from "../../app/instance/api";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectToken } from "../../app/store/slice/loginSlice";
/** Component */
import style from "./../../styles/component/_userProfile.module.scss";
import { enableInputs } from "../../app/actions/basicActions";
import UserPanelLayout from "../../app/component/fixedArea/main";
import Head from "next/head";
import { addPm } from "../../app/actions/alerts";

/** */
interface userInterFace {
  image: string;
  date: string | any;
  mail: string;
  pss: string;
  title: string | any;
  user: string | any;
  ability: boolean[] | any;
  fullName: string;
  lastName: string;
  city: string;
  sex: string;
  birthday: string;
  phone: string;
  lastEdit: string | any;
  token: string;
  position: string;
}

export default function Profile() {
  const [userData, setUserData] = useState<userInterFace | undefined>();

  const key = useAppSelector(selectToken);

  useEffect(() => {
    CallApi()
      .get(`/users/${key}.json`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log("User Error"));
  }, []);

  const saveData = (newData: object): void => {
    CallApi()
      .put(`/users/${key}.json`, newData)
      .then((res) => {
        setUserData(res.data);
        addPm("success", "änderung wurde gespeichert");
        enableInputs();
      })
      .catch((err) => console.log("User Error"));
  };

  const getNewData = (e: any) => {
    let dataArr: any = [];
    let arr = document.querySelectorAll(".changeAble") as any;
    arr.forEach((item: any) => dataArr.push(item?.value));

    const userNewData = {
      fullName: dataArr[0],
      lastName: dataArr[1],
      mail: dataArr[2],
      pss: dataArr[3],
      city: dataArr[4],
      sex: dataArr[5],
      birthday: dataArr[6],
      phone: dataArr[7],
      image: "",
      ability: userData?.ability,
      date: userData?.date,
      title: userData?.title,
      user: userData?.user,
      token: userData?.token,
      position: userData?.position,
      lastEdit: new Date().toDateString(),
    };
    saveData(userNewData);
  };

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className={style.baseProfile}>
        <div className={style.prImg}></div>
        <h2>{userData?.title}</h2>
        <span className={style.lastEdit}>
          letzte Änderung am {userData?.lastEdit}
        </span>

        <ul>
          <button className="editBtn" onClick={enableInputs}>
            Bearbeiten
          </button>
          <button className="saveBtn" onClick={getNewData}>
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
              defaultValue={userData?.fullName}
              placeholder="Max"
              disabled
            />
          </li>
          <li>
            Nachname
            <input
              type="input"
              className="changeAble"
              defaultValue={userData?.lastName}
              placeholder="Mustermann"
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
              defaultValue={userData?.city}
              placeholder="Berlin"
              disabled
            />
          </li>
          <li>
            Position
            <input type="input" defaultValue={userData?.position} disabled />
          </li>
          <li>
            Geschlecht
            <input
              type="input"
              className="changeAble"
              defaultValue={userData?.sex}
              placeholder="Männlich"
              disabled
            />
          </li>
          <li>
            Geburtstag
            <input
              type="input"
              className="changeAble"
              defaultValue={userData?.birthday}
              placeholder="TT.MM.JJ"
              disabled
            />
          </li>
          <li>
            Work phone
            <input
              type="input"
              className="changeAble"
              defaultValue={userData?.phone}
              placeholder="049 123456789"
              disabled
            />
          </li>
          <li>
            Konto Zugang
            <strong>
              <br />
              {userData?.ability[0] &&
                "Sie sind ein Admin-Benutzer und haben Zugriff auf alle Bereiche"}
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
    </>
  );
}

Profile.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
