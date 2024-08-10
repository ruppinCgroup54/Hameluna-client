import { Button, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { putFetch } from "../Data/Fetches";
import useShelterContext from "../utilis/useShelterContext";

export default function Exception({ exc, close,handleUpdate=()=>{} }) {
    const date = new Date(exc.fillDate).toLocaleDateString('en-GB');
    const navigate = useNavigate();
    const { loginDet } = useShelterContext();

    const toReport = () => {
        close();
        navigate("/admin/shelter/reportPage/");
    };


    const completeExc = () => {
        exc.IsHandled = true;
        putFetch('DailyRoutines/shelter/'+ loginDet.shelterNumber +'/routineId/' + exc.routineId + '/itemId/' + exc.itemId, exc,handleUpdate);
    }
    return (
        <>
            <ListItem width="50%">
                <ListItemButton>
                    <ListItemText
                        disableTypography={true}
                        onClick={toReport}
                        primary={"חריגה חדשה מאת " + exc.volunteerName}
                        secondary={
                            <>
                                <Typography variant="subtitle2">{exc.dogName + " לא " + exc.routineItem}</Typography>
                                <Typography variant="caption">{date}</Typography>
                            </>
                        }
                        sx={{mr:'30px'}}
                    />
                    {!exc.isHandled ? <Button onClick={completeExc} variant="outlined" color='warning' >טיפול</Button>:
                    <Button variant="outlined" color='success' >טופל</Button>}
                </ListItemButton>
            </ListItem>

        </>
    )
}
