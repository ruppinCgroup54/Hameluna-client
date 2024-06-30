import PropTypes from "prop-types";

import { Alert, Slide, Snackbar } from "@mui/material";

export default function AlertComp({
  isOpen,
  handleClose,
  text,
  type = "success",
  color = "primary",
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      sx={{width:'90%',right:0,left:'5%',top:"-10xp"}}
      // TransitionComponent={(p) => <Slide {...p} direction="right" />}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        color={color}
        sx={{ width: "100%",fontSize:'1.2em'}}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}

AlertComp.propTypes = {
  text: PropTypes.string,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  type: PropTypes.oneOf(["error", "info", "success", "warning"]),
};
