import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { FC, useContext } from "react";
import TheHeader from "./TheHeader";
import {ctx} from "../../store/context/topics"

interface Props {
}
const TheLayout: FC<Props> = ({ children }) => {
  const {topics} = useContext(ctx)
  return (
    <Box>
      <Container sx={{
        "& .MuiContainer-root": {
          px: 0
        }
      }}>
      <TheHeader topics={topics}/>
        { children}
      </Container>
    </Box>
  );
};
export default TheLayout;
