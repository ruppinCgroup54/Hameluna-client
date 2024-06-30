import { Avatar, Box, Fade, Grid, Grow, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useState } from "react";
import useImageURL from "../../../utilis/useImageURL";
import { useNavigate } from "react-router-dom";
import DraggableDog from "../../../components/DraggableDog";
import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import DropableCell from "../../../components/DropableCell";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteFetch } from "../../../Data/Fetches";
import useShelterContext from "../../../utilis/useShelterContext";

export default function Cell({ cellItem }) {
  const {setTriggerFetch} = useShelterContext();
  const navigate = useNavigate();
  const dogs = cellItem.dogsInCell;
  const passDaily = 0;

  const { active } = useDraggable({
    id: '888',
    disabled: true
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteCell = (cellId) => {
    console.log('cellItem', cellItem)
    deleteFetch('Cells/', cellId, suc, err=>{});
  }

  const suc = () =>{
    setTriggerFetch(prev => prev + 1);
  }
  return (
    <>
      <DropableCell style={{ backgroundColor: 'white', width: "20%", borderRadius: "10px" }} cellId={cellItem.id} capacity={cellItem.capacity} dogsInCell={dogs.length}>
        <Box
          zIndex={open ? 1301 : 1}
          onClick={handleOpen}
          sx={{
            transform: "all 1s",
            position: 'relative',
            cursor: 'pointer',
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
            boxShadow: (theme) => theme.shadows[10]
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
            height: '100%'
          }}>
            {open && cellItem.dogsInCell.map((d, i) =>
              <DraggableDog key={d.numberId} dog={d}>
                <Box
                  sx={{
                    width: '7vw',
                    height: '7vw',
                    position: 'absolute',
                    top: '50%',
                    right: '50%',
                    transform: `translate(${(i + 1) * -125}%,-50%)`,
                  }}
                >
                  <Grow in={open} timeout={(i + 1) * 1000}>
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

              </DraggableDog>
            )}
            {open && dogs.length == 0 && <IconButton onClick={() => deleteCell(cellItem.id)}
              sx={{
                position: 'absolute',
                bottom: '-40px',
                left: '75px',
                color: 'red',
                scale: '1.3',
              }}
            >
              <DeleteForeverIcon fontSize="small" sx={{ '&:hover': { scale: '1.3' } }} />
            </IconButton>}
          </Box>



        </Box >
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiBackdrop-root": { bgcolor: 'rgba(255, 255, 255, 0.7)', height: active != null ? '0' : '100%', }
          }}
        >
          <Box></Box>
        </Modal>
      </DropableCell>
    </>
  );
}
