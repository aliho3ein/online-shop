import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logInUser, selectToken } from "../../store/slice/loginSlice";
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
    getDataFromDB(dispatcher);
  }, []);

  return (
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
  );
};

export default UserPanelLayout;
