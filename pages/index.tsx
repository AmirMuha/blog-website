import AlertIcon from "@mui/icons-material/Warning";
import TheHero from "../components/App/TheHero"
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import BlogInfoCard from "../components/App/BlogInfoCard";
import TheLayout from "../components/Layout/TheLayout";


interface Props {
  blogs: {
    statusText: string,
    data: any
  };
  error: {
    message: string;
  };
}

const Home: NextPage<Props> = ({ blogs, error }) => {
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (blogs || error) {
      setLoading(false);
    }
  }, [blogs, error]);

  const reloadHandler = () => {
    window.location.reload();
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
              {blogs.statusText === "OK" ? (
                <TheHero blogs={blogs.data.articles} />
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
            </Box>
          </Container>
        </TheLayout>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  let response;
  let error = null;
  try {
    response = await axios.get(
      "https://newsapi.org/v2/top-headlines?category=technology&country=us",
      {
        headers: {
          Authorization: process.env.BLOG_API_KEY!,
        },
      }
    );
  } catch (e: any) {
    error = e.message;
  }

  return {
    props: {
      blogs: {
        data: response?.statusText === "OK" && response.data,
        statusText: response?.statusText,
      },
      error: {
        message: error,
      },
    },
  };
};
