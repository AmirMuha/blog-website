import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { FC, useState } from "react";

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    marginRight: 10,
    borderRadius: 5,
    padding: "4px 10px",
    fontSize: "1.2rem",
    boxShadow: theme.shadows[1],
    "&:hover": {
      backgroundColor: alpha(theme.palette.grey[500], 0.4),
    },
    "&:focus": {
      backgroundColor: alpha(theme.palette.grey[500], 0.4),
      boxShadow: theme.shadows[2],
    },
  },
}));
const ButtonWithIcon = styled(IconButton)(({ theme }) => ({
  marginRight: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

interface Props {}
const TheHeader: FC<Props> = ({}) => {
  const [searchText, setSearchText] = useState<string>("");

  const searchHandler =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for %s ...", searchText);
    setSearchText("");
  };

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
          color="transparent"
          position="sticky"
        >
          <Toolbar>
            <ButtonWithIcon size="medium" color="inherit">
              <MenuIcon />
            </ButtonWithIcon>
            <Typography variant="h6">Blogs</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box onSubmit={searchHandler} component="form" sx={{ display: "flex", alignItems: "center", rowGap: 1, mt: 2 }}>
        <Box sx={{ width: 1, position: "relative" }}>
          <SearchInput placeholder="Search ..." />
          <Box
            position="absolute"
            sx={{
              top: 1 / 2,
              bottom: 1 / 2,
              right: 15,
              pt:.7
            }}
          >
            <SearchIcon color="disabled" />
          </Box>
        </Box>
        <Button type="submit" variant="contained" color="info">
          Search
        </Button>
      </Box>
    </>
  );
};
export default TheHeader;
