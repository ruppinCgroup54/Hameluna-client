import { Box, Divider, List } from "@mui/material";
import Request from "../../../components/Request";
import { get, getDatabase, onValue, ref } from "firebase/database";
import { app } from "../../../../FirebaseConfig";
import { useEffect, useState } from "react";
import useShelterContext from "../../../utilis/useShelterContext";
import Exception from "../../../components/Exception";
import { convertKeysToLowercase } from "../../../utilis/Helper";


export default function ExceptionsList({ close = () => { }, setBadge = () => { } }) {
    const [exceptions, setExceptions] = useState([]);
    const { loginDet } = useShelterContext();
    const db = getDatabase();


    useEffect(() => {
        const exceptionsRef = ref(db, 'exceptions/' + loginDet.shelterNumber);

        onValue(exceptionsRef, (snapshot) => {
            const data = snapshot.val();
            const exceptionsList = data ? Object.values(data) : [];
            setExceptions(convertKeysToLowercase(exceptionsList));
            console.log('first', exceptionsList)
            setBadge(exceptionsList.length);
        });
    }, [])


    return (
        <List sx={{
            width: '100%',
            maxWidth: 600,
            maxHeight: '65vh',
            bgcolor: 'background.paper',
            borderRadius: '20px',
            boxShadow: (theme) => theme.shadows[7],
            overflow: 'scroll'
        }}>
            {exceptions.map((d, i) => {
                console.log('d', d)
                return <Box key={d.routineId + '_' + d.itemId}><Exception exc={d} close={close} />{i!=exceptions.length-1&&<Divider />}</Box>})
            }
        </List>
    )
}
