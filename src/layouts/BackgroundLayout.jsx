import React from 'react'
import PropTypes from 'prop-types';


export default function BackgroundLayout({ children, image,dir, style }) {

  const LayoutStyle={
    background: `url(${image}) no-repeat center center fixed`,
    height: "100dvh",
    width: '100vw', 
    display: 'flex',
    alignItems:'center',
    overflow:'auto',
    flexDirection: dir === 'col' ? 'column': 'row',
    backgroundSize:'cover',
  };

  

  return (
    <div  style={{ ...LayoutStyle, ...style, }}>
      {children}

    </div>
  )
}

BackgroundLayout.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  dir: PropTypes.oneOf(['col', 'row']),

}
