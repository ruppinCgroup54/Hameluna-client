import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chklst from "./chacklistCollapse";
import { position } from 'stylis';
import PetsIcon from '@mui/icons-material/Pets';
import CardComp2 from "./cardComp2";


export default function ActionAreaCard({ image1 }) {
  return (
    <Card sx={{ display: 'flex', maxWidth: 1000}}>
      <CardActionArea sx={{ display: 'flex',  flexDirection: 'row' }}>
        <CardMedia
          component="img"
          sx={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 9 }}
          image={`${image1}`}
          alt="dogs pic"
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            ג'אנגו | תא 3
          </Typography>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" sx={{ color: 'black', borderColor: 'black', '&:hover': { backgroundColor: '#DCDCDC' }, maxHeight: 50 , width:140}}>צפייה בכרטיס כלב<PetsIcon/></Button>
            <Chklst />
          </Stack>

        </CardContent>
      </CardActionArea>

      
    </Card>


  );
}
