import React from 'react'
import LogoImg from "../assets/images/Logo.png"
import Slogen from "../assets/images/Slogen.png"

const logoStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'fit-content',
  margin: '0',
  //padding: '40px',
  //backgroundImage:'radial-gradient( #8C6849 0%, #8C6849 23%,  rgba(140, 104, 73, 0) 100%)'
}

export default function Logo() {

  return (
    <div style={{logoStyle}}>
      <img src={LogoImg} width={'50%'} alt="לוגו המלונה" />
    </div>
  )
}

Logo.Full = () => {
  return (
    <div style={{...logoStyle}}>
      <img src={LogoImg} style={{width:'50%'}} alt="לוגו המלונה" />
      <img src={Slogen} width={'100%'} style={{ maxWidth: '300px'}} alt="לוגו המלונה" />
    </div>
  )
}
