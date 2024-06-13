import React from 'react'
import useFetch from '../../../utilis/useFetch'
import useImageURL from '../../../utilis/useImageURL';
import Image from '../../../components/Image';
import { Box, Button, IconButton, ImageList } from '@mui/material';
import UploadFileButton from '../../../components/UploadFileButton';
import { Save } from '@mui/icons-material';
import useLocalStorage from '../../../utilis/useLocalStorge';
import { useState } from 'react';

const uploadFiles = async (dogId, shelterId, data) => {
  const res = await fetch(import.meta.env.VITE_APP_SERVERURL + 'images/addImages/shelterId/' + shelterId + '/dogId/' + dogId, {
    method: "POST",
    body: data,

  }).then((res) => {
    if (res.ok) {
      return res.json()
    }
    else return Promise.reject()
  }).then((data) =>data)
  return res;
}

export default function DogImages({ dog }) {

  const [loginDet,setLoginDet ] = useLocalStorage('loginDet');
  const [change, setChange] = useState(0);

  const images = useFetch(import.meta.env.VITE_APP_SERVERURL + 'images/dogId/' + dog.numberId,{} ,[change]);

  console.log('images', images)
  const renderImages = images.value?.map(i => <Image key={i} setDelete={setChange} img={i} isProfile={i === dog.profileImage} dogId={dog.numberId} />)

  const uploadImages = async (e) => {
    e.preventDefault();
    const files = e.target.files.files;

    const filesData = new FormData();
    for (let i = 0; i < files.length; i++) {
        filesData.append("images", files[i]);
    };

     uploadFiles(dog.numberId, loginDet.shelterNumber, filesData).then(setChange).catch(rej=> console.log('rej', rej)) ;

    e.target.reset();
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Box onSubmit={uploadImages} component={'form'} display={'flex'} gap={'32px'}>
        <UploadFileButton isPhotos={true} />
        <Button type='submit' variant='contained' endIcon={<Save />}>
          שמור
        </Button>
      </Box>

      <ImageList sx={{ height:'fit-content', maxHeight: '90%', overflow: 'scroll',padding:'15px'  }} cols={4} >

        {
          renderImages
        }
      </ImageList>
    </Box>


  )
}
