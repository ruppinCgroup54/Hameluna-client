import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Chcklcomp from "./chacklistComp"
import zIndex from '@mui/material/styles/zIndex';
import { useTheme } from '@emotion/react';

export default function AccordionUsage() {
  return (
    <div> 
     
    
      <Accordion defaultExpanded sx={{width: 400 , backgroundColor: "#EADCCF" }}> 
        {/* <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"        
        >
          Accordion Actions
        </AccordionSummary> */}
        <AccordionDetails sx={{}}>
        <Chcklcomp></Chcklcomp>
        </AccordionDetails>
        <AccordionActions sx={{ position: "relative", paddingRight: 21}}>
          {/* <Button>ביטול</Button> */}
          <Button style={{fontSize: 17 }}>שלח</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}