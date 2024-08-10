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
import { useFetcher, useNavigate } from "react-router-dom";




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
    marginTop: '10vh'
})
)


const ModalAddDog = forwardRef(({ opMo }, ref) => {

    const navigate = useNavigate();
    const { cells, setTriggerFetch, loginDet } = useContext(ShelterContext);

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
        dogToAdd = {
            ...dogToAdd,
            'numberId': 0,
            'breed': dogToAdd['breed'].split(',').filter(a => a !== ""),
            'color': dogToAdd['color'].split(',').filter(a => a !== ""),
            'attributes': dogToAdd['attributes'].split(',').filter(a => a !== ""),
            'dateOfBirth': dateBirth,
            'entranceDate': arrivalDate,
            'files': data.getAll("files"),
            'cellId': cell,
            'isReturned': dogToAdd['isReturned'] == "לא" ? false : true,
            'isAdoptable': false,
            'adopted': false,
            'profileImage': data.getAll("profileImage"),
            'shelterNumber':-1,
            'note':''
        }

        const files = dogToAdd['files'];
        const filesData = new FormData();
        for (let i = 0; i < files.length; i++) {
            filesData.append("files", files[i]);
        };

        const profileImg = dogToAdd['profileImage'];
        const imagesData = new FormData();
        for (let i = 0; i < profileImg.length; i++) {
            imagesData.append("images", profileImg[i])
        };

        delete dogToAdd['files'];
        dogToAdd['profileImage'] = "";

        fetch(import.meta.env.VITE_APP_SERVERURL + 'Dogs', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dogToAdd),
        }).then((res) => {
            console.log('res', res)
            return res.json();
        }).then((data) => {
            opMo(false);
            console.log('data', data)
            uploadProfileImg(data);
        })

        const uploadProfileImg = (dogId) => {
            fetch(import.meta.env.VITE_APP_SERVERURL + 'Images/shelterId/' + loginDet.shelterNumber + '/dogId/' + dogId, {
                method: "POST",
                body: imagesData,

            }).then((res) => {
                console.log('res', res)
                return res.json()
            }).then((data) => {
                console.log('data', data);
                uploadFile(dogId);
            })
        }

        const uploadFile = (dogId) => {
            fetch(import.meta.env.VITE_APP_SERVERURL + 'Files/shelterId/' + loginDet.shelterNumber + '/dogId/' + dogId, {
                method: "POST",
                body: filesData,

            }).then((res) => {
                console.log('res', res)
                setTriggerFetch(prev => prev + 1);

                return res.json();
            }).then((data) => console.log('data', data))
        }
    }

    const [dateBirth, setDateBirth] = useState({});
    const [arrivalDate, setArrivalDate] = useState('');
    const [cell, setCell] = useState(null);

    return (
        <FormStyle component={'form'} mx={'auto'} position={'relative'} onSubmit={submit}>

            <Grid container spacing={3} sx={{ pl: '100px' }}>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}><Typography variant="h4" fontWeight={'bold'}>פרטי הכלב</Typography></Grid>
                <Grid item xs={3}><Textinput size="small" name="chipNumber" label="מספר צ'יפ" type="text"></Textinput> </Grid>
                <Grid item xs={3}><SelectInput field={selectInputs[5]} /></Grid>
                <Grid item xs={3}><Textinput size="small" name="name" label="שם" required /></Grid>
                <Grid item xs={3}><DateInput label={"תאריך לידה"} setVal={setDateBirth} /></Grid>
                <Grid item xs={3}><SelectInput field={selectInputs[4]}></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[1]}></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={true} field={selectInputs[2]} ></SelectInput></Grid>
                <Grid item xs={3}><SelectInput isMulti={false} field={selectInputs[0]}></SelectInput></Grid>
                <Grid item xs={3}><DateInput label={"תאריך הגעה"} setVal={setArrivalDate}></DateInput></Grid>
                <Grid item xs={3}><UploadFileButton></UploadFileButton></Grid>
                <Grid item xs={6}><CharacteristicsSelect field={selectInputs[3]}></CharacteristicsSelect></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}><CellsBox cells={cells.loading ? [] : cells.value} setVal={setCell} val={cell}></CellsBox></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'center'}><Button variant="contained" type="submit" sx={{ fontSize: '18px', width: '150px' }}>הוסף כלב</Button></Grid>
            </Grid>
            <AddImage></AddImage>
        </FormStyle>
    )
})
export default ModalAddDog;