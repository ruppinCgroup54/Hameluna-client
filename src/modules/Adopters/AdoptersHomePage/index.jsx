import BackgroundLayout from '../../../layouts/BackgroundLayout'
import ChatButton from './ChatButton'
import Logo from '../../../components/Logo'
import SheltersList from './SheltersList'


const WebsiteBackgroud =  'images/Layouts/background.png';

import { Typography } from '@mui/material'
import { useLoaderData } from 'react-router-dom';


//temp array of shelter 
// const List = [
//   {
//     image:"images/Shelter1.jpeg",
//     name:"הרצליה אוהבת חיות"
//   } ,
//    {
//     image:"images/Shelter2.jpeg",
//     name:"נתניה אוהבת חיות"
//   }
// ]

export default function AdoptersHomePage() {

  const List = useLoaderData();

  return (
    <BackgroundLayout image={WebsiteBackgroud} dir={'col'} style={{gap:'7vh',padding:'40px 0'}} >
      
      <Logo.Full />
      <Typography style={{ padding: '5vw', textAlign: 'center', fontSize: 'clamp(1.4rem,3vw, 3rem)', color: 'white' }}>
        שלום! וברוכים הבאים למלונה, כאן תמצאו את החבר הבא שלכם!
        אז שנתחיל?
      </Typography >
      <ChatButton />
     <SheltersList ListOfShelters={List}/>
    </BackgroundLayout>
  )
}
