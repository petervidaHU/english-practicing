import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { word } = req.query;
  const dictionary = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  if (!word) return res.status(400).json('error in queryparam')

  let response;
  
  try {
    response = await axios.get(dictionary);
  } catch (err) {
    throw new Error('error in get definition call: ', err as ErrorOptions)
  }
  // console.log('get: ', response.data);
  const r = response.data[0].meanings;


  res.status(200).json(r);
};
