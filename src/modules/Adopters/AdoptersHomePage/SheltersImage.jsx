import PropTypes from 'prop-types';

import defaultShelter from "/Shelter1.jpeg"

import { Box, useTheme } from '@mui/material';


const imageStyle = {
  display: 'block',
  width: '80%',
  margin: 'auto',
  maxWidth: '250px',
  borderRadius: '20px'
}

export default function SheltersImage({ image, Website, name }) {

  const theme = useTheme();
  return (
    <a href={Website} style={{ width: '90vw' }} >

      <Box component={'img'} src={image} alt={name} sx={imageStyle} boxShadow={theme.shadows[5]}/>

    </a>
  )
}



SheltersImage.propTypes = {
  name: PropTypes.string,
  Website: PropTypes.string,
  image: PropTypes.string
}

SheltersImage.defaultProps = {
  name: "No content",
  Website: "#",
  image: defaultShelter

}