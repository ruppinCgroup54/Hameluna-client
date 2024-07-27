import React from 'react'
import useImageURL from '../../../utilis/useImageURL'
import { DogCardStyle } from '../../Adopters/DogsTinder/DogCard'
import { Box, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowBack, ArrowCircleLeft } from '@mui/icons-material'


export default function AdoptionDogCard({ dog }) {


  const navigate = useNavigate();
  const keysToShow = ['gender', 'breed', 'age', 'size']

  return (
    <DogCardStyle sx={{border:'2px solid', borderColor:'primary.main',"&:hover .MuiCardContent-root":{height:'90%',transition:'all 0.5s'}}}>
      <CardMedia>
        <img src={useImageURL(dog.profileImage)} alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />

      </CardMedia>
      <CardContent >
        <div style={{ height: { xs: "100%", md: "80%" }, overflow: "auto",margin:'10px' }}>
          <Typography variant='h6' fontWeight={'bold'} textAlign={'center'} >{dog.name}</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', padding: '20px 20px', gap: '20px 15px',}}>

            {keysToShow.map((key) => {
              return <Box key={key} sx={{ display: 'flex', gap: '5px', alignItems: 'flex-end', flexGrow: 0.5 }}>
                <img src="images/bone.png" width={30} height={30} />
                <Typography variant='body1' >{dog[key]}</Typography>
              </Box>
            })}
          </Box>
            <Typography><b>מידע נוסף: </b>{dog.note} </Typography>
        </div>
        <IconButton sx={{width:'fit-content' , alignSelf:'flex-end', height: '30px' }} onClick={()=>navigate("/admin/shelter/whosHome/DogProfile/"+dog.numberId)}>
          <ArrowCircleLeft color={'primary'} fontSize='large' />
        </IconButton>
      </CardContent>

    </DogCardStyle>
  )
}
