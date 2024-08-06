import { Alert, Snackbar } from "@mui/material";
import { useFlash } from "src/contexts/flash";
 // Đảm bảo bạn đã import đúng đường dẫn

const Flash = () => {
  const { flash, setFlash, message, severity } = useFlash();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setFlash(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={flash}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Flash;
