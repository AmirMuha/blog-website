import Grid from "@mui/material/Grid";
import InfoBigCard from "./InfoBigCard";
import Link from "next/link";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React, { FC, PropsWithChildren } from "react";
import InfoCard from "./InfoCard";

interface Props {
  news: any[];
}

const TheHero: FC<PropsWithChildren<Props>> = ({ news }) => {
  console.log(news);
  return (
    <>
      {news.map((n, i) => (
        <Box key={n.topic}>
          <Divider sx={{ py: 4 }}>
            <Typography
              sx={{ textTransform: "capitalize" }}
              fontWeight="900"
              variant="h3"
            >
              {n.topic}
            </Typography>
          </Divider>
          <Grid key={i} container spacing={2}>
            <Grid item xs={12} md={8} lg={6}>
              <InfoBigCard data={n.data.articles[0]} />
            </Grid>
            <Grid
              container
              sx={{
                maxHeight: {
                  md: 600,
                },
                overflowY: { md: "scroll" },
              }}
              spacing={2}
              item
              xs={12}
              md={4}
              lg={6}
            >
              {n.data.articles.map((a: any, j: number) => {
                if (j !== 0) {
                  return (
                    <Grid key={a.title} item xs={12} sm={6} md={12} lg={6}>
                      <InfoCard data={a} />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
};

export default TheHero;
