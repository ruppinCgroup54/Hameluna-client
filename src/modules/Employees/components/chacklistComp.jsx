import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import useFetch from '../../../utilis/useFetch';
import { useParams } from 'react-router-dom';
import { Restaurant } from '@mui/icons-material';

export default function ChacklistComp({ dogsId, onSubmit }) {
  const { shelterId } = JSON.parse(localStorage.getItem("shelterId"));

  const items = useFetch(import.meta.env.VITE_APP_SERVERURL + "DailyRoutines/shelter/" + shelterId);
 
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

  // const queryArr = [
  //   "האם יצא לטיול?",
  //   "האם עשה צרכים?",
  //   "האם אכל ושתה?",
  //   "האם נראה חיוני?"
  // ];

  const handleSubmit = () => {
    const result = [
      ...!items.loading && items.value.map((question, index) => ({
        routineId: 0,
        itemId: question.itemID,
        isOk: checked.includes(index.toString()),
        isHandled: false
      }))
    ];

    const volDet = JSON.parse(localStorage.getItem("VolunteerObj"));

    const dailyRoutine = {
      routineId: 0,
      fillDate: dayjs().format('YYYY-MM-DD'),
      note: notes,
      dogNumberId: dogsId,
      volunteerPhoneNumber: volDet.phoneNumber,
      shelterNumber: volDet.shelterId,
      dogExceptions: result
    }
    console.log(dailyRoutine);
    onSubmit(result);

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#EADCCF' }}>
        {!items.loading && items.value.map((question, index) => (
          <ListItem key={question.itemID}>
            <ListItemText primary={question.item} />
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
