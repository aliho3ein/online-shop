import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectToken } from "../../store/slice/loginSlice";
import Head from "next/head";
import FixedItems from "../fixedItems";
import Loading from "../loading";
import { getDataFromDB } from "../../actions/logInUser";
import LoginHome from "../logIn";

interface Props {
  children: ReactNode;
}

const UserPanelLayout = ({ children }: Props) => {
  const dispatcher = useAppDispatch();

  /* Loading */
  const [loading, setLoading] = useState(true);

  const token = useAppSelector(selectToken);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    token && getDataFromDB(dispatcher);
  }, [token]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png"
        />
      </Head>
      <main id="MAIN">
        {token ? (
          <>
            <FixedItems />
            <section id="bSide">
              {!loading ? children : <Loading></Loading>}
            </section>
          </>
        ) : (
          <LoginHome></LoginHome>
        )}
      </main>
    </>
  );
};

export default UserPanelLayout;
