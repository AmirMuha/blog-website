import "../styles/globals.css";
import "../styles/tailwindcss.css";
import type { AppProps } from "next/app";
import CtxProvider from "../store/context/topics"


interface Props extends AppProps {
  news: any[];
}
function MyApp({ Component, pageProps, news }: Props) {
  return (
    <CtxProvider>
      <Component {...pageProps} />
    </CtxProvider>
  );
}

export default MyApp;
