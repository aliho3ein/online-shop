import style from "./../../styles/component/_bsideItem.module.scss";
import SingleItemsGroup from "../../app/component/singleItemsGroup";
import { useAppSelector } from "../../app/hooks";
import { selectCat } from "../../app/store/slice/portalSlice";
import UserPanelLayout from "../../app/component/fixedArea/main";

export default function ItemGroups() {
  const Items = useAppSelector(selectCat);

  /* Get groups */
  let indexId = 0;
  const group = Items.map((cat, index) => {
    indexId++;
    return <SingleItemsGroup key={index} value={cat} indexId={indexId} />;
  });

  return (
    <div className="baseItems">
      {group}
      <div className={style.freePlace}></div>
    </div>
  );
}

ItemGroups.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
