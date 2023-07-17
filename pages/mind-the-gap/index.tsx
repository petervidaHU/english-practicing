import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Alert, Box, Button, Divider, Drawer, Modal, SelectChangeEvent, Typography } from '@mui/material';
import { iExercisePart, iExercises } from '@/types/exercises.types';
import { EnglishLevels, anchorsOfTheWorld } from '@/types/commonTypes';
import { handleGetQuestions } from '@/app/functions/handle-get-questions'
import { explainThis } from '@/app/functions/explain-this';
import RootLayout from '@/app/layout';
import MindTheGap from '@/app/components/mindTheGap'
import TargetLevel from '@/app/components/TargetLevel';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function getTextById(id: string, arrayOfObjects: iExercisePart[]) {
  const foundObject = arrayOfObjects.find((obj) => obj.id === id);
  return foundObject ? foundObject.text : null;
}

const emptyExes = { questions: [], answers: [] };

const Second = () => {
  const [exercises, setexercises] = useState<iExercises>(emptyExes)
  const [loading, setloading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<EnglishLevels>(EnglishLevels.C1);
  const [open, setOpen] = React.useState(false);
  const [explanation, setExplanation] = React.useState('');

  const handleClose = () => {
    setExplanation('');
  }

  const handleSetExplanation = async (id: string, index: string) => {
    setloading(true)
    console.log('index in handler', exercises.questions[+index])
    console.log('index in handler', getTextById(id, exercises.answers))

    const exp = await explainThis(selectedLevel, exercises.questions[+index].text, getTextById(id, exercises.answers))
    console.log('exp::::', exp);
    if (exp) {
      setExplanation(exp);
    }
    setloading(false)

  }

  useEffect(() => {
    if (explanation) {
      setOpen(true)
    } else {
      setOpen(false);
    }

  }, [explanation])


  const handleLevelChange = (event: SelectChangeEvent<EnglishLevels>) => {
    event.preventDefault();
    const { value } = event.target;
    console.log('event: ', event)
    setSelectedLevel(value as EnglishLevels);
  }

  const handleGetQuestionsClick = async () => {
    setloading(true)
    setexercises(emptyExes)
    const ex = await handleGetQuestions(selectedLevel);
    setloading(false)
    if (ex !== 'error') {
      setexercises(ex)
    }
  }

  console.log('exercises: ', exercises);

  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <Drawer
          sx={{
            width: '300px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '300px',
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <TargetLevel
            selectedLevel={selectedLevel}
            handleChange={handleLevelChange}
          />
          <Button
            onClick={handleGetQuestionsClick}
          >
            get questions
          </Button>
          <Divider />
          <Link href={`#${anchorsOfTheWorld.CHOOSE}`}>
            Choose the words
          </Link>
          <Divider />

        </Drawer>
        {loading
          && (
            <Alert sx={{
              marginBottom: '20px',
              width: '100%',
            }}
              severity="info">
              loading ...
            </Alert>
          )}
        {exercises.questions.length > 0
          && (
            <RootLayout>
              <Typography
                variant="h4"
              >
                Mind the gap of the following sentences:
              </Typography>
              <MindTheGap
                level={selectedLevel}
                exercises={exercises}
                expHandler={handleSetExplanation}
              />
            </RootLayout>
          )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Explanation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {explanation}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default Second

/*

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { explainThis } from '@/functions/explainThisShit';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}

*/