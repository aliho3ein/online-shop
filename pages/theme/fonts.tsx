import { useState } from "react";
import CallApi from "../../app/instance/api";
import { addPm, changeTheme } from "../../app/actions/alerts";
import UserPanelLayout from "../../app/component/fixedArea/main";
import style from "../../styles/component/_themes.module.scss";
import { setBaseFont } from "../../app/actions/logInUser";
import { useAppSelector } from "../../app/hooks";
import { tmValid } from "../../app/store/slice/loginSlice";
import Head from "next/head";

export default function font() {
  const [theme, setTheme] = useState<any>([]);
  const valid = useAppSelector(tmValid);

  const getFont = () => {
    theme &&
      CallApi()
        .put("/theme/fonts.json", theme)
        .then((res) => setBaseFont(res.data));
  };

  /* Check User permission */
  const chFont = () => {
    valid ? changeTheme(getFont) : addPm("error", "Sie haben keine Erlaubnis");
  };

  return (
    <>
      <Head>
        <title>Schriftsart</title>
      </Head>
      <div className={style.themeBase}>
        <h1>Shriftarten</h1>

        <label htmlFor="Ubuntu">
          <div className={style.fontCard}>
            <input
              type="radio"
              id="Ubuntu"
              onChange={() => setTheme(["Ubuntu", "Courgette"])}
              name="font"
            />
            <h2
              style={{
                ["--fontPattern" as any]: "Ubuntu",
              }}
            >
              Ubuntu
            </h2>
          </div>
        </label>

        <label htmlFor="Raleway">
          <div className={style.fontCard}>
            <input
              type="radio"
              id="Raleway"
              onChange={() => setTheme(["Raleway", "Courgette"])}
              name="font"
            />
            <h2
              style={{
                ["--fontPattern" as any]: "Raleway",
              }}
            >
              Raleway
            </h2>
          </div>
        </label>

        <label htmlFor="Courgette">
          <div className={style.fontCard}>
            <input
              type="radio"
              id="Courgette"
              onChange={() => setTheme(["Courgette", "Courgette"])}
              name="font"
            />
            <h2
              style={{
                ["--fontPattern" as any]: "Courgette",
              }}
            >
              Courgette
            </h2>
          </div>
        </label>

        <label htmlFor="Lato">
          <div className={style.fontCard}>
            <input
              type="radio"
              id="Lato"
              onChange={() => setTheme(["Lato", "Courgette"])}
              name="font"
            />
            <h2
              style={{
                ["--fontPattern" as any]: "Lato",
              }}
            >
              Lato
            </h2>
          </div>
        </label>

        <div>
          <button onClick={chFont}>Speichern</button>
        </div>
      </div>
    </>
  );
}

font.getLayout = (page: any) => <UserPanelLayout>{page}</UserPanelLayout>;
