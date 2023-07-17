import React, { useState } from 'react'
import { anchorsOfTheWorld } from '@/types/commonTypes'
import { iExercisePart } from '@/types/exercises.types'
import { Card, Paper, Typography } from '@mui/material'
import { GetWordDefinition } from '../functions/get-word-definition';
import WordDefinition from './WordDefinition';

interface ActualWordsType {
  words: iExercisePart[]
}

const ActualWords: React.FC<ActualWordsType> = ({ words }) => {
  const [defs, setDefs] = useState<{ [K in string]: any[] }>({});

  const handleGetDefinition = async (word: string) => {
    const myDefinition: any[] | 'error' = await GetWordDefinition(word);
    if (myDefinition !== 'error') {
      console.log('final definition in ui: ', myDefinition);
      setDefs(prev => ({
        ...prev,
        [word]: myDefinition
      }));
    }
  }

  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginTop: '60px', }}
        id={anchorsOfTheWorld.CHOOSE}
      >
        Actual Words to learn
      </Typography>

      <Typography
        variant="h6"
      >
        Click on the card to get definition
      </Typography>

      <Paper>
        {
          words.map(word => (
            <Card
              key={word.id}
              raised
              sx={{
                padding: '10px 20px',
                minWidth: '100px',
                margin: '10px',
              }}
              onClick={() => handleGetDefinition(word.text)}
            >
              {word.text}
              <WordDefinition word={word.text} defs={defs}/>
            </Card>
          ))
        }
      </Paper>
    </>
  )
}

export default ActualWords