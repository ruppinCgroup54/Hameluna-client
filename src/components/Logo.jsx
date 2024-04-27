import React from 'react'
import LogoImg from "../assets/images/Logo.png"
import Slogen from "../assets/images/Slogen.png"
import { Widgets } from '@mui/icons-material'
import { Box } from '@mui/material'

const logoStyle = {
 width:"15vw",
}

export default function Logo() {

  return (
    <Box sx={{ width:{xs:'100%',sm:'20vw',md:'15vw'} }}>
      <img src={LogoImg}  style={{maxWidth:300, width:'15vw',display:'block'}} alt="לוגו המלונה" />
    </Box>
  )
}

Logo.Full = () => {
  return (
    <Box sx={{ width:{xs:'60vw',sm:'20vw',md:'15vw'} }}>
      <img src={LogoImg} style={{display:'block',width:'60%',margin:'0 auto' }} alt="לוגו המלונה" />
      <img src={Slogen} style={{display:'block',width:'100%'}}   alt="לוגו המלונה" />
    </Box>
  )
}
Logo.Bottom = () => {
  return (
    <Box sx={{ width:{xs:'100%',sm:'20vw',md:'15vw'} }}>
      <img src={Slogen} style={{ maxWidth: 150,display:'block' }} alt="לוגו המלונה" />
    </Box>
  )
}
