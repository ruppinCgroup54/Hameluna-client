import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog({ content, setSelectedValue, isOpen,setOpen }) {


  const handleClose = (ans) => {
    setOpen(false);
    setSelectedValue(ans)
  };


  return (

    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={()=>handleClose(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText fontWeight={'bold'} id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={() => handleClose(false)}>לא</Button>
        <Button variant='contained' color='error' onClick={() => handleClose(true)}>כן</Button>
      </DialogActions>
    </Dialog>
  );
}