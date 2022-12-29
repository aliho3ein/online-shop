import { useAppDispatch, useAppSelector } from "../hooks";
import CallApi from "../instance/api";
import { useRouter } from "next/router";
import { deletePm } from "../actions/alerts";
/* Redux */
import { deleteCategory } from "../store/slice/portalSlice";

export default function SingleCategory(props: any) {
  const { title, key, image } = props.value;
  const dispatcher = useAppDispatch();
  const router = useRouter();

  /* Delete category */
  const deleteCat = () => {
    CallApi()
      .delete(`/category/${key}.json`)
      .then((res) => dispatcher(deleteCategory(key)));
  };

  /* Edit Category */
  const editCat = () => {
    router.push(`/portal/catForm?id=${key}`);
  };

  return (
    <div className="catItem">
      <span>{title}</span>
      <button className="catEditBtn" onClick={editCat}>
        Bearbeiten
      </button>
      <button
        className="catDeleteBtn"
        onClick={() =>
          deletePm(
            "Wenn Sie diese Kategorie löschen, werden alle Ihre Produkte in dieser Kategorie gelöscht",
            deleteCat
          )
        }
      >
        Löschen
      </button>
    </div>
  );
}
