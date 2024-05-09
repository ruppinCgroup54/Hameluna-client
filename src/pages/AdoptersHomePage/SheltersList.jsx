import { ImageList, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import SheltersImage from "./SheltersImage";



export default function SheltersList({ ListOfShelters }) {

  const renderList = ListOfShelters.map(shelter =>
    <SheltersImage {...shelter} key={shelter.name}/>
  )


  return (

    <div style={{display:'flex',alignContent:'center',flexDirection:'column', gap:'20px',padding:30}}>
      <Typography variant="h3" textAlign={'center'} color={'white'} pb={5}>כבר חלק מאינו</Typography>
      {renderList}
    </div>
  )
}
SheltersList.propTypes = {
 
  ListOfShelters: PropTypes.array
}