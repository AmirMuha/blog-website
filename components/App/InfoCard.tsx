import Button from "@mui/material/Button";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";

interface Props {
  data: any;
}

const InfoCard: FC<Props> = ({ data }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={data.urlToImage}
        alt={data.title}
        sx={{ height: "100px" }}
      />
      <CardContent>
        <Typography sx={{
          textAlign: "left"
        }} variant="body2" fontWeight="700">
          {data.title}
        </Typography>
        <Typography
          variant="caption"
          component="p"
          sx={{ textAlign: "right" }}
          color="gray"
        >
          {new Date(data.publishedAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Typography>
        <CardActions>
          <Link href={data.url} passHref>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              target="_blank"
              component="a"
            >
              Read
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
