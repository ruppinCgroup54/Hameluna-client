import PropTypes from 'prop-types';
import SheltersImage from "./SheltersImage";
import { ImageList, Typography } from "@mui/material";



export default function SheltersList({ ListOfShelters }) {

  const firstShelters = ListOfShelters.slice(0,5);
  const renderList = firstShelters.map(shelter =>
    <SheltersImage {...shelter} key={shelter.name}/>
  )


  return (

    <div style={{display:'flex',alignContent:'center',flexDirection:'column', gap:'20px',padding:30,backgroundColor:'#D9AA55'}}>
      <Typography variant="h3" textAlign={'center'} color={'white'} pb={5}>כבר חלק מאינו</Typography>
      {renderList}
    </div>
  )
}
SheltersList.propTypes = {
 
  ListOfShelters: PropTypes.array
}