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
        width: { xs: '90%', sm: '70%', md: '50%', lg: 380 },
        position: 'relative',
        overflow: 'visible',
        borderRadius: 6,
        marginTop: 3,
        boxShadow: theme.shadows[10],
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: 1
      }}>
        <CardActionArea sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
          <Box sx={{ position: 'relative', width: '100%', '&:hover .hoverOverlay': { opacity: 1 } }}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: 250, objectFit: 'cover', borderRadius: 6 }}
              image={`${image1}`}
              alt="dogs pic"
              onClick={() => navigate("/employees/dogsid/" + dogId)}
            />
            <Box
              className="hoverOverlay"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                opacity: 0,
                transition: 'opacity 0.5s',
                cursor: 'pointer',
                fontSize: '30px'
              }}
              onClick={() => navigate("/employees/dogsid/" + dogId)}
            >
              מעבר לכרטיס כלב
            </Box>
          </Box>
          <CardContent sx={{ display: 'flex',marginTop:-1, flexDirection: 'column', justifyContent: 'center', marginLeft: { sm: 2 }, width: '100%' }}>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              {`${dogsName}`}  |   תא {`${cell}`}
            </Typography>
            <Stack spacing={1} direction="row" paddingTop={0.3} justifyContent="center">
              <Button variant='contained' sx={{
                backgroundColor: '#EADCCF',
                color: 'common.black',
                boxShadow: theme.shadows[12],
                borderColor: 'black',
                '&:hover': { backgroundColor: 'primary.light' },
                maxHeight: 50,
                width: '90%',
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
      <Collapse in={open} sx={{ width: '85%', margin: 'auto', mt: -1, backgroundColor: '#EADCCF', borderRadius: 6 }}>
        <ChacklistCollapse dogsID={dogId} onComplete={handleComplete} />
      </Collapse>
    </>
  );
}
