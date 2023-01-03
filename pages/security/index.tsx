import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllUser, setUsers } from "../../app/store/slice/loginSlice";
import CallApi from "../../app/instance/api";
/** Component */
import FixedItems from "../../app/component/fixedItems";
import SingleUser from "../../app/component/singleUser";
import { useEffect } from "react";

export default function users() {
  const dispatcher = useAppDispatch();
  useEffect(() => {
    /* Get All Users from DataBase */
    CallApi()
      .get(".json")
      .then((res) => {
        let user = Object.entries(res.data.users).map(([key, value]: any) => {
          return { ...value, key };
        });
        dispatcher(setUsers(user));
      })
      .catch((err) => console.log("No Item To show"));
  }, []);

  const users = useAppSelector(selectAllUser);

  let getUser = users.map((el: any, index: number) => (
    <SingleUser key={index} value={el} />
  ));

  return (
    <main>
      <FixedItems />
      <section id="bSide">
        <div className="baseCatItems">
          <Link href="/security/userForm" className="catAddBtn">
            Hinzufügen
          </Link>
          {getUser}
          <div className="freePlace"></div>
        </div>
      </section>
    </main>
  );
}
