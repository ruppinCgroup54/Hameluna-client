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
import { postFetch } from '../../../Data/Fetches';
import AlertComp from '../../../components/AlertComp';
import { useEffect } from 'react';

export default function ChacklistComp({ dogsId, onSubmit, openCheck, routine }) {
  const { shelterId } = JSON.parse(localStorage.getItem("shelterId"));

  const [openErr, setOpenErr] = useState(false);
  const items = useFetch(import.meta.env.VITE_APP_SERVERURL + "DailyRoutines/shelter/" + shelterId);
 
  const [checked, setChecked] = useState({});
  const [notes, setNotes] = useState('');

  const handleToggle = (itemId, value) => {

    const newChecked = {...checked, [itemId] : value};

    setChecked(newChecked);
  };

useEffect(() => {

if (!routine.loading) {

  let checkedObj={};

  routine.value.dogExceptions.map(({itemId,isOk})=>{
    checkedObj[itemId] = isOk;
  })

  setChecked(checkedObj);
}

}, [routine])


  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = () => {
    const result = [
      ...!items.loading && items.value.map((question, index) => ({
        routineId: 0,
        itemId: question.itemID,
        isOk: checked[question.itemID],
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

    const suc = (data) => {
      openCheck(false);
    
    };
    const err = (data) => {
      setOpenErr(true);
    };

    postFetch('DailyRoutines', dailyRoutine, suc, err);
    
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#EADCCF' }}>
        {!items.loading && items.value.map((question, index) => (
          <ListItem key={question.itemID}>
            <ListItemText primary={question.item} />
            <Switch
              edge="end"
              onChange={(e)=>handleToggle(question.itemID, e.currentTarget.checked)}
              checked={checked[question.itemID]}
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
      <AlertComp handleClose={()=>{setOpenErr(false)}} isOpen={openErr} type='error' color='error' text={'שליחה נכשלה.'}></AlertComp>
    </Box>
  );
}
