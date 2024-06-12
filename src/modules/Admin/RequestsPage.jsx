import { Box, Typography } from "@mui/material";
import RequestsList from "./components/RequestsList";
import BackgroundLayout from "../../layouts/BackgroundLayout";

const requestBackground = "images/Layouts/RequestBackground.png";
export default function RequestsPage() {
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
        <Typography variant="h4" mb={'20px'} fontWeight={'bold'}>בקשות לאימוץ</Typography>
        <RequestsList></RequestsList>
      </Box>
    </BackgroundLayout>
  )
}
