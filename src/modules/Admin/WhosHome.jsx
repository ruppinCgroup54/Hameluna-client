import { Box } from "@mui/material";
import Dog from "./components/Dog";

export default function WhosHome() {
  return (
    <Box display={"flex"} flexDirection={"row-reverse"} sx={{width:'90%', mx:'auto', mt:"120px"}}>
      <Dog />
    </Box>
  );
}
