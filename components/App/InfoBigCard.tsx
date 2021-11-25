import {FC} from "react"
import Link from "next/link"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface Props {
  data: any
}

const InfoBigCard: FC<Props> = ({data}) => {
  return (
    <Card>
      <CardHeader
        titleTypographyProps={{
          sx: {
            textTransform: "capitalize",
            fontWeight: "900",
            fontSize: "20px",
            textAlign: "left",
          },
        }}
        subheaderTypographyProps={{
          sx: {
            textTransform: "capitalize",
            textAlign: "left",
          },
        }}
        subheader={new Date(data.publishedAt).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )}
        title={data.title}
      />
      <CardMedia
        component="img"
        image={data.urlToImage}
        alt={data.title}
        sx={{ height: "300px" }}
      />
      <CardContent>
        <Typography  textAlign="left" variant="body1">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={data.url} passHref>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            target="_blank"
            component="a"
          >
            Read
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default InfoBigCard