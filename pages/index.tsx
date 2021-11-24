import AlertIcon from "@mui/icons-material/Warning";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import TheHero from "../components/App/TheHero";
import TheLayout from "../components/Layout/TheLayout";
import getSomeOfEachCategory from "./api/getSomeOfEachCategory";

interface Props {
  news: {
    data: any[];
  };
  error: {
    message: string;
  };
}

const Home: NextPage<Props> = ({ news, error }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (news || error) {
      setLoading(false);
    }
  }, [news, error]);

  const reloadHandler = () => {
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <TheLayout topics={news.data.map((n) => n.topic)}>
          <Container
            sx={{
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Box sx={{ mt: 2, p: 2 }}>
              {error && error.message.includes("429") ? (
                <Alert icon={<AlertIcon />} color="error">
                  Sorry you have to try later 100 request per day is over. Try
                  again tomorrow.
                </Alert>
              ) : (
                <>
                  {!error && news.data.length > 0 ? (
                    <TheHero news={news.data} />
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
  const { data: responses, error } = await getSomeOfEachCategory();
  return {
    props: {
      news: {
        data: responses,
      },
      error: {
        message: error,
      },
    },
  };
};
