import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/tailwindcss.css";

import {ThemeProvider, createTheme, ThemeOptions} from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ff6f00",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#370909",
      paper: "#672626",
    },
    warning: {
      main: "#f34f00",
    },
  },
};
const theme = createTheme(themeOptions);

interface Props extends AppProps {
  news: any[];
}
function MyApp({ Component, pageProps, news }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
