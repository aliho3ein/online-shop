import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPm, deletePm } from "./../../app/actions/alerts";

/* Api */
import CallApi from "../../app/instance/api";
/* slice */
import {
  addCategory,
  selectCat,
  deleteCategory,
  updateCategory,
} from "../../app/store/slice/portalSlice";
/* Upload Image */
import { storage } from "../../app/instance/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import FixedItems from "../../app/component/fixedItems";

export default function CatForm() {
  let [catImage, SetCatImage] = useState<string | null>();
  let router = useRouter();
  /* Dispatch */
  const dispatcher = useAppDispatch();

  /* Inputs */
  let thisCat: any;

  /* Edit Category */
  const Edit = router.query.id;
  const categorys = useAppSelector(selectCat);
  if (Edit) {
    thisCat = categorys.find((item: any) => item.key == Edit);

    if (!thisCat) {
      router.push("/portal");
    }
  }

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

  /* Add Category */
  let addCat = () => {
    const title = document.querySelector(
      ".formTitle"
    ) as HTMLInputElement | null;
    const hash = document.querySelector(".formHash") as HTMLInputElement | null;
    const url: any = document.querySelector(
      ".formUrl"
    ) as HTMLInputElement | null;

    let Category: any = {
      title: title?.value,
      hashtag: hash?.value,
      image: catImage || url.value,
      user: "admin",
      date: new Date().toDateString(),
    };

    !Edit
      ? CallApi()
          .post("/category.json", Category)
          .then((res: any) => {
            Category.key = res.data.name;
            dispatcher(addCategory(Category));
            addPm("success", "Kategorie wurde gespeichert");
            setTimeout(() => router.push("/portal/categorys"), 2000);
          })
          .catch((err) => console.log("error"))
      : CallApi()
          .put(`/category/${Edit}.json`, Category)
          .then((res: any) => {
            Category.key = Edit;
            dispatcher(updateCategory(Category));
            addPm("warning", "Kategorie wurde bearbeitet");
            setTimeout(() => router.push("/portal/categorys"), 2000);
          })
          .catch((err) => console.log("error"));
  };

  /* Delete category */
  const deleteCat = () => {
    CallApi()
      .delete(`/category/${Edit}.json`)
      .then((res) => {
        // dispatcher(deleteCategory(Edit));
      });
    // router.push("/portal/categorys");
  };

  return (
    <main>
      <FixedItems />
      <section id="bSide">
        <div className="formCatItem">
          <Link
            href="/portal/categorys"
            className="backToCat"
            title="züruck zu Main"
          ></Link>

          {Edit && (
            <p>
              erstellt von <strong>{thisCat.user}</strong> am
              <span> {thisCat.date}</span>
            </p>
          )}
          <section>
            <label>Title</label>
            <input
              type="input"
              placeholder="Kategorie Name"
              className="formTitle"
              defaultValue={thisCat?.title}
            />
          </section>
          <section>
            <label>
              Hashtags <span> ( optional )</span>
            </label>
            <input
              type="input"
              className="formHash"
              placeholder="brands , artikles ,"
              defaultValue={thisCat?.hashtag}
            />
          </section>
          <section>
            <label>Bild</label>
            <input
              type="input"
              className="formUrl"
              placeholder="URL Https://"
              defaultValue={thisCat?.image}
            />
            oder
            <input
              type="file"
              className="formImg"
              onChange={uploadPic}
              accept="image/*"
            />
            <label>
              <span>bilder von PC haben priorität</span>
            </label>
          </section>
          <section className="singleCategoryBtns">
            {!Edit ? (
              <button onClick={addCat}>Hinzufügen</button>
            ) : (
              <>
                <button onClick={addCat}>Bearbeiten</button>
                {/* <button onClick={() => deletePm(" wird gelöscht", deleteCat)}> 
                  Löschen
                </button>*/}
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}