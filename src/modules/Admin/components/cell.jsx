import { Box, Grid, Typography } from "@mui/material";

export default function Cell({ cellItem }) {
  const dogs = cellItem.dogs;
  const passDaily = cellItem.passDaily;

  return (
    // <Grid item display={{ xs: "none", md: "block" }} md={3}>
      <Box
        sx={{
          width:'20%',
          bgcolor: `${
            cellItem.dogs > cellItem.passDaily
              ? "rgba(240,22,22,0.2)"
              : "primary.main"
          }`,
          height: "160px",
          borderRadius: "10px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: `${cellItem.dogs > cellItem.passDaily ? "#000" : "#fff"}`,

        }}
      >
        <Typography sx={{ fontSize: "26px" }}>{cellItem.number}</Typography>
        <Typography sx={{ fontSize: "20px" }}>
          מס' כלבים {cellItem.dogs}/{cellItem.capacity}
          <br />
          סטטוס שגרה {cellItem.passDaily}/{cellItem.dogs}
        </Typography>
      </Box>
    // </Grid>
  );
}
