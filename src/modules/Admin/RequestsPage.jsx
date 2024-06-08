import { Box, Typography } from "@mui/material";
import RequestsList from "./components/RequestsList";

export default function RequestsPage() {
  return (
    <Box pt={'120px'} width={'90%'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin:'auto'
      }}>
      <Typography variant="h4" mb={'20px'}>בקשות לאימוץ</Typography>
      <RequestsList></RequestsList>
    </Box>
  )
}
