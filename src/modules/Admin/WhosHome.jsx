import { Box } from "@mui/material";
import Dog from "./components/Dog";
import { useContext } from "react";
import { ShelterContext } from "../../context/ShelterContextProvider";

export default function WhosHome() {

  const {dogs} = useContext(ShelterContext);
  console.log('dogs', dogs);
  
  return (
    <Box display={"flex"} flexDirection={"row-reverse"} sx={{width:'90%', mx:'auto', mt:"120px"}}>
      <Box
            sx={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: "calc(20% / 3)",
              rowGap: "15px",
            }}
          >
            {dogs.map((d, i) => (
              <Dog key={d.numberId} dogItem={d}></Dog>
            ))}
          </Box>
    </Box>
  );
}
