import axios from "axios";

export const GetWordDefinition = async (word: string): Promise<any[] | 'error'> => {
  if (!word) return [];

  const endpoint = '/api/getDefinition'
  let temp = [];

  try {
    const response = await axios.get(endpoint, {
      params: {
        word,
      }
    });
    temp = response.data;

  } catch (e) {
    console.log('error:', e);
    return 'error'
  }
  return temp;
}
