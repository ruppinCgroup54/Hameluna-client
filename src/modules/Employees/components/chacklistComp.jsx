import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import useFetch from '../../../utilis/useFetch';

export default function ChacklistComp({ dogsId, onSubmit }) {
  
  useEffect(() => {
    fetch(import.meta.env.VITE_APP_SERVERURL/+"Volunteers/"+phone, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
  }, [])
  
  const [checked, setChecked] = useState([]);
  const [notes, setNotes] = useState('');

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const queryArr = [
    "האם יצא לטיול?",
    "האם עשה צרכים?",
    "האם אכל ושתה?",
    "האם נראה חיוני?"
  ];

  const handleSubmit = () => {
    const result = [
      { key: "מזהה כלב", value: dogsId },
      { key: "תאריך", value: dayjs().format('YYYY-MM-DD') },
      ...queryArr.map((question, index) => ({
        key: question,
        value: checked.includes(index.toString()) ? 1 : 0
      })),
      { key: "הערות", value: notes }
    ];
    console.log(result);
    onSubmit(result);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#EADCCF' }}>
        {queryArr.map((question, index) => (
          <ListItem key={index}>
            <ListItemText primary={question} />
            <Switch
              edge="end"
              onChange={handleToggle(index.toString())}
              checked={checked.includes(index.toString())}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        id="outlined-multiline-static"
        label="הערות"
        multiline
        rows={4}
        value={notes}
        onChange={handleNotesChange}
        sx={{ width: '100%', marginTop: 2 }}
      />
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleSubmit}>
        שלח
      </Button>
    </Box>
  );
}
