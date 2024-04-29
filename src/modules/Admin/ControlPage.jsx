import Cell from "../Admin/components/Cell";

import Cells from "../../Data/Cells";
import Dogs from "../../Data/Dogs";
import { Box, Grid, Typography } from "@mui/material";

// const Cells = [
//   {
//     "number": 1,
//     "capacity": 4,
//     "id": 0,
//     "shelterNumber": 1,
//     "dogs": 3,
//     "passDaily": 3
//   },
//   {
//     "number": 2,
//     "capacity": 5,
//     "id": 1,
//     "shelterNumber": 1,
//     "dogs": 5,
//     "passDaily": 3
//   },
//   {
//     "number": 3,
//     "capacity": 3,
//     "id": 2,
//     "shelterNumber": 1,
//     "dogs": 2,
//     "passDaily": 2
//   }
// ];

export default function ControlPage() {
  return (
    <Box display={"flex"} mt={"120px"} >
      <Box width={"36%"} display={"flex"}></Box>
      <Grid container width={"60%"} display={"flex"} rowSpacing={1}>
        <Grid item md={12} display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h5">הכלבייה שלנו</Typography>
          <Typography variant="h5">סה"כ כלבים: {Dogs.length}</Typography>
        </Grid>
        <Grid item md={12}>
          <Box
            sx={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row-reverse",
              gap: "calc(20% / 3)",
              rowGap: "15px",
            }}
          >
            {Cells.map((c, i) => (
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