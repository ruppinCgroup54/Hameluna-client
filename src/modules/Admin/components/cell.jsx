import { Avatar, Box, Fade, Grid, Grow, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useImageURL from "../../../utilis/useImageURL";
import { useNavigate } from "react-router-dom";

export default function Cell({ cellItem }) {
  const navigate = useNavigate();
  const dogs = cellItem.dogsInCell;
  const passDaily = 0;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        zIndex={open ? 1301 : 1}
        onClick={handleOpen}
        sx={{
          transform:"all 1s",
          position: 'relative',
          cursor: 'pointer',
          width: "20%",
          //maxWidth:'185px',
          bgcolor: `${dogs.length > passDaily ? "rgba(240,22,22,0.2)" : "primary.main"
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
        <Box sx={{
          position: 'absolute',
          width: '100%',
          visibility:'',
          visibility: open ? 'visible' : 'collapse'
        }}>
          {cellItem.dogsInCell.map((d, i) =>
            <Box
              key={d.NumberId}
              sx={{
                width: '7vw',
                height: '7vw',
                position: 'absolute',
                top: '50%',
                right: '50%',
                transform: `translate(${(i + 1) * -125}%,-50%)`
              }}
            >
              <Grow in={open} timeout={(i+1)*1000}>
                <Box>
                  <Avatar
                    onClick={() => navigate('/admin/shelter/whosHome/dogProfile', { state: { dog: d } })}
                    sx={{
                      width: '7vw',
                      height: '7vw',
                    }}
                    src={useImageURL(d.profileImage)}
                  ></Avatar>
                  <Typography variant="h6" fontWeight={'bold'}>{d.name}</Typography>
                </Box>
              </Grow>
            </Box>
          )}
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiBackdrop-root": {bgcolor: 'rgba(255, 255, 255, 0.7)'} }}
      >
        <Box></Box>
      </Modal>
    </>
  );
}
