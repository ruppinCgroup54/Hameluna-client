import React from 'react'
import PropTypes from 'prop-types';

export default function BackgroundLayout({children,image}) {

  return (
    <div style={{background:`url(${image}) no-repeat center center fixed`,backgroundSize:'cover',height:"100dvh" ,width:'100vw'}}>
      {children}
    </div>
  )
}

BackgroundLayout.propTypes ={
  image:PropTypes.string
}
