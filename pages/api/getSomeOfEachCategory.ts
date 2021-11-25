import axios, { AxiosResponse } from "axios";
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

const getSomeOfEachCategory = async (): Promise<{
  data: any[];
  error: any;
}> => {
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
  return {
    data: responses.map((res) => ({
      data: res.response.data,
      topic: res.topic,
    })),
    error,
  };
};

export default getSomeOfEachCategory;

// --------------RESPONSE OBJECT
// {
//   "source": {
//       "id": "cnn",
//       "name": "CNN"
//   },
//   "author": "Nectar Gan and Steve George, CNN",
//   "title": "Who is Zhang Gaoli? The man at the center of Chinese tennis star Peng Shuai's #MeToo allegation - CNN",
//   "description": "Before retiring as vice premier, Zhang Gaoli was the face of China's organizing efforts ahead of the 2022 Winter Olympics.",
//   "url": "https://www.cnn.com/2021/11/25/china/who-is-zhang-gaoli-intl-hnk-dst/index.html",
//   "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/211124031006-zhang-gaoli-thomas-bach-beijing-file-2016-super-tease.jpg",
//   "publishedAt": "2021-11-25T10:09:00Z",
//   "content": "\"This was originally a scandal against Zhang, but the (party's) fetish for power has blunted its response, turning a personal scandal into a national scandal.\"\r\nDeng Yuwen, a political analyst"
// }