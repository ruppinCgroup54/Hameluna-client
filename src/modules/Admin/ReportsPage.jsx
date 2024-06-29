import { Box, Typography } from "@mui/material";
import BackgroundLayout from "../../layouts/BackgroundLayout";
import ExceptionsList from "../Admin/components/ExceptionsList";

const requestBackground = "images/Layouts/RequestBackground.png";

export default function ReportsPage() {

    return (
        <BackgroundLayout image={requestBackground} style={{ display: "block" }}>
            <Box pt={'120px'} width={'90%'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                }}>
                <Typography variant="h4" mb={'20px'} fontWeight={'bold'}>דו"ח חריגות</Typography>
                {<ExceptionsList></ExceptionsList>}
            </Box>
        </BackgroundLayout>

    )
}
