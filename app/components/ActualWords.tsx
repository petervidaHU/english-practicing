import { anchorsOfTheWorld } from '@/types/commonTypes'
import { iExercisePart } from '@/types/exercises.types'
import { Card, Paper, Typography } from '@mui/material'
import React from 'react'

interface ActualWordsType {
  words: iExercisePart[]
}

const ActualWords: React.FC<ActualWordsType> = ({ words }) => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{marginTop: '60px',}}
        id={anchorsOfTheWorld.CHOOSE}
      >
        Actual Words to learn
      </Typography>

      <Typography
        variant="h6"
      >
        Select the words you want to practice more! (min 3)
      </Typography>

      <Paper
        sx={{
          display: 'flex',
          justifyItems: 'row',
        }}
      >
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
            >
              {word.text}
            </Card>
          ))
        }
      </Paper>
    </>
  )
}

export default ActualWords