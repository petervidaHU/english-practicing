import { NextApiRequest, NextApiResponse } from "next/types";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sentence, level } = req.query;

  if (!sentence) return res.status(400).json('error in queryparam')

  let response;
  const prompt = `I want to learn english, and reach the level ${level || 'advanced'}. Can you explain me the grammar system, and the words of the sentence below? Use simple words everybody can understand.
  ${sentence}`;

  try {
    response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
      temperature: 1,
    });
  } catch (err) {
    throw new Error('error in openai call: ', err as ErrorOptions)
  }
  const r = { data: response.data.choices[0].text };

  // console.log('get: ', r);

  res.status(200).json(r);
};
