import { NextApiRequest, NextApiResponse } from "next/types";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OAI,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAIApi(configuration);
  const prompt = `You are an English teacher, I am a student. I want to reach the C1 level of English, and I need to practice. Create a fill-the-blank space exercise for English learners to practice level C1 English sentences. Like this: QUESTION: Taking on new challenges can ___ your motivation., ANSWER: boost.
  Create 10 sentences about a generic topic with C1 level of English. This is a mind-the-gap exercise. Be cautious that the answers must not be interchangable with other answers and questions. Start every sentence with this string: "QUESTION:"`;
  let response;

  try {
    response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 1,
    });
  } catch (err) {
    throw new Error('error in openai call: ', err as ErrorOptions)
  }
  const r = { data: response.data.choices[0].text };
  
  // console.log('get: ', r);
  
  res.status(200).json(r);
  };
