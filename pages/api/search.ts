import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  let response = null;
  let error = null;
  try {
    response = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${req.query.q}`,
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
