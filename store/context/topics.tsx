import React, { createContext, FC } from "react";
const topics = [
  "sports",
  "general",
  "entertainment",
  "technology",
  "science",
  "business",
  "health",
];

const context = createContext({ topics });
const CtxProvider: FC = ({children}) => {
  return (
    <context.Provider value={{topics}}>
      {children}
    </context.Provider>
  )
};
export default CtxProvider
export const ctx = context;
