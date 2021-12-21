import React, { FC } from "react";
import HorizontalMenu from "../UI/HorizontalMenu"
import DropdownMenu from "../UI/DropdownMenu"
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import TheSearchBox from "../App/TheSearchBox";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";

interface Props {
  topics: string[];
}

const TheHeader: FC<Props> = ({ topics }) => {
  return (
    <>
      <Box
        sx={{
          mt: 2,
        }}
      >
        <AppBar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 1,
            px: 2,
            "& .MuiToolbar-root": {
              px: 0,
            },
          }}
          color="inherit"
          position="sticky"
        >
          <Toolbar>
            <Link href="/" passHref>
              <a className="t-text-xl t-text-red-700">
                News-
                <span className="t-text-blue-700 t-tracking-widest">ify</span>
              </a>
            </Link>
          </Toolbar>
          <HorizontalMenu url="/topic/1" dynamicPart="topic" options={topics}/>
          <DropdownMenu title="Topics" options={topics} dynamicPart="topic" url="/topic/1" />
        </AppBar>
      </Box>
      
      <TheSearchBox />
    </>
  );
};
export default TheHeader;
