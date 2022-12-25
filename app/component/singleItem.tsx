import { useAppDispatch, useAppSelector } from "../hooks";
import CallApi from "../instance/api";
import { deleteItem, selectItem, updateItem } from "../store/slice/portalSlice";

export default function SingleItem(props: any) {
  const { title, date, user, description, image, key } = props?.value;
  const dispatcher = useAppDispatch();

  /* Delete Item */
  let deleteIt = () => {
    CallApi()
      .delete(`/items/${key}.json`)
      .then((res) => dispatcher(deleteItem(key)));
  };

  /* Edit Item */
  let getItem = useAppSelector(selectItem).find((el: any) => el.key === key);
  let editIt = () => {
    console.log(getItem);
  };
  let upIt = () => {
    const newIt = {};
    CallApi()
      .put(`/items/${key}.json`, newIt)
      .then((res) => dispatcher(updateItem({ newIt })));
  };

  return (
    <li>
      {title}
      <span onClick={deleteIt}> -- Delete -- </span>
      <span onClick={editIt}> Edit</span>
    </li>
  );
}
