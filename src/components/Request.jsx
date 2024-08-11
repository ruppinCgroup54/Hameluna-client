import { Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useNavigate } from "react-router-dom";
import { deleteFetch } from "../Data/Fetches";
import { getDatabase, ref, set } from "firebase/database";
import useShelterContext from "../utilis/useShelterContext";

export default function Request({ req, close }) {


    const fullName = req.adopter.firstName + " " + req.adopter.lastName;
    const dog = req.dog.name;
    const date = new Date(req.sendDate).toLocaleDateString('en-GB');
    const navigate = useNavigate();
    const { loginDet } = useShelterContext();
    const db = getDatabase();



    const sAdoption = () => {
        close();


        navigate("/admin/shelter/whosHome/adoption", { state: { request: req } });
    };

    const sucDeleteReq = async (id) => {
        
    };

    const errDeleteReq = (message, status) => {

        alert(JSON.stringify(message));
    };

    const deleteRequest = (id) => {
        deleteFetch(`AdoptionRequests/shelter/${req.dog.shelterNumber}/dog/`, id, sucDeleteReq, errDeleteReq);
    }


    return (
        <>
            <ListItem width="50%">
                <ListItemButton>
                    <ListItemText
                        disableTypography={true}
                        onClick={sAdoption}
                        primary={"בקשה חדשה מאת " + fullName}
                        secondary={
                            <>
                                <Typography variant="subtitle2">{fullName + " הגיש/ה בקשה לאימוץ עבור הכלב/ה " + dog}</Typography>
                                <Typography variant="caption">{date}</Typography>
                            </>
                        }
                    />
                    <IconButton onClick={() => deleteRequest(req.requestId)}>
                        <DeleteForeverOutlinedIcon color="error"></DeleteForeverOutlinedIcon>
                    </IconButton>
                </ListItemButton>
            </ListItem>

        </>
    )
}
