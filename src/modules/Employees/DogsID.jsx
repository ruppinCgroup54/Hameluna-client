import BackgroundLayout from "../../layouts/BackgroundLayout";

import CardComp2 from "./components/cardComp2";
import DogCard from "./components/DogsCard";
import TopBarMobile from "./components/TopbarEmp";
import AvatarList from "../Employees/components/avatarList"


const phoneStyle = {
    width: "90%",
    margin: "auto",
  };


const bcgImg = "images/Layouts/background.png";


export default function DogsId(){

    let dog={
        name: "לילי",
        age: 2,
        cell: "4",
        img : "images/Dogs/image 1.png"
        }; 

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
            <DogCard dog={dog}></DogCard>
            {/* <AvatarList></AvatarList> */}
            </div>
          </BackgroundLayout>;
</>
    );
    
}