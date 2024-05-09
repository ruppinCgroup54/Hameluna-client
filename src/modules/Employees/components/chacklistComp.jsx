import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import WifiIcon from '@mui/icons-material/Wifi';
import BluetoothIcon from '@mui/icons-material/Bluetooth';



export default function SwitchListSecondary() {
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      
    >
      <ListItem>
        
        <ListItemText id="switch-list-label-wifi" primary="יצא לטיול?" />
        <Switch
          edge="end"
          onChange={handleToggle('wifi')}
          checked={checked.indexOf('wifi') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-wifi',
          }}
        />
      </ListItem>
      <ListItem>
        
        <ListItemText id="switch-list-label-poo" primary="עשה צרכים?" />
        <Switch
          edge="end"
          onChange={handleToggle('poo')}
          checked={checked.indexOf('poo') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-bluetooth',
          }}
        />
      </ListItem>

      <ListItem>
        
        <ListItemText id="switch-list-label-medic" primary="קיבל תרופות?" />
        <Switch
          edge="end"
          onChange={handleToggle('medic')}
          checked={checked.indexOf('medic') !== -1}
          inputProps={{
            'aria-labelledby': 'switch-list-label-medic',
          }}
        />
      </ListItem>
    </List>
  );
}