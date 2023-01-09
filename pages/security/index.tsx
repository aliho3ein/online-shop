import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllUser } from "../../app/store/slice/loginSlice";
/** Component */
import SingleUser from "../../app/component/singleUser";
import { useEffect } from "react";
import UserPanelLayout from "../../app/component/fixedArea/main";
import { getUsersFromDB } from "../../app/actions/logInUser";

export default function users() {
  const dispatcher = useAppDispatch();

  useEffect(() => {
    /* Get All Users from DataBase */
    getUsersFromDB(dispatcher);
  }, []);

  const users = useAppSelector(selectAllUser);

  let getUser = users.map((el: any, index: number) => (
    <SingleUser key={index} value={el} />
  ));

  return (
    <div className="baseCatItems">
      <Link href="/security/userForm" className="catAddBtn">
        Hinzufügen
      </Link>
      {getUser}
      <div className="freePlace"></div>
    </div>
  );
}

users.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
