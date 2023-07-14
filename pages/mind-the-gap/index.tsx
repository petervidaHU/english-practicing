import MindTheGap from '@/app/components/mindTheGap/mindTheGap.component'
import React, { useState } from 'react'
import { handleGetQuestions } from '@/app/functions/handle-get-questions'
import { iExercises } from '@/types/exercises.types';
import { Button } from '@mui/material';

const emptyExes = {questions: [], answers: []};

const Second = () => {
  const [exercises, setexercises] = useState<iExercises>(emptyExes)
  const [loading, setloading] = useState(false)

  const handleGetQuestionsClick = async () => {
    setloading(true)
    setexercises(emptyExes)
    const ex = await handleGetQuestions();
    setloading(false)
    if (ex !== 'error') {
      setexercises(ex)
    }
  }

  console.log('exercises: ', exercises);

  return (
    <>
    {loading && (<div>loading ... </div>)}
      <Button onClick={handleGetQuestionsClick}>get questions</Button>
      <div>Mind the gap of the following sentences:</div>
      { exercises.questions.length > 0 && <MindTheGap exercises={exercises} /> }
    </>
  )
}

export default Second