import { useEffect, useState } from "react";
import {
  scValid,
  selectUser,
  updateItem,
} from "../../app/store/slice/loginSlice";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CallApi from "../../app/instance/api";
import style from "./../../styles/component/_itemsForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { copyCode } from "../../app/actions/basicActions";
import { rnId, mxId } from "../../app/actions/randomCode";
import { userValidation, inValidInput } from "../../app/actions/validations";
import { addPm, backToMainPm } from "./../../app/actions/alerts";
import UserPanelLayout from "../../app/component/fixedArea/main";
import Head from "next/head";

interface usData {
  title: string;
  mail: string;
  pss: string;
  image: string | null;
  user: string;
  date: string;
  ability: any;
  position: string;
}

export default function userForm() {
  const dispatcher = useAppDispatch();
  let [userData, setUserData] = useState<usData | null>();
  /* Check if Change */
  let [changeInput, SetChangeInput] = useState<boolean | null>();

  /* Check if Input Change */
  useEffect(() => checkInputs(), []);
  let checkInputs = () => {
    const inputs: any = document.querySelectorAll("input");
    inputs.forEach((item: any) => {
      item.addEventListener("change", () => SetChangeInput(true));
    });
  };

  const router = useRouter();
  /* GetUserName */
  const user = useAppSelector(selectUser);
  const valid = useAppSelector(scValid);
  /** Get Query */
  const Edit = router.query.id;

  useEffect(() => {
    if (Edit) {
      CallApi()
        .get(`/users/${Edit}.json`)
        .then((res: any) => {
          setUserData(res.data);
        });
    }
  }, []);

  /* Create Random Password */
  const createPsWd = () => {
    (document.querySelector(".formPass") as HTMLInputElement).value = rnId();
  };

  /* Add/Edit Item*/
  let newItem: any;
  const addIt = (valid: boolean, pm?: string, cls?: string) => {
    if (!valid) {
      addPm("error", pm);
      inValidInput(cls);
    } else {
      !Edit
        ? CallApi()
            .post("/users.json", newItem)
            .then((res: any) => {
              newItem.key = res.data.name;
              // dispatcher(addItem(newItem));
              addPm("success", "User wurde gespeichert");
              router.push("/security/");
            })
            .catch((err) => console.log(err))
        : CallApi()
            .put(`/users/${Edit}.json`, newItem)
            .then((res: any) => {
              newItem.key = Edit;
              dispatcher(updateItem(newItem));
              addPm("success", "User wurde bearbeitet");
              router.push("/security/");
            })
            .catch((err) => console.log("error"));
    }
  };

  type inPut = HTMLInputElement | null;
  const addNewItem = () => {
    const mail = document.querySelector(".formEmail") as inPut;
    const userName = document.querySelector(".formUsername") as inPut;
    const password = document.querySelector(".formPass") as inPut;
    const position = document.querySelector(".formPosition") as inPut;
    /** abilities */
    const admin = document.getElementById("userAdmin") as inPut;
    const manage = document.getElementById("userManage") as inPut;
    const them = document.getElementById("userTheme") as inPut;
    const security = document.getElementById("userSecurity") as inPut;

    newItem = {
      fullName: "",
      lastName: "",
      city: "",
      sex: "",
      birthday: "",
      phone: "",
      user,
      title: userName?.value,
      mail: mail?.value,
      image: "",
      pss: password?.value,
      position: position?.value,
      ability: [
        admin?.checked,
        manage?.checked,
        them?.checked,
        security?.checked,
      ],
      date: new Date().toDateString(),
      token: mxId(),
      lastEdit: new Date().toDateString(),
    };

    valid
      ? userValidation(addIt, newItem)
      : addPm("error", "Sie haben keine Erlaubnis");
  };

  /* Back To Main */
  const backToMain = () => {
    changeInput ? backToMainPm(pushToMain) : pushToMain();
  };
  const pushToMain = () => {
    router.push("/security");
  };

  return (
    <>
      <Head>
        <title>Nutzer Formular</title>
      </Head>
      <div className="formCatItem">
        <span
          className="backToCat"
          onClick={backToMain}
          title="züruck zu Users group"
        >
          -
        </span>
        {Edit && (
          <p>
            erstellt von <strong>{userData?.user}</strong> am
            <span> {userData?.date}</span>
          </p>
        )}
        <section>
          <label>Email Address</label>
          <input
            type="input"
            className="formEmail"
            placeholder="user@email.com"
            defaultValue={userData?.mail}
          />
        </section>
        <section>
          <label>user name</label>
          <input
            type="input"
            className="formUsername"
            placeholder="username"
            defaultValue={userData?.title}
          />
        </section>
        <section>
          <label title="neue Kennwort">
            Kennwort
            <FontAwesomeIcon
              className="icon"
              onClick={createPsWd}
              icon={faArrowsRotate}
            />
          </label>
          <input
            type="input"
            className="formPass cpCur"
            placeholder="Aktualieren Sie,um ein Passwort zu erhalten"
            onClick={copyCode}
            defaultValue={userData?.pss}
            readOnly
          />
          <span>Das Passwort wird an Ihre angegebene E-Mail gesendet</span>
        </section>

        <section>
          <label>Position</label>
          <input
            type="input"
            className="formPosition"
            placeholder="Gruppenführer , Assistent ..."
            defaultValue={userData?.position}
          />
        </section>

        <section>
          <label>Fähigkeit</label>
          <div className="formCheckboxes">
            <label htmlFor="userAdmin">
              <input
                type="checkbox"
                id="userAdmin"
                defaultChecked={userData?.ability[0]}
                disabled
              />
              Voller Zugriff
              <span title="Voller Zugriff ist nur für Admin-Benutzer">?</span>
            </label>

            <label htmlFor="userManage">
              <input
                type="checkbox"
                id="userManage"
                defaultChecked={userData?.ability[1]}
              />
              Verwaltung
              <span title="Benutzer darf Kategorien  und Produkte  hinzufügen und entfernen">
                ?
              </span>
            </label>

            <label htmlFor="userTheme">
              <input
                type="checkbox"
                id="userTheme"
                defaultChecked={userData?.ability[2]}
              />
              Erscheinungsbild
              <span title="Der Benutzer darf das Theme ändern">?</span>
            </label>

            <label htmlFor="userSecurity">
              <input
                type="checkbox"
                id="userSecurity"
                defaultChecked={userData?.ability[3]}
              />
              sicherheits
              <span title="Benutzer darf einen neuen Benutzer hinzufügen , löschen oder die Fähigkeit ändern ( außer dem Admin-Benutzer )  ">
                ?
              </span>
            </label>
          </div>
          <section className="singleCategoryBtns">
            {Edit ? (
              <button onClick={addNewItem}>Bearbeiten</button>
            ) : (
              <button onClick={addNewItem}>Hinzufügen</button>
            )}
          </section>
          <div className={style.freePlace}></div>
        </section>
      </div>
    </>
  );
}

userForm.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
