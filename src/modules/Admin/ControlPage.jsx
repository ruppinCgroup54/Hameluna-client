import Cell from "../Admin/components/Cell";

import Dogs from "../../Data/Dogs";
import { Box, Grid, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";

export default function ControlPage() {

  const cells = useLoaderData();
  console.log('data', cells);

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
            {cells.map((c, i) => (
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
