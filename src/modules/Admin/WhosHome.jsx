import { Box, Button, Grid, Modal } from "@mui/material";
import Dog from "./components/Dog";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ShelterContext } from "../../context/ShelterContextProvider";
import SelectInput from "../../components/SelectInput";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import ModalAddDog from "./components/ModalAddDog";
import AutocompleteInput from "../../components/AutocompleteInput";
import { useForm, useWatch } from "react-hook-form";
import { isDirty } from "zod";

export default function WhosHome() {
  const { dogs } = useContext(ShelterContext);

  const [dogsToRender, setDogsToRender] = useState(dogs);

  //const flag = useRef(false);

  const labels = [
    {
      label: "זמן אצלנו",
      data: ["פחות מחודש", "בין חודש לשנה", "מעל שנה"],
      id: "entranceDate",
    },
    {
      label: "גיל",
      data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      id: "age",
    },
    {
      label: "גודל",
      data: ["קטן", "קטן-בינוני", "בינוני", "בינוני-גדול", "גדול"],
      id: "size",
    },
  ];

  const methods = useForm();

  const { reset,watch } = methods;


  useEffect(() => {
    setDogsToRender(dogs);
  }, [dogs])

  const filterDogs = (filters) => {
    let tempDogs = dogs.filter((d) => {
      let flag = true;
      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== null) {
          if (key == "entranceDate") {
            flag = flag && calcEntranceDate(filters[key], d.entranceDate);
          } else {
            flag = flag && d[key] == filters[key];
          }
        }
        
      }
      return flag;
    });
    setDogsToRender(tempDogs);
  };

  watch((data)=>filterDogs(data))



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

    return result;
  };

  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Grid container sx={{ mx: "auto", mt: '120px' }} width={"100%"}>
      <Grid item md={12}>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8} display={'flex'} flexDirection={'row'} gap={2}>
            <Box component={'form'} sx={{ display: 'flex', flexDirection: 'row', width: '60%', gap: '10px', "& >*": { width: '33%' } }}>
              {labels.map((l) => (
                <AutocompleteInput
                  key={l.label}
                  isMulti={false}
                  name={l.id} label={l.label} data={l.data} {...methods}
                />
              ))}
            </Box>
            <Button sx={{ p: '0px' }} onClick={() => reset()}>
              <FilterAltOffRoundedIcon fontSize="large" sx={{
                mb: '10px'
              }} />
            </Button>
            <Modal open={openModal} onClose={handleClose}>
              <ModalAddDog opMo={setOpenModal}></ModalAddDog>
            </Modal>
          </Grid>
          <Grid item md={2} >
            <Button variant="contained" size='large'
              sx={{ fontSize: '20px', height: '40px', mt: '10px' }}
              onClick={handleOpen}
            >הוספת כלב +
            </Button>
          </Grid>
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
              pb: '15px'
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
