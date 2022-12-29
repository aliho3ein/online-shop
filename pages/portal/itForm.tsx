import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import {
  addItem,
  selectItem,
  selectUser,
  updateItem,
} from "../../app/store/slice/portalSlice";
import { addPm, backToMainPm } from "./../../app/actions/alerts";
/* Upload Image */
import { storage } from "../../app/instance/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
/** */
import style from "./../../styles/component/_itemsForm.module.scss";
import FixedItems from "../../app/component/fixedItems";
/** */
import CallApi from "../../app/instance/api";

export default function ItForm() {
  let [catImage, SetCatImage] = useState<string | null>();
  /* Check if Change */
  let [changeInput, SetChangeInput] = useState<boolean | null>();

  useEffect(() => checkInputs(), []);
  /* Check if Input Change */
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
  const addNewItem = () => {
    const title = document.querySelector(
      ".formTitle"
    ) as HTMLInputElement | null;
    const brand = document.querySelector(
      ".formBrand"
    ) as HTMLInputElement | null;
    const url = document.querySelector(".formUrl") as HTMLInputElement | null;
    const price = document.querySelector(
      ".formPrice"
    ) as HTMLInputElement | null;
    const off = document.getElementById("offerItem") as HTMLInputElement | null;
    const offPrice = document.querySelector(
      "#offPrice"
    ) as HTMLInputElement | null;
    const desc = document.querySelector(".desc") as HTMLInputElement | null;
    const soldOut = document.querySelector(
      "#noItem"
    ) as HTMLInputElement | null;

    let newItem: any = {
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

    !Edit
      ? CallApi()
          .post("/items.json", newItem)
          .then((res: any) => {
            newItem.key = res.data.name;
            dispatcher(addItem(newItem));
            addPm("success", "Item wurde gespeichert");
            setTimeout(() => router.push("/portal/itemsGroup"), 2000);
          })
          .catch((err) => console.log(err))
      : CallApi()
          .put(`/items/${Edit}.json`, newItem)
          .then((res: any) => {
            newItem.key = Edit;
            dispatcher(updateItem(newItem));
            addPm("success", "Item wurde bearbeitet");
            setTimeout(() => router.push("/portal/itemsGroup"), 2000);
          })
          .catch((err) => console.log("error"));
  };

  /* Back To Main */
  const backToMain = () => {
    changeInput ? backToMainPm(pushToMain) : pushToMain();
  };
  const pushToMain = () => {
    router.push("/portal/itemsGroup");
  };

  return (
    <main>
      <FixedItems />
      <section id="bSide">
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
              erstellt von <strong>Admin</strong> am <span> 22 Jan 2022</span>
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
          <div className={style.freePlace}></div>
        </div>
      </section>
    </main>
  );
}
