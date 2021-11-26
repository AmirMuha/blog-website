import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
export type CategoryTopics =
  | "technology"
  | "science"
  | "sports"
  | "entertainment"
  | "business"
  | "general"
  | "health";
type ResponsesType = { response: AxiosResponse<any>; topic: CategoryTopics }[];

const fetchedData = async (
  topic: CategoryTopics
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(
    `https://newsapi.org/v2/top-headlines?category=${topic}&pageSize=5&country=us`,
    {
      headers: {
        Authorization: process.env.NEWS_API_KEY!,
      },
    }
  );
};

const getSomeOfEachCategory = async (
  _: NextApiRequest,
  res: NextApiResponse
) => {
  const responses: ResponsesType = [];
  let error = null;
  try {
    responses.push({
      response: await fetchedData("technology"),
      topic: "technology",
    });
    responses.push({
      response: await fetchedData("health"),
      topic: "health",
    });
    responses.push({
      response: await fetchedData("entertainment"),
      topic: "entertainment",
    });
    responses.push({
      response: await fetchedData("sports"),
      topic: "sports",
    });
    responses.push({
      response: await fetchedData("science"),
      topic: "science",
    });
    responses.push({
      response: await fetchedData("general"),
      topic: "general",
    });
    responses.push({
      response: await fetchedData("business"),
      topic: "business",
    });
  } catch (e: any) {
    error = e.message;
  }
  res.json({
    data: responses.map((r) => ({
      data: r.response.data,
      topic: r.topic,
    })),
    error,
  });
};

export default getSomeOfEachCategory;
