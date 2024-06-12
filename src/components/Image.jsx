import { Delete, DeleteForever, ExitToAppOutlined, Height, Scale, X } from "@mui/icons-material";
import { Backdrop, Box, IconButton, ImageListItem, ImageListItemBar, Modal, styled } from "@mui/material";
import { useState } from "react";
import { position } from "stylis";

const StyledImageItem = styled(ImageListItem)(({ theme }) => ({
  "& img":{
    boxShadow:theme.shadows[10],
    borderRadius:'15px',
    transition: 'all 0.3s',

  },
   "&:hover":{
    scale:"1.1",
    transition: 'all 0.3s',
    
  },
  "&:hover .MuiBox-root ": {
    opacity: 1,
  },
  "& .MuiBox-root": {
    opacity: 0,
    transition: 'all 0.3s',
    position: 'absolute',
    width: '100%',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,0.4)',
    "& .MuiIconButton-root": {
      position: 'absolute',
      bottom: '0',

    }
  }
}));



export default function Image({ img, isProfile = false }) {
  const [open, setOpen] = useState(false)

  const deleteImage=()=>{
    
  }

  return (
    <>
      <StyledImageItem  >
        <img
          onClick={() => setOpen(true)}
          srcSet={`${img}?w=150&h=150&fit=crop&auto=format 2x`}
          src={`${img}?w=150&h=150&fit=crop&auto=format`}
          alt={img}
          loading="lazy"
        />
        {/* <ImageListItemBar
          title={img?.split("_").pop()}
          sx={{ textAlign: 'right' }}
        /> */}
        <Box>
          <IconButton onClick={deleteImage}>

            <DeleteForever color='error' fontSize="large" />
          </IconButton>
        </Box>
      </StyledImageItem>
      <Modal open={open} onClose={() => setOpen(false)} >
   
        <img src={img} alt={img} style={{ position: 'absolute', top: '50%', right: '50%', translate: '50% -50%' }} />
      </Modal>
    </>
  );
}