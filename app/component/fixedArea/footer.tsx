import style from "./../../../styles/component/_footer.module.scss";

export default function MainFooter() {
  return (
    <footer id={style.footer}>
      <a
        href="https://my-blog-de.netlify.app/"
        target="_blank"
        title="visit my-blog"
      >
        Powered by aliho3ein
      </a>
    </footer>
  );
}
