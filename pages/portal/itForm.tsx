import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import CallApi from "../../app/instance/api";
import {
  addItem,
  selectItem,
  updateItem,
} from "../../app/store/slice/portalSlice";
import { selectUser } from "../../app/store/slice/loginSlice";
import { addPm, backToMainPm } from "./../../app/actions/alerts";
import { checkValidation, inValidInput } from "../../app/actions/validations";
/* Upload Image */
import { storage } from "../../app/instance/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
/** styles */
import style from "./../../styles/component/_itemsForm.module.scss";
import FixedItems from "../../app/component/fixedItems";
import UserPanelLayout from "../../app/component/fixedArea/main";

export default function ItForm() {
  let [catImage, SetCatImage] = useState<string | null>();
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

  const dispatcher = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);

  /* Edit */
  const items = useAppSelector(selectItem);

  const Edit = router.query.key;
  const thisItem: any = items.find((item: any) => item.key == Edit);

  /* Upload Category Image */
  let uploadPic = (e: any) => {
    const IMG = e.target.files[0];
    if (IMG == null) return;
    const imageRef = ref(storage, `category/${Date.now()}`);
    uploadBytes(imageRef, IMG).then((res) =>
      getDownloadURL(res.ref).then((url) => {
        SetCatImage(url);
      })
    );
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
            .post("/items.json", newItem)
            .then((res: any) => {
              newItem.key = res.data.name;
              dispatcher(addItem(newItem));
              addPm("success", "Item wurde gespeichert");
              router.push("/portal/itemsGroup");
            })
            .catch((err) => console.log(err))
        : CallApi()
            .put(`/items/${Edit}.json`, newItem)
            .then((res: any) => {
              newItem.key = Edit;
              dispatcher(updateItem(newItem));
              addPm("success", "Item wurde bearbeitet");
              router.push("/portal/itemsGroup");
            })
            .catch((err) => console.log("error"));
    }
  };

  type inPut = HTMLInputElement | null;

  const addNewItem = () => {
    const title = document.querySelector(".formTitle") as inPut;
    const brand = document.querySelector(".formBrand") as inPut;
    const url = document.querySelector(".formUrl") as inPut;
    const price = document.querySelector(".formPrice") as inPut;
    const off = document.getElementById("offerItem") as inPut;
    const offPrice = document.querySelector("#offPrice") as inPut;
    const desc = document.querySelector(".desc") as inPut;
    const soldOut = document.querySelector("#noItem") as inPut;

    newItem = {
      user,
      category: router.query.cat,
      title: title?.value,
      image: catImage || url?.value,
      brand: brand?.value,
      price: price?.value,
      off: off?.checked,
      offPrice: offPrice?.value,
      description: desc?.value,
      rating: "",
      soldOut: soldOut?.checked,
      date: new Date().toDateString(),
    };

    user && checkValidation(addIt, newItem);
  };

  /* Back To Main */
  const backToMain = () => {
    changeInput ? backToMainPm(pushToMain) : pushToMain();
  };
  const pushToMain = () => {
    router.push("/portal/itemsGroup");
  };

  return (
    <div className="formCatItem">
      <span
        className="backToCat"
        onClick={backToMain}
        title="züruck zu Items group"
      >
        -
      </span>
      {Edit && (
        <p>
          erstellt von <strong>{thisItem?.user}</strong> am
          <span> {thisItem?.date}</span>
        </p>
      )}
      <section>
        <label>Brand</label>
        <input
          type="input"
          defaultValue={thisItem?.brand}
          className="formBrand"
          placeholder="Brand "
        />
      </section>
      <section>
        <label>Title</label>
        <input
          type="input"
          className="formTitle"
          placeholder="Artikle Name"
          defaultValue={thisItem?.title}
        />
      </section>

      <section>
        <label>Bild</label>
        <input
          type="input"
          className="formUrl"
          defaultValue={thisItem?.image}
          placeholder="URL Https://"
        />
        oder
        <input
          type="file"
          onChange={uploadPic}
          className="formImg"
          accept="image/*"
        />
        <label>
          <span>bilder von PC haben priorität</span>
        </label>
      </section>
      <section>
        <label>Preis</label>
        <input
          type="input"
          defaultValue={thisItem?.price}
          className="formPrice"
          placeholder="in Euro"
        />
        <label htmlFor="offerItem" className="offerLabel">
          <input
            type="checkbox"
            id="offerItem"
            defaultChecked={thisItem?.off}
          />
          hat Artikel ein angebot ?
          <input
            type="input"
            id="offPrice"
            className="offPrice"
            defaultValue={thisItem?.offPrice}
            placeholder="Preis in Angebout"
          />
        </label>
      </section>
      <section>
        <label>Bezeichnung</label>
        <textarea
          name=""
          id=""
          className="desc"
          defaultValue={thisItem?.description}
          placeholder=" Technische Merkmale "
        ></textarea>
      </section>
      <section>
        <label htmlFor="noItem" className={style.offerLabel}>
          <input
            type="checkbox"
            id="noItem"
            defaultChecked={thisItem?.soldOut}
          />
          Artikel ist ausverkauft ?
        </label>
      </section>
      <section className="singleCategoryBtns">
        {Edit ? (
          <>
            <button onClick={addNewItem}>Bearbeiten</button>
            <button className="noDrop">Löschen</button>
          </>
        ) : (
          <button onClick={addNewItem}>Hinzufügen</button>
        )}
      </section>
      <div className="freePlace"></div>
    </div>
  );
}

ItForm.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
