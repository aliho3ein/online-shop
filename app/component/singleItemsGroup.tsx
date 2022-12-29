import { openGroup } from "../actions/basicActions";
import { useAppSelector } from "../hooks";
import { selectItem } from "../store/slice/portalSlice";
import { useRouter } from "next/router";
/* component */
import SingleItem from "./singleItem";

export default function SingleItemsGroup({ indexId, value }: any) {
  const router = useRouter();
  /* Get Items */
  const items = useAppSelector(selectItem).filter(
    (item: any) => item.category === value.key
  );
  const thisItem = items.map((item: any, index) => {
    return <SingleItem key={index} value={item} />;
  });

  /* Open Form Page */
  const openForm = (e: any) => {
    e.stopPropagation();
    router.push(`/portal/itForm?cat=${value.key}`);
  };

  return (
    <div className="itemsGroup">
      <div className="itemsGroupHead" onClick={() => openGroup(indexId)}>
        <span
          className="addNewItem"
          title={`Neue ${value.title} Hinzufügen`}
          onClick={openForm}
        ></span>
        <h2>{value.title}</h2>
        <span className={`openCat ar${indexId}`}></span>
      </div>
      <div className={`itemsGroupBody bd${indexId}`}>{thisItem}</div>
    </div>
  );
}
