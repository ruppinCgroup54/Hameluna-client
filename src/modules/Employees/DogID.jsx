import BackgroundLayout from "../../layouts/BackgroundLayout";
import bcgImg from "/public/images/Layouts/background.png";
import cardComp2 from "../Employees/components/cardComp2"

export default function dogId(){
    return(
        <>
        <BackgroundLayout image={bcgImg} style={{ display: "block"}}>
            <cardComp2/>
            </BackgroundLayout>;
</>
    );
    
}