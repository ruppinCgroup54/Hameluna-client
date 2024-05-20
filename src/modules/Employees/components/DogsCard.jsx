import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PetsIcon from '@mui/icons-material/Pets';
import AvararList from "./avatarList"




export default function MediaCard({dog}) {
   


  return (
    
    <Card sx={{ width: 345 , height: 500,borderRadius: 4 }}>
      <CardMedia
        sx={{ height: 200 , }}
        image= {dog.img}
        title="green iguana"
      />
      <CardContent sx={{borderRadius: 4}}>
        <Typography gutterBottom variant="h5" component="div" sx={{height: 5 }}>
          {dog.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
      <CardActions>
        <div>
        <AvararList></AvararList>
        </div>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
     </CardActions>
    </Card>

  );
  
}