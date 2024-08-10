import { Button, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from "react-router-dom";
import { deleteFetch, putFetch } from "../Data/Fetches";
import { getDatabase, ref, set } from "firebase/database";
import useShelterContext from "../utilis/useShelterContext";

export default function Exception({ exc, close }) {
    const date = new Date(exc.FillDate).toLocaleDateString('en-GB');
    const navigate = useNavigate();
    const { loginDet } = useShelterContext();
    const db = getDatabase();

    const toReport = () => {
        close();
        navigate("/admin/shelter/reportPage/");
    };


    const completeExc = () => {
        exc.IsHandled = true;
        putFetch('DailyRoutines/shelter/'+ loginDet.shelterNumber +'/routineId/' + exc.RoutineId + '/itemId/' + exc.ItemId, exc);
    }
    return (
        <>
            <ListItem width="50%">
                <ListItemButton>
                    <ListItemText
                        disableTypography={true}
                        onClick={toReport}
                        primary={"חריגה חדשה מאת " + exc.VolunteerName}
                        secondary={
                            <>
                                <Typography variant="subtitle2">{exc.DogName + " לא " + exc.RoutineItem}</Typography>
                                <Typography variant="caption">{date}</Typography>
                            </>
                        }
                        sx={{mr:'30px'}}
                    />
                    <Button onClick={completeExc} variant="outlined" color='success' >טופל</Button>
                </ListItemButton>
            </ListItem>

        </>
    )
}
