import React, {FC} from "react"
import Link from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

interface Props { 
  options: any[]
  url: string
  dynamicPart: string
}
const isBrowser = typeof window !== "undefined";

const HorizontalMenu: FC<Props> = ({options, url,dynamicPart}) => {
  return (
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
          {options.length > 0 &&
            options.map((option) => (
              <ListItem key={option}>
                <Link passHref href={url.replace(dynamicPart, option)}>
                  <Box
                    component="a"
                    sx={{
                      textTransform: "capitalize",
                      ...((isBrowser &&
                      window.location.pathname === url.replace(dynamicPart, option)
                        ? {
                            color: "orange",
                            textDecoration: "underline",
                            textTransform: "capitalize",
                          }
                        : {}) as any),
                    }}
                  >
                    {option}
                  </Box>
                </Link>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
}
export default HorizontalMenu
