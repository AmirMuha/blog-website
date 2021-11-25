import DropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";

const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    marginRight: 10,
    borderRadius: 5,
    padding: "4px 10px",
    paddingRight: "40px",
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

interface Props {
  topics: string[];
}
const isBrowser = typeof window !== "undefined"
const TheHeader: FC<Props> = ({ topics }) => {
  const { push: navigate } = useRouter();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const isMenuOpen = !!anchorEl;
  const anchorClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for %s ...", searchText);
    setSearchText("");
  };

  const navigationHandler = (topic: string) => {
    navigate(`/${topic}/1`);
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
            <Link href="/" passHref>
              <a className="t-text-xl t-text-red-700">
                News-
                <span className="t-text-blue-700 t-tracking-widest">ify</span>
              </a>
            </Link>
          </Toolbar>
          <Box>
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "initial",
                },
              }}
            >
              <List
                sx={{
                  display: "flex",
                  alignItems: "center",
                  rowGap: 2,
                }}
              >
                {topics.length > 0 &&
                  topics.map((topic) => (
                    <ListItem key={topic}>
                      <Link passHref href={`/${topic}/1`}>
                        <Box
                          component="a"
                          sx={{
                            textTransform: "capitalize",
                            ...(isBrowser && window.location.pathname===(`/${topic}/1`)
                              ? { color: "orange",textDecoration: "underline" }
                              : {}) as any,
                          }}
                        >
                          {topic}
                        </Box>
                      </Link>
                    </ListItem>
                  ))}
              </List>
            </Box>
            <Box
              sx={{
                display: {
                  md: "none",
                },
              }}
            >
              <Button
                sx={{ textTransform: "capitalize" }}
                endIcon={<DropDownIcon />}
                onClick={anchorClickHandler}
              >
                Topics
              </Button>
              <Menu
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={isMenuOpen}
                variant="menu"
                anchorEl={anchorEl}
              >
                {topics.length > 0 &&
                  topics.map((topic, i) => (
                    <Box key={topic}>
                      {i !== 0 && <Divider />}
                      <MenuItem
                        onClick={() => navigationHandler(topic)}
                        title={topic}
                      >
                        {topic}
                      </MenuItem>
                    </Box>
                  ))}
              </Menu>
            </Box>
          </Box>
        </AppBar>
      </Box>
      <Box
        onSubmit={searchHandler}
        component="form"
        sx={{ display: "flex", alignItems: "center", rowGap: 1, mt: 2 }}
      >
        <Box sx={{ width: 1, position: "relative" }}>
          <SearchInput placeholder="Search for specific keyword, topic, and etc..." />
          <Box
            position="absolute"
            sx={{
              top: 1 / 2,
              bottom: 1 / 2,
              right: 15,
              pt: 0.7,
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
