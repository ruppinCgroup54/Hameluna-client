import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TabPanel from './TabPanel';
import { Opacity } from '@mui/icons-material';
import ModalAddDog from './ModalAddDog';
import CellsForm from './CellsForm';
import ShelterForm from './ShelterForm';
import { Textinput } from '../../../components/Textinput';
import DogData from './DogData';

const StyleTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    Opacity: 0,

    height: '100%'
  },
  '& .MuiTab-root': {
    // backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    zIndex: 2
  }, '& .Mui-selected': {
    color: theme.palette.common.white,
    transition: 'color 1s'
  },
}));



function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,

  };
}



export default function DogProfileDetailes({dog}) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const DogTabs = [
    {
      name: 'פרטי כלב',
      component: <DogData dog={dog}/>
    }, {
      name: 'חריגות',
      component: <Textinput label="2" />
    }, {
      name: 'תמונות',
      component: <Textinput label="3" />
    }, {
      name: 'קבצים',
      component: <Textinput />
    },
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width: '100%', height: '95%', border: '1px solid', borderColor: "primary.main", borderRadius: '20px', overflow: 'hidden' }}>
      <StyleTabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >

        {DogTabs.map((t, i) => { return <Tab label={t.name} {...a11yProps(i)} /> })}

      </StyleTabs>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}

      <Box>
        {DogTabs.map((t, i) => { return <TabPanel key={i} value={value} index={i} >
          {t.component}
        </TabPanel> })}

      </Box>
      {/* </SwipeableViews> */}
    </Box>
  );
}
