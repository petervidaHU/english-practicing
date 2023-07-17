import axios from "axios";
import { EnglishLevels } from '@/types/commonTypes';

export const explainThis = async (level: EnglishLevels, q: string, a: string | null): Promise<string> => {
  if (!a) return 'sorry this is an error!';
  const sentence = q.replace('___', a);
  const endpoint = '/api/explainThis'
  const errorResp = '';
  let temp;

  try {
    const response = await axios.get(endpoint, {
      params: {
        level: level,
        sentence: sentence,
      }
    });
    temp = await response.data.data;

  } catch (e) {
    console.log('error:', e);
    return errorResp
  }
  console.log('temp: ', temp);
  return temp || errorResp
}