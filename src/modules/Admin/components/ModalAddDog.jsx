import { useTheme } from "@emotion/react";
import { Box, Grid, Typography, styled } from "@mui/material";
import { Textinput } from "../../../components/Textinput";
import useFetch from "../../../utilis/useFetch";
import SelectInput from "../../../components/SelectInput";
import { useContext, useState } from "react";
import CharacteristicsSelect from "../../../components/CharacteristicsSelect";
import UploadFileButton from "../../../components/UploadFileButton";
import DateInput from "../../../components/DateInput";
import CellsBox from "../../../components/CellsBox";
import { ShelterContext } from "../../../context/ShelterContextProvider";




const FormStyle = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(217,217,217,0.5)",
    width: "75%",
    borderRadius: "20px",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "5%",
    border: '2px solid',
    borderColor: theme.palette.primary.main
})
)


export default function ModalAddDog() {

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
    ]

    return (
        <FormStyle component={'form'} >
            <Typography variant="h5" fontWeight={'bold'}>פרטי הכלב</Typography>
            <Grid container spacing={4}>
                <Grid item xs={3}><Textinput size="small" label="מספר צ'יפ" type="text"></Textinput> </Grid>
                <Grid item xs={3}><Textinput size="small" label="שם" required></Textinput></Grid>
                <Grid item xs={3}><DateInput label={"תאריך לידה"}></DateInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[1]}></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[2]} ></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[0]}></SelectInput></Grid>
                <Grid item xs={3}><DateInput label={"תאריך הגעה"}></DateInput></Grid>
                <Grid item xs={3}><Textinput size="small" label="כלב חוזר?"></Textinput></Grid>
                <Grid item xs={6}><UploadFileButton></UploadFileButton></Grid>
                <Grid item xs={6}><Textinput size="small" label="פרטי מוסר הכלב"></Textinput></Grid>
                <Grid item xs={6}><CharacteristicsSelect label="הערות נוספות" field={selectInputs[3]}></CharacteristicsSelect></Grid>
                <Grid item xs={6}><CellsBox cells={cells}></CellsBox></Grid>
            </Grid>
        </FormStyle>
    )
}
