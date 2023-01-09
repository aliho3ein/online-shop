import Link from "next/link";
import { useAppSelector } from "../../app/hooks";
import { selectCat } from "../../app/store/slice/portalSlice";
/** Component */
import UserPanelLayout from "../../app/component/fixedArea/main";
import SingleCategory from "../../app/component/singleCat";
import { NextPageWithLayout } from "../_app";

const Home: NextPageWithLayout = () => {
  const category = useAppSelector(selectCat);

  let GetCat = category.map((el: any, index: number) => (
    <SingleCategory key={index} value={el} />
  ));

  return (
    <div className="baseCatItems">
      <Link href="./catForm" className="catAddBtn">
        Hinzufügen
      </Link>
      {GetCat}
      <div className="freePlace"></div>
    </div>
  );
};

Home.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;

export default Home;
