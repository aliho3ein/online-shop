import "../styles/component/main.scss";
import type { AppProps } from "next/app";
import { store } from "./../app/store/index";
import { Provider } from "react-redux";
/* FontAwesome */
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
