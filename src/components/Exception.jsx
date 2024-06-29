import { Button, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from "react-router-dom";
import { deleteFetch, putFetch } from "../Data/Fetches";
import { getDatabase, ref, set } from "firebase/database";
import useShelterContext from "../utilis/useShelterContext";

export default function Exception({ exc, close }) {
    const date = new Date(exc.fillDate).toLocaleDateString('en-GB');
    const navigate = useNavigate();
    const { loginDet } = useShelterContext();
    const db = getDatabase();

    const toReport = () => {
        close();
        navigate("/admin/shelter/reportPage/");
    };

    const errPutExc = async (txt, status) => {
        if (status = 404) {
            set(ref(db, 'exceptions/' + loginDet.shelterNumber + '/' + exc.routineId + '_' + exc.itemId), null);
        }
    };

    const sucPutExc = () => {
        set(ref(db, 'exceptions/' + loginDet.shelterNumber + '/' + exc.routineId + '_' + exc.itemId), null);
    };

    const completeExc = () => {
        exc.isHandled = false;
        putFetch('DailyRoutines/routineId/' + exc.routinId + '/itemId/' + exc.itemId, exc, sucPutExc, errPutExc);
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
                    <Button onClick={completeExc} variant="outlined" color='success' >טופל</Button>
                </ListItemButton>
            </ListItem>

        </>
    )
}
