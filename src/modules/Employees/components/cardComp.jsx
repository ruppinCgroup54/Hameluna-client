import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ActionAreaCard({image1}) {
  return (
    <Card sx={{ maxWidth: 450 ,display: 'flex'}}>
      <CardActionArea>
        
        <CardMedia
          component="img"
          sx={{ width: 140, height: 140, objectFit: 'cover', marginRight: 1 , marginTop: 1 , marginLeft: 1 , borderRadius: 13}}
          image={`${image1}`}
          alt="dogs pic"
        />
        <CardContent sx={{ display: 'flex' }} >  
          <Typography gutterBottom variant="h5" component="div">
         ג'אנגו | תא 3
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" fontSize={"19px"}>
            תא 3
          </Typography> */}
          <Stack spacing={2} direction="row">
      
      <Button variant="outlined" sx={{color: 'black' , borderColor: 'black', '&:hover': {backgroundColor: '#DCDCDC'} }}>מילוי צ'ק ליסט</Button>
      <Button variant="outlined" sx={{color: 'black' , borderColor: 'black', '&:hover': {backgroundColor: '#DCDCDC'}}}>צפייה בכרטיס כלב</Button>
    </Stack>
  

        </CardContent>
      </CardActionArea>
    </Card>
  );
}