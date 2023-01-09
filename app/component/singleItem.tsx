import { useRouter } from "next/router";
import CallApi from "./../instance/api";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteItem } from "../store/slice/portalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addPm, deletePm } from "../actions/alerts";
import { mnValid } from "../store/slice/loginSlice";

export default function SingleItem({ value }: any) {
  const router = useRouter();
  const dispatcher = useAppDispatch();
  const valid = useAppSelector(mnValid);
  const { image, brand, price, offPrice, off, soldOut, title, category, key } =
    value;

  const deItem = (e: any) => {
    CallApi()
      .delete(`/items/${key}.json`)
      .then((res) => dispatcher(deleteItem(key)));
  };

  const deIt = () => {
    valid ? deletePm("", deItem) : addPm("error", "Sie haben keine Erlaubnis");
  };

  return (
    <div
      className="preItem"
      onClick={() =>
        router.push(`/portal/itForm?cat=${category}&key=${value.key}`)
      }
    >
      <FontAwesomeIcon
        className="icon"
        title="Bearbeiten"
        icon={faPenToSquare}
      />
      <FontAwesomeIcon
        className="icon"
        title="Löschen"
        onClick={(e) => {
          e.stopPropagation();
          deIt();
        }}
        icon={faTrash}
      />

      {soldOut && <div className="soldOutItem"></div>}

      <div
        className="preItemHead"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="preItemBody">
        <h3>
          {brand}
          <span> {title}</span>
        </h3>
        {off ? (
          <>
            <span className="onSale">
              {offPrice}€<span>{price}€</span>
            </span>
          </>
        ) : (
          <span>{price}€</span>
        )}
      </div>
    </div>
  );
}
