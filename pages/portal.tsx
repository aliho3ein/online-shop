import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
/* Api */
import CallApi from "../app/instance/api";
/* Upload Image */
import { storage } from "../app/instance/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
/* Component */
import SingleCat from "../app/component/singleCat";
/* Store */
import {
  addCategory,
  addItem,
  selectCat,
  selectAct,
  setCategory,
} from "../app/store/slice/portalSlice";

export default function Portal() {
  /* Dispatch */
  const dispatcher = useAppDispatch();

  useEffect(() => {
    /* Get All data from DataBase */
    CallApi()
      .get(".json")
      .then((res) => {
        let Cat = Object.entries(res.data.category).map(([key, value]: any) => {
          return { ...value, key };
        });
        let item = Object.entries(res.data.items).map(([key, value]: any) => {
          return { ...value, key };
        });

        dispatcher(setCategory({ Cat, item }));
      })
      .catch((err) => console.log("No Item To show"));
  }, []);

  /* Category Image */
  let [catImage, SetCatImage] = useState<string | null>(null);

  /* Select Category */
  const category = useAppSelector(selectCat);
  let GetCat = category.map((el: any, index: number) => (
    <SingleCat key={index} value={el} />
  ));

  /* Add Category */
  let addCat = () => {
    let title = document.getElementById("catTitle") as HTMLInputElement | null;

    let Category: any = {
      title: title?.value,
      hashtag: "",
      image: catImage,
      user: "admin",
      date: new Date().toDateString(),
    };
    CallApi()
      .post("/category.json", Category)
      .then((res: any) => {
        Category.key = res.data.name;
        dispatcher(addCategory(Category));
      });
  };

  /* Add Item */
  const getCatForItem = useAppSelector(selectAct);
  let setItem = () => {
    let title = document.getElementById("itemTitle") as HTMLInputElement | null;
    let item: any = {
      title: title?.value,
      brand: "",
      description: "",
      price: "",
      off: false,
      offPrice: "",
      rating: "",
      soldOut: false,
      image: "",
      category: getCatForItem,
      user: "admin",
      date: new Date().toDateString(),
    };
    CallApi()
      .post("/items.json", item)
      .then((res: any) => {
        item.key = res.data.name;
        dispatcher(addItem(item));
      });
  };

  /* Upload Category Image */
  let uploadPic = (e: any) => {
    const IMG = e.target.files[0];
    if (IMG == null) return;
    const imageRef = ref(storage, `category/${Date.now()}`);
    uploadBytes(imageRef, IMG).then((res) =>
      getDownloadURL(res.ref).then((url) => {
        SetCatImage(url);
        console.log(catImage);
      })
    );
  };

  return (
    <>
      <ul>
        <li onClick={addCat}>Create Category</li>
        <li onClick={setItem}>Create Item</li>
        <li>Create User</li>
        <li>Setting</li>
      </ul>
      <input type="file" accept="image/*" onChange={uploadPic} />
      <div>
        <input type="text" id="catTitle" placeholder="add some category" />

        <ul>{GetCat}</ul>

        <input type="text" id="itemTitle" placeholder="add some item" />
        <button onClick={setItem}>add Item</button>
      </div>
    </>
  );
}
