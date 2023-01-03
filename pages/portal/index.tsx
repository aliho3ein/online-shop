import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
/** Component */
import FixedItems from "../../app/component/fixedItems";
/* Api */
import CallApi from "../../app/instance/api";
/* store */
import { setCategory } from "../../app/store/slice/portalSlice";
import { selectToken } from "../../app/store/slice/loginSlice";

export default function HomePortal() {
  const dispatcher = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    /* Get All data from DataBase */

    token &&
      CallApi()
        .get(".json")
        .then((res) => {
          let Cat = Object.entries(res.data.category).map(
            ([key, value]: any) => {
              return { ...value, key };
            }
          );
          let item = Object.entries(res.data.items).map(([key, value]: any) => {
            return { ...value, key };
          });
          console.log("ok");
          dispatcher(setCategory({ Cat, item }));
        })
        .catch((err) => console.log("No Item To show"));
  }, []);

  return (
    <main>
      <FixedItems />
      <section id="bSide"></section>
    </main>
  );
}
