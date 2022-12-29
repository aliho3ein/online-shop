import Link from "next/link";
import style from "./../../../styles/component/_header.module.scss";
import activeNav from "../../actions/asideNavActions";

export default function MainHeader() {
  return (
    <header id={style.header}>
      <h1>
        <Link href="/portal">Verwaltungsbereich</Link>
      </h1>
    </header>
  );
}
