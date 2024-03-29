import { useAppDispatch, useAppSelector } from "../hooks";
import CallApi from "../instance/api";
import { useRouter } from "next/router";
import { addPm, deletePm } from "../actions/alerts";
/* Redux */
import { deleteUser, scValid } from "../store/slice/loginSlice";

export default function SingleUser(props: any) {
  const { title, key, image } = props.value;
  const dispatcher = useAppDispatch();
  const valid = useAppSelector(scValid);
  const router = useRouter();

  /* Delete category */
  const deleteCat = () => {
    CallApi()
      .delete(`/users/${key}.json`)
      .then((res) => dispatcher(deleteUser(key)));
  };

  /* Edit Category */
  const editCat = () => {
    valid
      ? router.push(`/security/userForm?id=${key}`)
      : addPm("error", "Sie haben keine Erlaubnis");
  };

  /* Check permission */
  const deValid = () => {
    valid
      ? deletePm("", deleteCat)
      : addPm("error", "Sie haben keine Erlaubnis");
  };

  return (
    <div className="catItem">
      <span>{title}</span>
      <button className="catEditBtn" onClick={editCat}>
        Bearbeiten
      </button>
      <button className="catDeleteBtn" onClick={deValid}>
        Löschen
      </button>
    </div>
  );
}
