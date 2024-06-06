import { Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function Request({req, close}) {
    const fullName = req.adopter.firstName + " " + req.adopter.lastName;
    const dog = req.dog.name;
    const date = new Date(req.sendDate).toLocaleDateString('en-GB');
    return (
        <>
        <ListItem width="50%">
            <ListItemButton>
                <ListItemText
                    primary= {"בקשה חדשה מאת " + fullName}
                    secondary={
                        <>
                            <Typography variant="subtitle2">{fullName + " הגישה בקשה לאימוץ עבור הכלב " + dog }</Typography>
                            <Typography variant="caption">{date}</Typography>
                        </>
                    }
                />
                <IconButton>
                    <DeleteForeverOutlinedIcon color="error"></DeleteForeverOutlinedIcon>
                </IconButton>
                <IconButton onClick={close}>
                    <PetsOutlinedIcon color="primary" ></PetsOutlinedIcon>
                </IconButton>
            </ListItemButton>
        </ListItem>
        
    </>
    )
}
