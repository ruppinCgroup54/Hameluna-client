import React from 'react'
import LogoImg from "../images/Layouts/Logo.png"
import Slogen from "../images/Layouts/Slogen.png"

const logoStyle={display:'flex', flexDirection:'column',alignItems: 'center', alignContent:'center',width:'fit-content',margin:'auto' }

export default function Logo() {

  return (
    <div style={logoStyle}>
      <img src={LogoImg} width={'70%'} alt="לוגו המלונה"  />
    </div>
  )
}

Logo.Full= ()=>{
  return(
    <div style={logoStyle}>
    <img src={LogoImg} width={'70%'} alt="לוגו המלונה"  />
    <img src={Slogen} width={'100%'} style={{maxWidth:'300px'}}  alt="לוגו המלונה"  />
  </div>
  )
}
