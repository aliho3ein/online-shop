import Link from "next/link";
import { useAppSelector } from "../../app/hooks";
import { selectCat } from "../../app/store/slice/portalSlice";
/** Component */
import UserPanelLayout from "../../app/component/fixedArea/main";
import SingleCategory from "../../app/component/singleCat";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";

const Home: NextPageWithLayout = () => {
  const category = useAppSelector(selectCat);

  let GetCat = category.map((el: any, index: number) => (
    <SingleCategory key={index} value={el} />
  ));

  return (
    <>
      <Head>
        <title>Kategorien</title>
      </Head>
      <div className="baseCatItems">
        <Link href="./catForm" className="catAddBtn">
          Hinzufügen
        </Link>
        {GetCat}
        <div className="freePlace"></div>
      </div>
    </>
  );
};

Home.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;

export default Home;
