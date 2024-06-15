import BackgroundLayout from "../../layouts/BackgroundLayout";
import TopbarEmp from "../Employees/components/TopbarEmp";
import { useLoaderData } from "react-router-dom";
import CardComp from "./components/CardComp";

const bcgImg = "images/Layouts/background.png";
import useImageURL from "../../utilis/useImageURL";

export default function DogsList() {
  const cells = useLoaderData();
  console.log(cells);

  const dogsToRender = [];

  for (let i = 0; i < cells.length; i++) {
    let dogis = cells[i].dogsInCell;

    for (let c = 0; c < dogis.length; c++) {
      let dog = <CardComp key={dogis[c].numberId} dogsName={dogis[c].name} cell={cells[i].number} age={dogis[c].age} image1={useImageURL(dogis[c].profileImage)} dogId={dogis[c].numberId} />
      dogsToRender.push(dog);
    }
  }

  return (
    <>
      <BackgroundLayout image={bcgImg} style={{ display: "block" }}>
        <div>
          <TopbarEmp></TopbarEmp>
        </div>
        <div style={{
          padding: "50px 0",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "70px",
          width: "90%",
          margin: "auto",
          paddingTop: "100px",
        }}>
          {dogsToRender}
        </div>
      </BackgroundLayout>
    </>
  );
}
