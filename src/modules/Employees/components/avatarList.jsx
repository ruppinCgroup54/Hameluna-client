import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

import PetsIcon from '@mui/icons-material/Pets';

export default function GutterlessList() {
  return (
    <List sx={{ width: 100 , bgcolor: 'background.paper' }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <PetsIcon></PetsIcon>

            // <IconButton aria-label="comment">
            //   {/* <CommentIcon /> */}
            // </IconButton>
          }
          sx={{ paddingTop: 0.1, paddingBottom: 0.1 }} // Adjust padding as needed

        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
      
    </List>
  );
}