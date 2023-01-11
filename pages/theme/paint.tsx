import { useState } from "react";
import CallApi from "../../app/instance/api";
import { addPm, changeTheme } from "../../app/actions/alerts";
import UserPanelLayout from "../../app/component/fixedArea/main";
import style from "../../styles/component/_themes.module.scss";
import { setBaseTheme } from "../../app/actions/logInUser";
import { useAppSelector } from "../../app/hooks";
import { tmValid } from "../../app/store/slice/loginSlice";
import Head from "next/head";

export default function paint() {
  const [theme, setTheme] = useState<any>([]);
  const valid = useAppSelector(tmValid);

  const getColor = () => {
    theme &&
      CallApi()
        .put("/theme/colors.json", theme)
        .then((res) => setBaseTheme(res.data));
  };

  /* Check User permission */
  const chTheme = () => {
    valid ? changeTheme(getColor) : addPm("error", "Sie haben keine Erlaubnis");
  };

  return (
    <>
      <Head>
        <title>Farben</title>
      </Head>
      <div className={style.themeBase}>
        <h1>Farben</h1>

        <label htmlFor="blue-red">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="blue-red"
              onChange={() => setTheme(["273c75", "e17055"])}
              name="theme"
            />
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#273c75",
                ["--secondC" as any]: "#e17055",
              }}
            ></div>
          </div>
        </label>

        <label htmlFor="green-beige">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="green-beige"
              onChange={() => setTheme(["006266", "e58e26"])}
              name="theme"
            />{" "}
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#006266",
                ["--secondC" as any]: "#e58e26",
              }}
            ></div>
          </div>
        </label>

        <label htmlFor="black-white">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="black-white"
              onChange={() => setTheme(["2f3640", "f5f6fa"])}
              name="theme"
            />{" "}
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#2f3640",
                ["--secondC" as any]: "#f5f6fa",
              }}
            ></div>
          </div>
        </label>

        <label htmlFor="pink-purple">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="pink-purple"
              onChange={() => setTheme(["f8a5c2", "574b90"])}
              name="theme"
            />{" "}
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#f8a5c2",
                ["--secondC" as any]: "#574b90",
              }}
            ></div>
          </div>
        </label>

        <label htmlFor="black-red">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="black-red"
              onChange={() => setTheme(["2f3542", "ff5252"])}
              name="theme"
            />
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#2f3542",
                ["--secondC" as any]: "#ff5252",
              }}
            ></div>
          </div>
        </label>

        <label htmlFor="blue-orange">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="blue-orange"
              onChange={() => setTheme(["051937", "34ace0"])}
              name="theme"
            />{" "}
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#051937",
                ["--secondC" as any]: "#34ace0",
              }}
            ></div>
          </div>
        </label>

        <label htmlFor="black-yellow">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="black-yellow"
              onChange={() => setTheme(["485460", "f6b93b"])}
              name="theme"
            />{" "}
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#485460",
                ["--secondC" as any]: "#f6b93b",
              }}
            ></div>
          </div>
        </label>

        <label htmlFor="lime-blue">
          <div className={style.pntCard}>
            <input
              type="radio"
              id="lime-blue"
              onChange={() => setTheme(["ccae62", "218c74"])}
              name="theme"
            />{" "}
            <div
              className={style.colorPlate}
              style={{
                ["--primeC" as any]: "#ccae62",
                ["--secondC" as any]: "#218c74",
              }}
            ></div>
          </div>
        </label>

        <div>
          <button onClick={chTheme}>Speichern</button>
        </div>
      </div>
    </>
  );
}

paint.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
