import { useRouter } from "next/router";
import CallApi from "./../instance/api";
import { useAppDispatch } from "../hooks";
import { deleteItem } from "../store/slice/portalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deletePm } from "../actions/alerts";

export default function SingleItem({ value }: any) {
  const router = useRouter();
  const dispatcher = useAppDispatch();
  const { image, brand, price, offPrice, off, soldOut, title, category, key } =
    value;

  const deItem = (e: any) => {
    CallApi()
      .delete(`/items/${key}.json`)
      .then((res) => dispatcher(deleteItem(key)));
  };

  return (
    <div
      className="preItem"
      onClick={() =>
        router.push(`/portal/itForm?cat=${value.category}&key=${value.key}`)
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
          deletePm("", deItem);
        }}
        icon={faTrash}
      />

      {soldOut && <div className="soldOutItem"></div>}

      <div
        className="preItemHead"
        style={{
          backgroundImage: `url(${value.image})`,
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
