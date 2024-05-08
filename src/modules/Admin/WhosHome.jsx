import { Box, Button, Grid } from "@mui/material";
import Dog from "./components/Dog";
import { useContext, useEffect, useRef, useState } from "react";
import { ShelterContext } from "../../context/ShelterContextProvider";
import FilterDogs from "../../components/SelectInput";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";

export default function WhosHome() {
  const { dogs } = useContext(ShelterContext);
  console.log("dogs", dogs);

  const [filterFields, setFilterFields] = useState({});

  const [dogsToRender, setDogsToRender] = useState(dogs);

  //const flag = useRef(false);

  console.log("dogsToRender", dogsToRender);
  const labels = [
    {
      lab: "זמן אצלנו",
      values: ["פחות מחודש", "בין חודש לשנה", "מעל שנה"],
      id: "entranceDate",
    },
    {
      lab: "גיל",
      values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      id: "age",
    },
    {
      lab: "גודל",
      values: ["קטן", "קטן-בינוני", "בינוני", "בינוני-גדול", "גדול"],
      id: "size",
    },
  ];

  const addFilter = (value, id) => {
    let temp = { [id]: value };
    console.log("temp", temp);
    setFilterFields({ ...filterFields, ...temp });
  };

  useEffect(() => {
    filterDogs();
  }, [filterFields]);

  const filterDogs = () => {
    console.log("roni");
    let tempDogs = dogs.filter((d) => {
      let flag = true;
      for (const key in filterFields) {
        if (key == "entranceDate") {
          flag = flag && calcEntranceDate(filterFields[key], d.entranceDate);
        } else {
          flag = flag && d[key] == filterFields[key];
        }
      }
      return flag;
    });
    setDogsToRender(tempDogs);
  };

  const calcEntranceDate = (key, entranceDate) => {
    let date1 = new Date(entranceDate);
    let date2 = new Date();
    let result = true;
    switch (key) {
      case "פחות מחודש":
        result =
          Math.floor((date2.getTime() - date1.getTime()) / (24 * 3600 * 1000)) <= 31;
        break;
      case "בין חודש לשנה":
        let tempRes = Math.floor(
          (date2.getTime() - date1.getTime()) / (24 * 3600 * 1000)
        );
        result = tempRes > 31 && tempRes <= 365;
        break;
      case "מעל שנה":
        result = Math.floor((date2.getTime() - date1.getTime()) / (24 * 3600 * 1000)) > 365;
        break;
      default:
        break;
    }
    console.log("result", result);
    console.log("key", key);

    return result;
  };

  // const resetFilter = (set) => {
  //   set("");
  // };

  return (
    <Grid container mt={"120px"} sx={{ mx: "auto" }} width={"100%"}>
      <Grid item md={12}>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8} display={'flex'} flexDirection={'row'} gap={2}>
            {labels.map((l) => (
              <FilterDogs
                filterDogs={addFilter}
                key={l.lab}
                filter={l}
              ></FilterDogs>
            ))}
            <Button onClick={() => setFilterFields({})}>
              <FilterAltOffRoundedIcon fontSize="large" sx={{ mb: "17px" }} />
            </Button>
          </Grid>
          <Grid item md={2} ><Button variant="contained" size='large' sx={{ fontSize: '20px', height: '40px', mt: '10px' }}>הוספת כלב +</Button></Grid>
        </Grid>
      </Grid>
      <Grid item md={12} sx={{ mx: "auto" }}>
        <Box sx={{ width: "90%", mx: "auto", mt: "60px" }}>
          <Box
            sx={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: "calc(240px / 5)",
              rowGap: "15px",
              justifyContent: "center",
            }}
          >
            {dogsToRender.map((d, i) => (
              <Dog key={d.numberId} dogItem={d}></Dog>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
