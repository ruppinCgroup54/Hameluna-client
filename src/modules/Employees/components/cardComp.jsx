import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Collapse } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ChacklistCollapse from './chacklistCollapse';
import PetsIcon from '@mui/icons-material/Pets';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CardComp({ image1, cell, dogsName, dogId }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: { xs: '90%', sm: '70%', md: '50%', lg: 435 },
        position: 'relative',
        overflow: 'visible',
        borderRadius: 6,
        marginTop: 3,
        boxShadow: theme.shadows[10],
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex:1
      }}>
        <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, padding: 1 }}>
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', sm: 120 }, height: 120, objectFit: 'cover', borderRadius: 6 }}
            image={`${image1}`}
            alt="dogs pic"
          />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: { sm: 2 }, width: '100%' }}>
            <Typography gutterBottom variant="h5" component="div">
              {`${dogsName}`}  |   תא {`${cell}`}
            </Typography>
            <Stack spacing={2} direction="row" paddingTop={2} justifyContent="space-between">
              <Button variant='contained' sx={{
                backgroundColor: '#EADCCF',
                color: 'common.black',
                boxShadow: theme.shadows[12],
                borderColor: 'black',
                '&:hover': { backgroundColor: 'primary.light' },
                maxHeight: 50,
                width: '48%',
                fontSize: 11
              }} onClick={() => navigate("/employees/dogsid/" + dogId)}>
               <PetsIcon sx={{ position: "relative", right: 9 }}/> כרטיס כלב
              </Button>
              <Button variant='contained' sx={{
                backgroundColor: '#EADCCF',
                color: 'common.black',
                boxShadow: theme.shadows[12],
                borderColor: 'black',
                '&:hover': { backgroundColor: 'primary.light' },
                maxHeight: 50,
                width: '48%',
                fontSize: 11
              }} onClick={() => setOpen(prev => !prev)}>
                {completed ? (
                  <CheckCircleIcon sx={{ position: "relative", right: 15 }} />
                ) : (
                  <RadioButtonUncheckedIcon sx={{ position: "relative", right: 15 }} />
                )}
                צקליסט  
              </Button>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      <Collapse in={open} sx={{ width: '85%', margin: 'auto', mt: -1 ,backgroundColor: '#EADCCF', borderRadius: 6}}>
        <ChacklistCollapse dogsID={dogId} onComplete={handleComplete} />
      </Collapse>
    </>
  );
}
