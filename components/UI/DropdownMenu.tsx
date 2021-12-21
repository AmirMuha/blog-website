import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider";
import DropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu"
import Button from "@mui/material/Button"
import { useRouter } from "next/router";

import React,{FC,useState} from "react"

interface Props {
  options: any[]
  title: string
  url: string
  dynamicPart: string
}
const DropdownMenu:FC<Props> = ({title,options,url,dynamicPart}) => {
  const { push: navigate } = useRouter();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const anchorClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const isMenuOpen = !!anchorEl;

  const navigationHandler = (option: string) => {
    const correctPath:string = url.replace(dynamicPart,option);
    console.log(correctPath)
    navigate(correctPath);
  };

  return (
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
        {title}
      </Button>
      <Menu
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={isMenuOpen}
        variant="menu"
        anchorEl={anchorEl}
      >
        {options.length > 0 &&
          options.map((option, i) => (
            <Box key={option}>
              {i !== 0 && <Divider />}
              <MenuItem onClick={() => navigationHandler(option)} title={option}>
                {option}
              </MenuItem>
            </Box>
          ))}
      </Menu>
    </Box>
  );
}

export default DropdownMenu
