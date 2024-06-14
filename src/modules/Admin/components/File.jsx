import { Box, IconButton, SvgIcon, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useImageURL from '../../../utilis/useImageURL';
import ConfirmationDialog from '../../../components/ConfirmationDialog';
import { DeleteForever } from '@mui/icons-material';

export default function File({ url,dogId,setDelete }) {

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogAns, setDialogAns] = useState(false);


  const deleteFile = async () => {
    fetch(import.meta.env.VITE_APP_SERVERURL + `files/${dogId}`, {
      method: 'DELETE',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({url})
    }).then(res => res.ok ? setDelete(url) : res.text().then(alert))
      
  }

  useEffect(() => {
    if (dialogAns) {
      deleteFile()
    }

  }, [dialogAns])

  const extenstion = url?.split(".").pop();
  const name = url?.split("_").pop();
  const svgUrl = `images/files_svg/${extenstion?.toUpperCase()}.svg`

  return (
    <Box sx={{ width: '15%',maxWidth:'100px',position:'relative', "&:hover .MuiBox-root.delBox":{opacity:1}}}  >
      <a href={useImageURL(url)} download={true} target='_blank'>
        <img style={{ width: '100%', filter: "drop-shadow(8px 8px 10px gray)" }} src={extenstion !== undefined && svgUrl} />
      </a>
      <Typography variant='body2' sx={{ overflow: ' hidden', textOverflow: 'ellipsis' }} >{name}</Typography>
      <ConfirmationDialog content={"את/ה בטוח/ה שתרצה למחוק את הקובץ?"} isOpen={openDialog} setOpen={setOpenDialog} setSelectedValue={setDialogAns} />
      <Box className='delBox' sx={{position:'absolute',top:'-15px',left:'-15px',opacity:0, transition:'all 0.5s'}}>
          <IconButton onClick={() => setOpenDialog(true)}>

            <DeleteForever color='error' fontSize="large" />
          </IconButton>
        </Box>
    </Box>
  )
}
