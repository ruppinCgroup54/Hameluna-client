import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import PetsIcon from '@mui/icons-material/Pets';

export default function AvatarList({ dog }) {
  console.log(dog);
  let name = dog.dog.name;
  let cell = dog.dog.cellId;
  let breed = dog.dog.breed;
  let age = dog.dog.age;
  let size = dog.dog.size;
  let medicine = "כדור1 בבוקר";
  let gender= dog.dog.gender;
  let chip="";
  if (dog.dog.chipnumber != null) {
    
  }

  let arr = [
    `תא: ${cell}`,
    `מין: ${gender}`,
    `גיל: ${age}`,
    `סוג: ${breed}`,
    `גודל: ${size}`,
    `תרופות: ${medicine}`,

  ];

  return (
    <List sx={{ width: 200, bgcolor: 'background.paper' }}>
      {arr.map((item, index) => (
        <ListItem key={index} disableGutters sx={{ paddingTop: 0.1, paddingBottom: 0.1 }}>
          <Grid container alignItems="center">
          <Grid item>
              <PetsIcon />
            </Grid>
            <Grid item xs sx={{marginLeft: 2}}>
              <ListItemText primary={item} />
            </Grid>
            
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}
