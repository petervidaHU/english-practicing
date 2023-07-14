import React, { useState, useEffect } from 'react';
import { iExercises } from '@/types/exercises.types';
import { FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface mindTheGapProps {
  exercises: iExercises,
}

const MindTheGap: React.FC<mindTheGapProps> = ({ exercises: { questions, answers } }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ value: string, result: boolean }[]>([]);

  useEffect(() => {
   setSelectedAnswers([]);   
  }, [questions])
  

  const handleAnswerChange = (index: number, qId: string, event: any) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = ({ value: event.target.value, result: qId === event.target.value });
    setSelectedAnswers(newSelectedAnswers);
  };

  return (
    <>
      {questions.map((question, index) => (
        <Paper sx={{
          display: 'flex',
          padding: '10px 20px',
          margin: '10px 20px',
        }}
          elevation={2} key={index}
        >

          <Typography sx={{
            paddingRight: '20px',
          }}
            variant="subtitle1"
          >
            {selectedAnswers[index] !== undefined
              ? selectedAnswers[index]?.result
                ? <CheckCircleIcon color="success" />
                : <CancelIcon color="error" />
              : null}
          </Typography>

          <Typography variant="h6"
            sx={{
              paddingRight: '20px',
            }}
          >
            {question.text}
          </Typography>

          <FormControl>
            <InputLabel
              id={`q-${index}-label`}>
              Select an answer
            </InputLabel>
            <Select
              sx={{ minWidth: '200px' }}
              labelId={`q-${index}-label`}
              value={selectedAnswers[index]?.value || ''}
              onChange={(event) => handleAnswerChange(index, question.id, event)}
            >
              {answers.map((answer, answerIndex) => (
                <MenuItem
                  key={answerIndex}
                  value={answer.id}
                >
                  {answer.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
      ))}
      {selectedAnswers.length === questions.length
        && selectedAnswers.every(r => r?.result) && (
          <Typography variant="h3">
            - = w ü n d e r f u l = -
          </Typography>)}
    </>
  );
};

export default MindTheGap;