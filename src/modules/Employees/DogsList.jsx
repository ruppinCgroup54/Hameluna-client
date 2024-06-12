import BackgroundLayout from "../../layouts/BackgroundLayout";

import TopbarEmp from "../Employees/components/TopbarEmp";

import { useLoaderData } from "react-router-dom";
import CardComp from "./components/cardComp";

const dogImg02 = "images/Dogs/image 5.png";
const dogImg = "images/Dogs/image 1.png";
const bcgImg = "images/Layouts/background.png";

import useImageURL from "../../utilis/useImageURL";



export default function DogsList() {

  const cells = useLoaderData();
  console.log(cells);

  const dogsToRender = [];

  for (let i = 0; i < cells.length; i++) {
    let dogis = cells[i].dogsInCell;

    for (let c = 0; c < dogis.length; c++) {
      // let dog={
      //   name: dogis[c].name,
      //   cell: i.number,
      //   age: dogis[c].age
      // }

      let dog = <CardComp dogsName={dogis[c].name} cell={cells[i].number} age={dogis[c].age} image1={useImageURL(dogis[c].profileImage)} dogId={dogis[c].numberId}/>

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
          paddingTop: "100px",
          padding: "50px 0",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "70px",
          width: "90%",
          margin: "auto",
        }}>

          {/* <CardComp image1={dogImg} cell={"2"} dogsName={"זאזו"}></CardComp>
          <CardComp image1={dogImg02} cell={"3"} dogsName={"ווילי"}></CardComp> */}

          {dogsToRender}

        </div>

        <div sx={{}}>

        </div>
      </BackgroundLayout>
    </>
  );

}