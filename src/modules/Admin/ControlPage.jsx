import Cell from "../Admin/components/cell";

import { Box, Grid, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ShelterContext } from "../../context/ShelterContextProvider";
import useShelterContext from "../../utilis/useShelterContext";

export default function ControlPage() {

  const {cells, dogs} = useShelterContext();
  console.log('cells', cells)
  return (
    <Box display={"flex"} mt={"120px"} >
      <Box width={"36%"} display={"flex"}></Box>
      <Grid container width={"60%"} display={"flex"} rowSpacing={1}>
        <Grid item md={12} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5">הכלבייה שלנו</Typography>
          <Typography variant="h5">סה"כ כלבים: {dogs?.length}</Typography>
        </Grid>
        <Grid item md={12}>
          <Box
            sx={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              gap: "calc(20% / 3)",
              rowGap: "15px",
            }}
          >
            {cells?.value?.map((c, i) => (
              <Cell key={c.number} cellItem={c}></Cell>
            ))}
          </Box>
        </Grid>
        <Grid item md={12}>
          <Typography
            variant="h6"
            width={"100%"}
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            הוספת תא חדש +
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
