import style from "./../../../styles/component/_header.module.scss";

export default function MainHeader() {
  return (
    <header id={style.header} className="mainHeader">
      <h1>{/* <Link href="/portal">Verwaltungsbereich</Link> */}</h1>
    </header>
  );
}
