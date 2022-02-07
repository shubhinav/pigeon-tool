import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function CustomSnackbar({open, message, handleClose, color}) {

  return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
  );
}

// COLOR REFERENCE: success, info, warning, error