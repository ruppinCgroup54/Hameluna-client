import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DogCardStyle } from '../../Adopters/DogsTinder/DogCard';
import useImageURL from "../../../utilis/useImageURL";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green, red } from '@mui/material/colors';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CancelIcon from '@mui/icons-material/Cancel';
import { date } from 'zod';
import { Today } from '@mui/icons-material';

const dogImg02 = "images/Dogs/image 5.png";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function bulliAttribue(neutered){
if(neutered == 1){
  return <CheckCircleIcon sx={{color: green[300]}}/>
}
return <CancelIcon sx={{color:red[300]}}/>

}

function isChip(dog2) {
  if(dog2.chipNumber != null){
    return <CheckCircleIcon sx={{color: green[300]}}/>
  }
  else return <CancelIcon sx={{color:red[300]}}/>

}


export default function MediaCard({ dog }) {
  
  let dogToDelete={
    neutered: 0,
    lastCalevt: new Date('2023-01-17'),
    
  }// delete after craetr neutered attribute in dogs table

  function checkCalevet(lastCalevt) {
    const oneYear = 365 * 24 * 60 * 60 * 1000; // שנה במילישניות
    const today = new Date();
    const diffTime = today - new Date(lastCalevt);
    if (diffTime < oneYear) {
      return <CheckCircleIcon sx={{ color: green[300] }} />;
    }
    return <CancelIcon sx={{ color: red[300] }} />;
  }

  
  const attributes = [
    { label: "גיל", value: dog.age },
    { label: "גודל", value: dog.size },
    { label: "מין", value: dog.gender },
    { label: "גזע", value: dog.breed },
    { label: "מספר תא", value: dog.cellId },
    { label: "הגיע אלינו", value: formatDate(dog.entranceDate)},
    {label: "קיים צ'יפ", value: isChip(dog)},
    {label: "מסורס", value: bulliAttribue(dogToDelete.neutered)},
    {label: "מחוסן", value: checkCalevet(dogToDelete.lastCalevt)}
  ];

  


  return (
    <Card sx={{ maxWidth: 330, width:"90%", borderRadius: 7 , height: "100%"}}>
      <CardMedia
        sx={{ height: 270}}
        image={`${useImageURL(dog.profileImage)}`}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dog.name}
        </Typography>
        <Grid container spacing={2}>
          {attributes.map((attr, index) => (
            <Grid item xs={4} sm={4} key={index}>
              <Typography variant="subtitle2" color="text.secondary">
                {attr.label}
              </Typography>
              <Typography variant="body2">
                {attr.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
          <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
