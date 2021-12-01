import React, { FC, createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const GLOBAL_THEME = "global-theme";
const topics = [
  "sports",
  "general",
  "entertainment",
  "technology",
  "science",
  "business",
  "health",
];
const isBrowser = typeof window !== "undefined";
const contextInitialState = {
  topics,
  toggleTheme: () => {},
  mode: isBrowser
    ? window.localStorage.getItem(GLOBAL_THEME)
    : ("light" as "light" | "dark"),
};
const context = createContext(contextInitialState);
const CtxProvider: FC = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  useEffect(() => {
    const globalTheme = isBrowser
      ? (window.localStorage.getItem(GLOBAL_THEME) as "light" | "dark")
      : null;
    setMode(globalTheme && (globalTheme as any) || "light");
    if(globalTheme === "dark") {
      isBrowser && (document.body.classList.add("dark"))
    }
  }, []);
  const theme = createTheme({
    palette: {
      mode,
    },
  });
  return (
    <context.Provider
      value={{
        ...contextInitialState,
        mode,
        toggleTheme: () => {
          if (isBrowser) {
            if (!document.body.classList.contains("dark")) {
              document.body.classList.add("dark");
              isBrowser && window.localStorage.setItem(GLOBAL_THEME, "dark");
              setMode("dark");
            } else {
              document.body.classList.remove("dark");
              isBrowser && window.localStorage.setItem(GLOBAL_THEME, "light");
              setMode("light");
            }
          }
        },
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </context.Provider>
  );
};
export default CtxProvider;
export const ctx = context;
