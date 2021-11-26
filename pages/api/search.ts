import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  let response = null;
  let error = null;
  try {
    response = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${req.query.q}&pageSize=5&country=us`,
      {
        headers: {
          Authorization: process.env.NEWS_API_KEY!,
        },
      }
    );
  } catch (e: any) {
    error = e.message;
  }
  res.json({
    data: response ? response?.data: null,
    error
  })
};
export default search;
