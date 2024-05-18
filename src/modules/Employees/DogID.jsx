import BackgroundLayout from "../../layouts/BackgroundLayout";
import cardComp2 from "../Employees/components/cardComp2"

const bcgImg = "images/Layouts/background.png";

export default function dogId(){
    return(
        <>
        <BackgroundLayout image={bcgImg} style={{ display: "block"}}>
            <cardComp2/>
            </BackgroundLayout>;
</>
    );
    
}