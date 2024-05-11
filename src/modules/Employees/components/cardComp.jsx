import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Collapse } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chklst from "./chacklistCollapse";
import { position } from 'stylis';
import PetsIcon from '@mui/icons-material/Pets';
import CardComp2 from "./cardComp2";
import { useTheme } from '@emotion/react';
import { useState } from 'react';


export default function ActionAreaCard({ image1 }) {

  const theme = useTheme();
const [open, setOpen] = useState(false);


  return (
    <>
    <Card sx={{ display: 'flex', height: 145, width: 435,position: 'relative', overflow: 'visible' , borderRadius: 6}}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'row' , paddingLeft:1}}>
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6}}
          image={`${image1}`}
          alt="dogs pic"
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 2 }}>
          <Typography gutterBottom variant="h5" component="div">
            ג'אנגו | תא 3
          </Typography>
          <Stack spacing={2} direction="row" paddingTop={2} marginLeft={-1.5}>
            
            <Button variant='contained' sx={{ backgroundColor: '#EADCCF',color: 'common.black', boxShadow: theme.shadows[12], borderColor: 'black', '&:hover': { backgroundColor: 'primary.light' }, maxHeight: 50, width: 120, fontSize: 11 }}>צפייה בכרטיס כלב<PetsIcon /></Button>
            <Button variant='contained' sx={{ backgroundColor: '#EADCCF',color: 'common.black', boxShadow: theme.shadows[12], borderColor: 'black', '&:hover': { backgroundColor: 'primary.light' }, maxHeight: 50, width: 120, fontSize: 11 }} onClick={()=>setOpen(prev=>!prev)}>צקליסט</Button>
          </Stack>

        </CardContent>
      </CardActionArea>

      
    </Card>
    <Box sx={{ position: 'relative' }}>
        <Collapse in={open}>

          <Chklst />
        </Collapse>

      </Box>

    </>
  );
}
