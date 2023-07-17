export interface iExercisePart {
  text: string,
  id: string,
}

export interface iExercises {
  questions: iExercisePart[],
  answers: iExercisePart[],
}

export enum QaA {
  question = 'QUESTION:',
  answer = 'ANSWER:'
}
