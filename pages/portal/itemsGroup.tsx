import style from "./../../styles/component/_bsideItem.module.scss";
import FixedItems from "../../app/component/fixedItems";
import SingleItemsGroup from "../../app/component/singleItemsGroup";
import { useAppSelector } from "../../app/hooks";
import { selectCat } from "../../app/store/slice/portalSlice";

export default function ItemGroups() {
  /* Get groups */
  let indexId = 0;
  const group = useAppSelector(selectCat).map((cat, index) => {
    indexId++;
    return <SingleItemsGroup key={index} value={cat} indexId={indexId} />;
  });

  return (
    <main>
      <FixedItems />
      <section id="bSide">
        <div className="baseItems">
          {group}
          <div className={style.freePlace}></div>
        </div>
      </section>
    </main>
  );
}
