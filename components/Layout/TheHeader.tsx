import React, { FC, useContext, useRef, useState } from "react";
import { alpha, styled, useTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import DropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconButton from "@mui/material/IconButton";
import Img from "../UI/Img";
import InputBase from "@mui/material/InputBase";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ctx } from "../../store/context/topics";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...(props as any)} />;
});

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

interface Props {
  topics: string[];
}

const isBrowser = typeof window !== "undefined";
const TheHeader: FC<Props> = ({ topics }) => {
  const { toggleTheme } = useContext(ctx);
  const {
    palette: { mode: ThemeMode },
  } = useTheme();
  const [isResultBoxOpen, setIsResultBoxOpen] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const { push: navigate } = useRouter();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const isMenuOpen = !!anchorEl;
  const anchorClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchText);
    isBrowser &&
      fetch(`/api/search?q=${searchText}`)
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData.data);
          setSearchResult(resData.data);
          setIsResultBoxOpen(true);
        })
        .catch((e) => {
          // setAlert({})
        });
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
                            ...((isBrowser &&
                            window.location.pathname === `/${topic}/1`
                              ? { color: "orange", textDecoration: "underline" }
                              : {}) as any),
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
        <Box ref={searchBoxRef as any} sx={{ width: 1, position: "relative" }}>
          <SearchInput
            value={searchText}
            onChange={(v) => setSearchText(v.currentTarget.value)}
            placeholder="Search for specific keyword, topic, and etc..."
          />
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
        <Button
          onClick={toggleTheme}
          sx={{
            marginLeft: 1,
            backgroundColor: ThemeMode === "dark" ? "#fff" : "#222",
            "&:hover": {
              backgroundColor: ThemeMode === "dark" ? "#999" : "#111",
            },
          }}
          variant="contained"
        >
          {ThemeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </Button>
      </Box>

      <Dialog
        open={isResultBoxOpen}
        maxWidth="md"
        keepMounted
        fullWidth
        TransitionComponent={Transition as any}
        onClose={() => {
          setIsResultBoxOpen(false);
          setSearchResult(null);
        }}
      >
        <DialogTitle>
          <Box
            onSubmit={searchHandler}
            component="form"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <IconButton
              onClick={() => {
                setIsResultBoxOpen(false);
                setSearchResult(null);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box ref={searchBoxRef as any} sx={{ width: 1, display: "flex" }}>
              <Box sx={{ flexGrow: 1, position: "relative" }}>
                <SearchInput
                  value={searchText}
                  onChange={(v) => setSearchText(v.currentTarget.value)}
                  placeholder="Search for specific keyword, topic, and etc..."
                />
                <Box
                  position="absolute"
                  component="span"
                  sx={{
                    top: 1 / 2,
                    bottom: 1 / 2,
                    right: 15,
                  }}
                >
                  <SearchIcon color="disabled" />
                </Box>
              </Box>
              <Button type="submit" variant="contained" color="info">
                Search
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {searchResult?.articles!.length > 0 ? (
            <List>
              {searchResult?.articles!.map((sr: any) => (
                <ListItem key={sr.title}>
                  <Link passHref href={sr.url}>
                    <Button
                      component="a"
                      target="_blank"
                      sx={{ justifyContent: "start", width: "100%" }}
                    >
                      <Stack alignItems="center" spacing={2} direction="row">
                        <Img src={sr.urlToImage} alt={sr.title} />
                        <Box
                          component="span"
                          sx={{
                            textOverflow: "ellipsis",
                          }}
                        >
                          {sr.title}
                        </Box>
                      </Stack>
                    </Button>
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box>
              <Typography variant="h6">No result found !</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default TheHeader;
