import React from 'react'
import LogoImg from "../assets/images/Logo.png"
import Slogen from "../assets/images/Slogen.png"
import { Widgets } from '@mui/icons-material'
import { Box } from '@mui/material'

import PropTypes from 'prop-types';

const logoStyle = {
 width:"15vw",
}

export default function Logo() {

  return (
    <Box sx={{ width:{xs:'100%',sm:'20vw',md:'15vw'} }}>
      <img src={LogoImg}  style={{maxWidth:{maxWidthLogo}, width:'15vw',display:'block'}} alt="לוגו המלונה" />
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
Logo.Bottom = ({maxWidthLogo}) => {
  return (
    <Box sx={{ width:{xs:'100%',sm:'20vw',md:'15vw'} }}>
      <img src={Slogen} style={{ maxWidth: maxWidthLogo ,display:'block', margin:'auto' }} alt="לוגו המלונה" />
    </Box>
  )
}

Logo.Bottom.propTypes = {
  maxWidthLogo: PropTypes.string
};

Logo.Bottom.defaultProps={
  maxWidthLogo: '300px'
}
