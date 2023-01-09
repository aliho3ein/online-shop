import "../styles/component/main.scss";
import type { AppProps } from "next/app";
import { store } from "./../app/store/index";
import { Provider } from "react-redux";
/* FontAwesome */
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
/* Layout */
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
/** Cookie */
import { CookiesProvider } from "react-cookie";

config.autoAddCss = false;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CookiesProvider>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </CookiesProvider>
  );
}
