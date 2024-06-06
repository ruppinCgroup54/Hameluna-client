import { Divider, List } from "@mui/material";
import Request from "../../../components/Request";
import { get, getDatabase, onValue, ref } from "firebase/database";
import { app } from "../../../../FirebaseConfig";
import { useEffect, useState } from "react";


export default function RequestsList({close}) {
    const [requests, setRequests] = useState([]);

    const db = getDatabase();
    // const dbRef = ref(db, "requests/1");
    // const snapshot = await get(dbRef);


    useEffect(() => {
        const requestsRef = ref(db,'requests/1');

        onValue(requestsRef, (snapshot) => {
          const data = snapshot.val();
          const requestsList = data ? Object.values(data) : [];
          setRequests(requestsList);
          console.log('first', requestsList)

        });

        // Cleanup subscription on unmount
       // return () => requestsRef.off();
      
        // if (snapshot.exists()) {
        //     setRequests(Object.values(snapshot.val()))
        // }

    }, [])


    return (
        <List sx={{
            width: '100%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            mt: '10px',
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: '20px'
        }}>
            {requests.map((r,i) => <><Request key={r.requestId} req={r} close={close}/>{i!=requests.length-1&&<Divider />}</>)}
        </List>
    )
}
