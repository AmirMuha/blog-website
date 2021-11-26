import type { GetServerSideProps, NextPage } from "next";
import axios from "axios"
import { useEffect, useState } from "react";

import Alert from "@mui/material/Alert";
import AlertIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import NewsCategories from "../components/App/NewsCategories";
import TheLayout from "../components/Layout/TheLayout"

interface Props {
  news: {
    data: any[];
  };
  error: {
    message: string;
  };
}
const isBrowser = typeof window !== "undefined"
const Home: NextPage<Props> = ({ news, error }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (news || error) {
      setLoading(false);
    }
  }, [news, error]);

  const reloadHandler = () => {
    isBrowser && window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <TheLayout>
          <Container
            sx={{
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Box sx={{ mt: 2, p: 2 }}>
              {error.message && error?.message?.includes("429") ? (
                <Alert icon={<AlertIcon />} color="error">
                  Sorry you have to try later 100 request per day is over. Try
                  again tomorrow.
                </Alert>
              ) : (
                <>
                  {!error.message && news.data.length > 0 ? (
                    <NewsCategories news={news.data} />
                  ) : (
                    <Alert
                      icon={<AlertIcon />}
                      color="error"
                      action={
                        <Button
                          color="error"
                          size="small"
                          variant="contained"
                          onClick={reloadHandler}
                        >
                          Reload
                        </Button>
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexGrow: 1,
                          justifyContent: "space-between",
                        }}
                        component="div"
                      >
                        <Box component="span">
                          {error.message + ", please try reloading the page." ||
                            "Couldn't fetch the blogs, please reload the page."}
                        </Box>
                      </Box>
                    </Alert>
                  )}
                </>
              )}
            </Box>
          </Container>
        </TheLayout>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let response = null
  let error = null
  try {
  response = await axios.get("http://localhost:3000/api/categories/");
  }catch(e: any) {
    error = e.message
  }
  return {
    props: {
      news: {
        data: response ? response.data.data : null,
      },
      error: {
        message: error,
      },
    },
  };
};
