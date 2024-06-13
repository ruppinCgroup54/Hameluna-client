import { Delete, DeleteForever, ExitToAppOutlined, Height, Scale, X } from "@mui/icons-material";
import { Backdrop, Box, IconButton, ImageListItem, ImageListItemBar, Modal, styled } from "@mui/material";
import { useState } from "react";
import { position } from "stylis";
import ConfirmationDialog from "./ConfirmationDialog";
import { useEffect } from "react";
import useImageURL from "../utilis/useImageURL";

const StyledImageItem = styled(ImageListItem)(({ theme }) => ({
  "& img": {
    boxShadow: theme.shadows[10],
    borderRadius: '15px',
    transition: 'all 0.3s',

  },
  "&:hover": {
    scale: "1.1",
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



export default function Image({ img, dogId, setDelete, isProfile = false }) {
  const [open, setOpen] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogAns, setDialogAns] = useState(false);

  const deleteImage = async () => {
    fetch(import.meta.env.VITE_APP_SERVERURL + `images/${dogId}`, {
      method: 'DELETE',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({url:img})
    }).then(res => res.ok ? setDelete(img) : res.text().then(alert))
      
  }

  useEffect(() => {
    if (dialogAns) {
      deleteImage()
    }

  }, [dialogAns])


  return (
    <>
      <StyledImageItem  >
        <img
          onClick={() => setOpen(true)}
          srcSet={`${useImageURL(img)}?w=150&h=150&fit=crop&auto=format 2x`}
          src={`${useImageURL(img)}?w=150&h=150&fit=crop&auto=format`}
          alt={img}
          loading="lazy"
        />

        <Box>
          <IconButton onClick={() => setOpenDialog(true)}>

            <DeleteForever color='error' fontSize="large" />
          </IconButton>
        </Box>
      </StyledImageItem>
      <ConfirmationDialog content={"את/ה בטוח/ה שתרצה למחוק את התמונה?"} isOpen={openDialog} setOpen={setOpenDialog} setSelectedValue={setDialogAns} />
      <Modal open={open} onClose={() => setOpen(false)} >

        <img src={img} alt={img} style={{ position: 'absolute', top: '50%', right: '50%', translate: '50% -50%' }} />
      </Modal>
    </>
  );
}