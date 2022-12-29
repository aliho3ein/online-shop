import Link from "next/link";
import { useAppSelector } from "../../app/hooks";
import { selectCat } from "../../app/store/slice/portalSlice";

/** Component */
import FixedItems from "../../app/component/fixedItems";
import SingleCategory from "../../app/component/singleCat";

export default function Home() {
  const category = useAppSelector(selectCat);
  let GetCat = category.map((el: any, index: number) => (
    <SingleCategory key={index} value={el} />
  ));

  return (
    <main>
      <FixedItems />
      <section id="bSide">
        <div className="baseCatItems">
          <Link href="./catForm" className="catAddBtn">
            Hinzufügen
          </Link>
          {GetCat}
          <div className="freePlace"></div>
        </div>
      </section>
    </main>
  );
}
