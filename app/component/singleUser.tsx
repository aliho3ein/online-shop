import { useAppDispatch, useAppSelector } from "../hooks";
import CallApi from "../instance/api";
import { useRouter } from "next/router";
import { deletePm } from "../actions/alerts";
/* Redux */
import { deleteUser } from "../store/slice/loginSlice";

export default function SingleUser(props: any) {
  const { title, key, image } = props.value;
  const dispatcher = useAppDispatch();
  const router = useRouter();

  /* Delete category */
  const deleteCat = () => {
    CallApi()
      .delete(`/users/${key}.json`)
      .then((res) => dispatcher(deleteUser(key)));
  };

  /* Edit Category */
  const editCat = () => {
    router.push(`/security/userForm?id=${key}`);
  };

  return (
    <div className="catItem">
      <span>{title}</span>
      <button className="catEditBtn" onClick={editCat}>
        Bearbeiten
      </button>
      <button className="catDeleteBtn" onClick={() => deletePm("", deleteCat)}>
        Löschen
      </button>
    </div>
  );
}
