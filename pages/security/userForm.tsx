/** */
import FixedItems from "../../app/component/fixedItems";
import style from "./../../styles/component/_itemsForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { copyCode } from "../../app/actions/basicActions";
import { rnId } from "../../app/actions/randomCode";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import CallApi from "../../app/instance/api";
import { userValidation, inValidInput } from "../../app/actions/validations";
import { addPm, backToMainPm } from "./../../app/actions/alerts";
import { useRouter } from "next/router";
import { selectUser } from "../../app/store/slice/portalSlice";

/* Function Start */
export default function userForm() {
  const dispatcher = useAppDispatch();
  const router = useRouter();
  /* GetUserName */
  const user = useAppSelector(selectUser);
  /** */
  const Edit = router.query.key;

  /* create Password */
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
              router.push("/portal/");
            })
            .catch((err) => console.log(err))
        : CallApi()
            .put(`/users/${Edit}.json`, newItem)
            .then((res: any) => {
              newItem.key = Edit;
              // dispatcher(updateItem(newItem));
              addPm("success", "User wurde bearbeitet");
              router.push("/portal/");
            })
            .catch((err) => console.log("error"));
    }
  };

  const addNewItem = () => {
    const mail = document.querySelector(
      ".formEmail"
    ) as HTMLInputElement | null;
    const userName = document.querySelector(
      ".formUsername"
    ) as HTMLInputElement | null;
    const password = document.querySelector(
      ".formPass"
    ) as HTMLInputElement | null;

    newItem = {
      user,
      userName: userName?.value,
      mail: mail?.value,
      image: "",
      pss: password?.value,
      ability: [true, true, true, true],
      date: new Date().toDateString(),
    };

    userValidation(addIt, mail, userName, password);
  };

  return (
    <main>
      <FixedItems />
      <section id="bSide">
        <div className="formCatItem">
          <span className="backToCat" title="züruck zu Users group">
            -
          </span>
          <section>
            <label>Email Address</label>
            <input
              type="input"
              className="formEmail"
              placeholder="user@email.com"
            />
          </section>
          <section>
            <label>user name</label>
            <input
              type="input"
              className="formUsername"
              placeholder="username"
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
              readOnly
            />
            <span>Das Passwort wird an Ihre angegebene E-Mail gesendet</span>
          </section>
          <section>
            <label>Fähigkeit</label>
            <div className="formCheckboxes">
              <label htmlFor="userAdmin">
                <input type="checkbox" id="userAdmin" disabled />
                Voller Zugriff
                <span title="Voller Zugriff ist nur für Admin-Benutzer">?</span>
              </label>

              <label htmlFor="userManage">
                <input type="checkbox" id="userManage" />
                Verwaltung
                <span title="Benutzer darf Kategorien  und Produkte  hinzufügen und entfernen">
                  ?
                </span>
              </label>

              <label htmlFor="userTheme">
                <input type="checkbox" id="userTheme" />
                Erscheinungsbild
                <span title="Der Benutzer darf das Theme ändern">?</span>
              </label>

              <label htmlFor="userSecurity">
                <input type="checkbox" id="userSecurity" />
                sicherheits
                <span title="Benutzer darf einen neuen Benutzer hinzufügen , löschen oder die Fähigkeit ändern ( außer dem Admin-Benutzer )  ">
                  ?
                </span>
              </label>
            </div>
            <section className="singleCategoryBtns">
              <button onClick={addNewItem}>Hinzufügen</button>
            </section>
            <div className={style.freePlace}></div>
          </section>
        </div>
      </section>
    </main>
  );
}
