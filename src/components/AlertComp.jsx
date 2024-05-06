import PropTypes from "prop-types";

import { Alert, Snackbar } from '@mui/material'

export default function AlertComp({isOpen,handleClose,text,type="success",color="primary"}) {
  return (
    <Snackbar
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    open={isOpen}
    autoHideDuration={3000}
    onClose={handleClose}
  >
    <Alert
      onClose={handleClose}
      severity={type}
      color={color}
      sx={{ width: "100%" }}
    >
      {text}
    </Alert>
  </Snackbar>
  )
}

AlertComp.propTypes = {
  text:PropTypes.string,
  isOpen:PropTypes.bool,
  handleClose:PropTypes.func,
  type:PropTypes.oneOf(['error','info','success','warning'])
};
