import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chcklcomp from "./chacklistComp";
import { Box } from '@mui/material';

export default function ChacklistCollapse({ dogsID, onComplete, openChecklist ,routine}) {

  const handleSubmit = (result) => {
    console.log(result);
    onComplete();
  };

  return (
    <Box sx={{ width: '100%' ,borderRadius:3}}>
      <Accordion defaultExpanded sx={{ width: '100%',backgroundColor: '#EADCCF', borderRadius: 9 }}>
        <AccordionDetails sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Chcklcomp dogsId={dogsID} onSubmit={handleSubmit} openCheck={openChecklist} routine={routine} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
