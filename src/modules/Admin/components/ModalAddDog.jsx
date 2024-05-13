import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { Textinput } from "../../../components/Textinput";
import useFetch from "../../../utilis/useFetch";
import SelectInput from "../../../components/SelectInput";
import { forwardRef, useContext, useState } from "react";
import CharacteristicsSelect from "../../../components/CharacteristicsSelect";
import UploadFileButton from "../../../components/UploadFileButton";
import DateInput from "../../../components/DateInput";
import CellsBox from "../../../components/CellsBox";
import { ShelterContext } from "../../../context/ShelterContextProvider";
import AddImage from "../../../components/AddImage";
import { useForm } from "react-hook-form";




const FormStyle = styled(Box)(({ theme }) => ({
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
    borderColor: theme.palette.primary.main
})
)


const ModalAddDog = forwardRef(() => {

    const { cells } = useContext(ShelterContext);

    const breeds = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Breeds');
    const colors = useFetch(import.meta.env.VITE_APP_SERVERURL + 'Data/Colors');

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
            values: colors.value,
            id: "attribute",
        },
        {
            lab: "מין",
            values: ["זכר", "נקבה"],
            id: "sex",
        },
        {
            lab: "כלב חוזר",
            values: ["כן", "לא"],
            id: "isReturned",
        },
    ]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            "isReturned": "",

        }
    })

    const submit = (e) => {
        e.preventDefault();
        console.log('data', e.target);

        const data =  new FormData(e.target);

        const obj ={};
        data.forEach((value, key) => (obj[key] = value));
        console.log('first',obj)

    }

    return (
        <FormStyle component={'form'} mt={'120px'} mx={'auto'} position={'relative'} onSubmit={submit}>

            <Grid container spacing={4} sx={{ pl: '7%' }}>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant="h4" fontWeight={'bold'}>פרטי הכלב</Typography></Grid>
                <Grid item xs={3}><Textinput
                inputProps={{ pattern: "[1-9]{0-15}" }}
                size="small" label="מספר צ'יפ" type="text"></Textinput> </Grid>
                <Grid item xs={3}><SelectInput field={selectInputs[5]} register={register} /></Grid>
                <Grid item xs={3}><Textinput size="small" label="שם" required /></Grid>
                <Grid item xs={3}><DateInput  label={"תאריך לידה"} /></Grid>
                <Grid item xs={3}><SelectInput field={selectInputs[4]}></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[1]}></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[2]} ></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[0]}></SelectInput></Grid>
                <Grid item xs={3}><DateInput  label={"תאריך הגעה"}></DateInput></Grid>
                <Grid item xs={3}><UploadFileButton ></UploadFileButton></Grid>
                <Grid item xs={6}><CharacteristicsSelect label="הערות נוספות" field={selectInputs[3]}></CharacteristicsSelect></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}><CellsBox cells={cells}></CellsBox></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}><Button variant="contained" type="submit" sx={{ fontSize: '18px', width: '150px' }}>הוסף כלב</Button></Grid>
            </Grid>
            <AddImage register={register("profileImg")}></AddImage>
        </FormStyle>
    )
})
export default ModalAddDog;