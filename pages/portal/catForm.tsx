import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addPm, backToMainPm, deletePm } from "./../../app/actions/alerts";
import { catValidation, inValidInput } from "../../app/actions/validations";

/* Api */
import CallApi from "../../app/instance/api";
/* slice */
import {
  addCategory,
  selectCat,
  updateCategory,
} from "../../app/store/slice/portalSlice";
import { mnValid, selectUser } from "../../app/store/slice/loginSlice";
/* Upload Image */
import { storage } from "../../app/instance/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import UserPanelLayout from "../../app/component/fixedArea/main";

export default function CatForm() {
  let [catImage, SetCatImage] = useState<string | null>();
  let [changeInput, SetChangeInput] = useState<boolean | null>();

  useEffect(() => checkInputs(), []);
  /* Check if Input Change */
  let checkInputs = () => {
    const inputs: any = document.querySelectorAll("input");
    inputs.forEach((item: any) => {
      item.addEventListener("change", () => SetChangeInput(true));
    });
  };

  let router = useRouter();
  /* Dispatch */
  const dispatcher = useAppDispatch();

  /* Inputs */
  let thisCat: any;

  /* Edit Category */
  const Edit = router.query.id;
  const categorys = useAppSelector(selectCat);
  const user = useAppSelector(selectUser);
  const valid = useAppSelector(mnValid);

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
  let Category: any;
  const addCa = (valid: boolean, pm?: string, cls?: string) => {
    if (!valid) {
      addPm("error", pm);
      inValidInput(cls);
    } else {
      !Edit
        ? CallApi()
            .post("/category.json", Category)
            .then((res: any) => {
              Category.key = res.data.name;
              dispatcher(addCategory(Category));
              addPm("success", "Kategorie wurde gespeichert");
              router.push("/portal/categorys");
            })
            .catch((err) => console.log("error"))
        : CallApi()
            .put(`/category/${Edit}.json`, Category)
            .then((res: any) => {
              Category.key = Edit;
              dispatcher(updateCategory(Category));
              addPm("success", "Kategorie wurde bearbeitet");
              router.push("/portal/categorys");
            })
            .catch((err) => console.log("error"));
    }
  };
  let addCat = () => {
    const title = document.querySelector(
      ".formTitle"
    ) as HTMLInputElement | null;
    const hash = document.querySelector(".formHash") as HTMLInputElement | null;
    const url: any = document.querySelector(
      ".formUrl"
    ) as HTMLInputElement | null;

    Category = {
      title: title?.value,
      hashtag: hash?.value,
      image: catImage || url.value,
      user,
      date: new Date().toDateString(),
    };

    valid
      ? catValidation(addCa, Category)
      : addPm("error", "Sie haben keine Erlaubnis");
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

  /* Back To Main */
  const backToMain = () => {
    changeInput ? backToMainPm(pushToMain) : pushToMain();
  };
  const pushToMain = () => {
    router.push("/portal/categorys");
  };

  return (
    <div className="formCatItem">
      <span
        onClick={backToMain}
        className="backToCat"
        title="züruck zu Main"
      ></span>

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
          <button onClick={addCat}>Bearbeiten</button>
        )}
      </section>
    </div>
  );
}

CatForm.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
