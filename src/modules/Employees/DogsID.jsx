import BackgroundLayout from "../../layouts/BackgroundLayout";
import bcgImg from "../../assets/images/Layouts/background.png";
import CardComp2 from "./components/cardComp2";
import DogCard from "./components/DogsCard";
import TopBarMobile from "./components/TopbarEmp";
import AvatarList from "../Employees/components/avatarList"


const phoneStyle = {
    width: "90%",
    margin: "auto",
  };

export default function dogsId(){

    let dog={
        name: "לילי",
        age: 2,
        cell: "4",
        img : "../../../assets/images/Dogs/image 1.png"
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
            <AvatarList></AvatarList>
            </div>
          </BackgroundLayout>;
</>
    );
    
}