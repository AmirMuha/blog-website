import React, {FC, useState, useContext, useRef} from "react"
import Loading from "../UI/Loading"
import Box from "@mui/material/Box"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputBase from "@mui/material/InputBase";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Slide from "@mui/material/Slide";
import { ctx } from "../../store/context/topics";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Img from "../UI/Img";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SearchIcon from "@mui/icons-material/Search";

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
}

const isBrowser = typeof window !== "undefined";

const TheSearchBox: FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toggleTheme } = useContext(ctx);
  const {
    palette: { mode: ThemeMode },
  } = useTheme();
  const [isResultBoxOpen, setIsResultBoxOpen] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    isBrowser &&
      fetch(`/api/search?q=${searchText}`)
        .then((res) => res.json())
        .then((resData) => {
          setSearchResult(resData.data);
          setIsResultBoxOpen(true);
          setIsLoading(false);
        })
        .catch((e) => {
          // setAlert({})
          setIsLoading(false);
        });
    setSearchText("");
  };

  return (
    <>
      <Loading open={isLoading} />
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
        <Loading open={isLoading} />
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
}

export default TheSearchBox;
