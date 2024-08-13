import BackgroundLayout from "../../layouts/BackgroundLayout";

import CardComp2 from "./components/cardComp2";
import DogCard from "./components/DogsCard";
import TopBarMobile from "./components/TopbarEmp";
import AvatarList from "../Employees/components/avatarList";
import { useLoaderData } from "react-router-dom";
import useImageURL from "../../utilis/useImageURL";




const phoneStyle = {
    width: "90%",
    margin: "auto",
  };


const bcgImg = "images/Layouts/background.png";


export default function DogsId() {

    let dog={
        name: "לילי",
        age: 2,
        cell: "4",
        img : "images/Dogs/image 1.png"
        }; 

        const dogs = useLoaderData();
        console.log(dogs);

       
       
    return(
        <>
        <BackgroundLayout image={bcgImg} style={{ display: "block"}}>
        <div  style={{
            padding: "50px 0",
            ...phoneStyle,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "70px",
          }}>
            <TopBarMobile></TopBarMobile>
            {/* <h1>{dogs.name}</h1> */}
            <DogCard dog={dogs}></DogCard>
            {/* <AvatarList></AvatarList> */}
            
            </div>
          </BackgroundLayout>
</>
    );
    
}