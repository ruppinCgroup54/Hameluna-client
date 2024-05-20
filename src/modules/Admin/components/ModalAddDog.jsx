import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { Textinput } from "../../../components/Textinput";
import useFetch from "../../../utilis/useFetch";
import SelectInput from "../../../components/SelectInput";
import { forwardRef, useContext, useEffect, useState } from "react";
import CharacteristicsSelect from "../../../components/CharacteristicsSelect";
import UploadFileButton from "../../../components/UploadFileButton";
import DateInput from "../../../components/DateInput";
import CellsBox from "../../../components/CellsBox";
import { ShelterContext } from "../../../context/ShelterContextProvider";
import AddImage from "../../../components/AddImage";
import { useForm } from "react-hook-form";
import { DoorFront } from "@mui/icons-material";
import { useFetcher } from "react-router-dom";




export const FormStyle = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    width: "75%",
    borderRadius: "20px",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "3%",
    border: '5px solid',
    borderColor: theme.palette.primary.main,
    marginTop:'10vh'                                                           
})
)


const ModalAddDog = forwardRef(({opMo},ref) => {

    const fetcher = useFetcher();
    const { cells,setTriggerFetch } = useContext(ShelterContext);

    const breeds = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Breeds');
    const colors = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Colors');
    const Characteristics = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Characteristics');

    const selectInputs = [
        {
            lab: "גודל",
            values: ["קטן", "קטן-בינוני", "בינוני", "בינוני-גדול", "גדול"],
            id: "size",
        },
        {
            lab: "גזע",
            values: breeds.value,
            id: "breed",
        },
        {
            lab: "צבע",
            values: colors.value,
            id: "color",
        },
        {
            lab: "הערות נוספות",
            values: Characteristics.value,
            id: "attributes",
        },
        {
            lab: "מין",
            values: ["זכר", "נקבה"],
            id: "gender",
        },
        {
            lab: "כלב חוזר",
            values: ["כן", "לא"],
            id: "isReturned",
        },
    ]


    const submit = (e) => {
        e.preventDefault();
        console.log('data', e.target);

        const data = new FormData(e.target);

        let dogToAdd = {};
        data.forEach((value, key) => (dogToAdd[key] = value));
        dogToAdd ={ ...dogToAdd,
            'numberId': 0,
            'breed': dogToAdd['breed'].split(','),
            'color': dogToAdd['color'].split(','), 
            'attributes': dogToAdd['attributes'].split(','),
            'dateOfBirth': dateBirth,
            'entranceDate': arrivalDate,
            'files': data.getAll("files"),
            'cellId': cell,
            'isReturned': dogToAdd['isReturned']=="לא" ? false : true,
            'isAdoptable': false,
            'adopted': false 
        }
        // dogToAdd['breed'] = dogToAdd['breed'].split(','); 
        // dogToAdd['color'] = dogToAdd['color'].split(','); 
        // dogToAdd['attributes'] = dogToAdd['attributes'].split(',');
        // dogToAdd['dateOfBirth'] = dateBirth;
        // dogToAdd['entranceDate'] = arrivalDate;
        // dogToAdd['files'] = data.getAll("files");
        // dogToAdd['cellId'] = cell;
        



        const files = dogToAdd['files'];
        const profileImg = dogToAdd['profileImg'];

        delete dogToAdd['files'];
        delete dogToAdd['profileImg'];

        fetch(import.meta.env.VITE_APP_SERVERURL + 'Dogs', {
            method: "POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(dogToAdd),
          }).then((res) => {
            console.log('res', res)
            return res.json()
          }).then((data) => {
            opMo(false);
          setTriggerFetch(prev=>++prev);

          } )


    }

    const [dateBirth, setDateBirth] = useState({});
    const [arrivalDate, setArrivalDate] = useState('');
    const [cell, setCell] = useState(null);

    return (
        <FormStyle component={'form'} mx={'auto'} position={'relative'} onSubmit={submit}>

            <Grid container spacing={3} sx={{ pl: '7%' }}>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant="h4" fontWeight={'bold'}>פרטי הכלב</Typography></Grid>
                <Grid item xs={3}><Textinput size="small" name="chipNumber" label="מספר צ'יפ" type="text"></Textinput> </Grid>
                <Grid item xs={3}><SelectInput field={selectInputs[5]} /></Grid>
                <Grid item xs={3}><Textinput size="small" name="name" label="שם" required /></Grid>
                <Grid item xs={3}><DateInput label={"תאריך לידה"} setVal={setDateBirth} /></Grid>
                <Grid item xs={3}><SelectInput field={selectInputs[4]}></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[1]}></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[2]} ></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[0]}></SelectInput></Grid>
                <Grid item xs={3}><DateInput label={"תאריך הגעה"} setVal={setArrivalDate}></DateInput></Grid>
                <Grid item xs={3}><UploadFileButton></UploadFileButton></Grid>
                <Grid item xs={6}><CharacteristicsSelect field={selectInputs[3]}></CharacteristicsSelect></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}><CellsBox cells={cells.loading?[]:cells.value} setVal={setCell} val={cell}></CellsBox></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}><Button variant="contained" type="submit" sx={{ fontSize: '18px', width: '150px' }}>הוסף כלב</Button></Grid>
            </Grid>
            <AddImage></AddImage>
        </FormStyle>
    )
})
export default ModalAddDog;