import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TabPanel from './TabPanel';
import { Opacity } from '@mui/icons-material';

const StyleTabs = styled(Tabs)(({theme})=>( {
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.light,
    Opacity:0,
    
    height:'100%'
  },
  '& .MuiTab-root': {
    // backgroundColor: theme.palette.common.white,
    color:theme.palette.common.black
  },  '& .Mui-selected': {
    // backgroundColor: theme.palette.primary.main,

  },
}));



function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    
  };
}
export default function DogProfileDetailes() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper',width:'100%',height: '95%', border: '1px solid', borderColor: "primary.main", borderRadius: '20px',overflow:'hidden' }}>
        <StyleTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" sx={{zIndex:2}} {...a11yProps(0)} />
          <Tab label="Item Two" sx={{zIndex:2}}{...a11yProps(1)} />
          <Tab label="Item Three" sx={{zIndex:2}} {...a11yProps(2)} />
        </StyleTabs>
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}

      <Box>

        <TabPanel value={value} index={0} dir={theme.direction}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </Box>
      {/* </SwipeableViews> */}
    </Box>
  );
}
