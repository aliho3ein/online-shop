import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import CallApi from "../instance/api";
/* Redux */
import {
  deleteCategory,
  selectCat,
  updateCategory,
  updateAllItems,
} from "../store/slice/portalSlice";
import { setAction, selectItem } from "../store/slice/portalSlice";
/* Component */
import SingleItem from "./singleItem";

export default function SingleCat(props: any) {
  const { title, user, date, key, image, hashtag } = props.value;
  const dispatcher = useAppDispatch();

  let allItems = useAppSelector(selectItem);

  let setAct = () => {
    dispatcher(setAction(key));
  };

  let getItems = allItems.map((el: any, index: number) =>
    el.category === key ? <SingleItem key={index} value={el} /> : null
  );

  /* Delete category */
  const deleteCat = () => {
    CallApi()
      .delete(`/category/${key}.json`)
      .then((res) => dispatcher(deleteCategory(key)));
    deleteCatItems();
  };
  /* Delete all Items from deleted Category */
  const deleteCatItems = () => {
    dispatcher(updateAllItems(key));
    /* CallApi()
      .put("/items.json", newItems)
      .then((res) => console.log("ok"));*/
  };

  /* Edit Category */
  let getCat = useAppSelector(selectCat).find((el: any) => el.key === key);
  const editCat = () => {
    console.log(getCat);
  };
  let upCat = () => {
    const newCat = {};
    CallApi()
      .put(`/category/${key}.json`, newCat)
      .then((res) => dispatcher(updateCategory({ newCat })));
  };

  return (
    <li onClick={setAct}>
      {title}
      <span onClick={deleteCat}> -- Delete -- </span>
      <span onClick={editCat}> Edit</span>
      <ul>{getItems}</ul>
    </li>
  );
}
