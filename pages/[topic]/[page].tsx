import { GetServerSideProps, NextPage } from "next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TheLayout from "../../components/Layout/TheLayout";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const isBrowser = typeof window !== "undefined";
interface Props {
  data: any;
}

const Technology: NextPage<Props> = ({ data }) => {
  const { push: navigate, query } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(
    +query?.page! || +(isBrowser && window.location.pathname.split("/")[2])
  );

  const changePageHandler = (_: React.ChangeEvent<any>, val: number) => {
    setCurrentPage(val);
    navigate(`/${query.topic}/${val}`);
  };
  return (
    <TheLayout>
      {data.articles.map((a: any) => (
        <Card key={a.title} sx={{ my: 2 }}>
          <Box
            sx={{
              display: {
                sm: "flex",
              },
            }}
          >
            <CardMedia
              sx={{
                width: {
                  xs: "100%",
                  sm: "200px",
                },
                height: {
                  xs: "200px",
                  sm: "auto",
                },
              }}
              component="img"
              image={a.urlToImage}
              alt={a.title}
            />
            <Stack sx={{flexGrow: 1}}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" fontWeight="900">
                    {a.title}
                  </Typography>
                  <Typography variant="caption" color="gray">
                    {new Date(a.publishedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Stack>
              </CardContent>
              <Divider />
              <CardContent>
                <Typography variant="body2">
                  {a.description || "No description available."}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Stack
                  width="100%"
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    {a.source.name && (
                      <>
                        <Typography variant="caption" fontWeight="900">
                          Source :{" "}
                        </Typography>
                        <Typography variant="caption" color="gray">
                          {a.source.name}
                        </Typography>
                      </>
                    )}
                  </Box>
                  <Link href={a.url} passHref>
                    <Button target="_blank" component="a">
                      Read More
                    </Button>
                  </Link>
                </Stack>
              </CardActions>
            </Stack>
          </Box>
        </Card>
      ))}

      <Box sx={{ my: 4 }}>
        <Pagination
          defaultPage={currentPage}
          sx={{ ".MuiPagination-ul": { justifyContent: "center" } }}
          page={currentPage}
          shape="rounded"
          count={Math.floor(data.totalResults / 10)}
          onChange={changePageHandler}
        />
      </Box>
    </TheLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let response: any = null;
  let error: any = {};
  try {
    response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${params?.topic}&pageSize=10&page=${params?.page}&country=us`,
      {
        headers: {
          Authorization: process.env.NEWS_API_KEY!,
        },
      }
    );
  } catch (e:any) {
    error.message = e.message;
  }
  return {
    props: {
      data: response.data && response?.data,
      error: {
        message: (error?.message && error?.message) || null,
      },
    },
  };
};

export default Technology;
