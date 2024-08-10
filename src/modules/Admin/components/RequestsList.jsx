import { Box, Divider, List } from "@mui/material";
import Request from "../../../components/Request";
import { get, getDatabase, onValue, ref } from "firebase/database";
import { app } from "../../../../FirebaseConfig";
import { useEffect, useState } from "react";
import useShelterContext from "../../../utilis/useShelterContext";


export default function RequestsList({close=()=>{}, setBadge=()=>{}}) {
    const [requests, setRequests] = useState([]);
    const {loginDet} = useShelterContext();
    const db = getDatabase();



    useEffect(() => {
        const requestsRef = ref(db,'requests/'+ loginDet.shelterNumber);

        onValue(requestsRef, (snapshot) => {
          const data = snapshot.val();
          const requestsList = data ? Object.values(data) : [];
          setRequests(requestsList);
          console.log('first', requestsList)
          setBadge(requestsList.length);
        });
    }, [])


    return (
        <List sx={{
            width: '100%',
            maxWidth: 600,
            maxHeight:'65vh',
            bgcolor: 'background.paper',
            borderRadius: '20px',
            boxShadow:(theme)=>theme.shadows[7],
            overflow:'scroll'
        }}>
            {requests.map((r,i) => <Box key={r.RequestId}><Request  req={r} close={close}/>{i!=requests.length-1&&<Divider />}</Box>)}
        </List>
    )
}
