import React from 'react'
import useFetch from '../../../utilis/useFetch'
import useImageURL from '../../../utilis/useImageURL';
import Image from '../../../components/Image';
import { Box, Button, CircularProgress, IconButton, ImageList } from '@mui/material';
import UploadFileButton from '../../../components/UploadFileButton';
import { Save } from '@mui/icons-material';
import useLocalStorage from '../../../utilis/useLocalStorge';
import { useState } from 'react';
import File from './File';

const uploadFilesToServer = async (dogId, shelterId, data) => {
  const res = await fetch(import.meta.env.VITE_APP_SERVERURL + 'files/shelterId/' + shelterId + '/dogId/' + dogId, {
    method: "POST",
    body: data,

  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    else return Promise.reject()
  }).then((data) => data)
  return res;
}

export default function DogFiles({ dog }) {

  const [loginDet, setLoginDet] = useLocalStorage('loginDet');
  const [change, setChange] = useState(0);

  const files = useFetch(import.meta.env.VITE_APP_SERVERURL + 'files/dogId/' + dog.numberId, {}, [change]);

  console.log('files', files)
  const renderfiles = files.value?.map((u, i) => <File key={u} url={u}  dogId={dog.numberId} setDelete={setChange} />)

  const uploadFiles = async (e) => {
    e.preventDefault();
    const filesform = e.target.files.files;

    const filesData = new FormData();
    for (let i = 0; i < filesform.length; i++) {
      filesData.append("files", filesform[i]);
    };

    uploadFilesToServer(dog.numberId, loginDet.shelterNumber, filesData).then(setChange).catch(alert);

    e.target.reset();
  }
  return (
    <Box sx={{ height: '100%' }}>
      <Box onSubmit={uploadFiles} component={'form'} display={'flex'} gap={'32px'}>
        <UploadFileButton />
        <Button type='submit' variant='contained' endIcon={<Save />}>
          שמור
        </Button>
      </Box>
      <Box className='flexBox-row' sx={{ gap: '32px', width: '100%', padding: '15px' }}>
        {files.loading?<CircularProgress/> :renderfiles}

      </Box>

    </Box>


  )
}
