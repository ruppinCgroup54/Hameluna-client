import { Box, Grid, Typography } from "@mui/material";

export default function Cell({ cellItem }) {
  const dogs = cellItem.dogsInCell;
  const passDaily = 0;

  return (
    <Box
      sx={{
        width: "20%",
        bgcolor: `${
          dogs.length > passDaily ? "rgba(240,22,22,0.2)" : "primary.main"
        }`,
        height: "160px",
        borderRadius: "10px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: `${dogs.length > passDaily ? "#000" : "#fff"}`,
      }}
    >
      <Typography sx={{ fontSize: "26px" }}>{cellItem.number}</Typography>
      <Typography sx={{ fontSize: "20px" }}>
        מס' כלבים: {dogs.length}/{cellItem.capacity}
        <br />
        סטטוס שגרה: {passDaily}/{dogs.length}
      </Typography>
    </Box>
  );
}
