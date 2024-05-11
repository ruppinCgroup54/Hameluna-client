import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Chcklcomp from "./chacklistComp"
import zIndex from '@mui/material/styles/zIndex';

export default function AccordionUsage() {
  return (
    <div> 
     
    
      <Accordion defaultExpanded sx={{width: 400 , backgroundColor: "#EADCCF"}}> 
        {/* <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"        
        >
          Accordion Actions
        </AccordionSummary> */}
        <AccordionDetails>
        <Chcklcomp></Chcklcomp>
        </AccordionDetails>
        <AccordionActions>
          <Button>ביטול</Button>
          <Button>שלח</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}