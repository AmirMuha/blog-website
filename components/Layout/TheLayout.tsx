import React, { FC, useContext } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Head from "next/head";
import TheHeader from "./TheHeader";
import { ctx } from "../../store/context/topics";

interface Props {
  title: string;
}
const TheLayout: FC<Props> = ({ title, children }) => {
  const { topics } = useContext(ctx);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box>
        <Container
          sx={{
            "& .MuiContainer-root": {
              px: 0,
            },
          }}
        >
          <TheHeader topics={topics} />
          {children}
          <Box color="">
            this is the footer
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default TheLayout;
