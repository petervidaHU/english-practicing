import axios from "axios";
import { QaA, iExercises } from '@/types/exercises.types';
import { v4 as uuidv4 } from 'uuid';
import { EnglishLevels } from '@/types/commonTypes';

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const handleGetQuestions = async (selectedLevel: EnglishLevels): Promise<typeof errorResp | iExercises> => {
  const endpoint = '/api/get-questions/get'
  const errorResp = 'error';
  let res: iExercises | undefined;
  let temp: {data: string};

  try {
    const response = await axios.get(endpoint, {
      params: {
        level: selectedLevel,
      }
    });
    temp = await response.data;

  } catch (e) {
    console.log('error:', e);
    return errorResp
  }
  
  const input = temp.data.trim();
  if (input) {
    res = input
      .split(QaA.question)
      .map((fullTask) => fullTask
        .split(QaA.answer)
        .map(separatedTaskPart => separatedTaskPart
          .trim()
          .replace(/\n/g, '')))
      .filter((arr) => arr.length === 2)
      .reduce((acc: iExercises, [question, answer]): iExercises => {
        const id = uuidv4();
        acc.questions.push({ text: question, id });
        acc.answers.push({ text: answer, id });
        return acc;
      }, {
        questions: [], answers: [],
      });

      res.questions = shuffleArray(res.questions);
      res.questions = res.questions.map(question => {
        question.text.replace(/_+/g, '___');
        return question;
      }) 

      res.answers = res.answers.map(answer => ({
        ...answer,
        text: answer.text.replace(/[\.,;]$/g, '')
      }))
  }
  return res || errorResp
}