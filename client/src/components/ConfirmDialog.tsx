import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";

type ConfirmDialogProps = {
  confirm: boolean;
  onConfirm: (confirm: boolean) => void;
  onDelete: () => void;
};

export default function ConfirmDialog({
  confirm,
  onConfirm,
  onDelete,
}: ConfirmDialogProps) {
  const handleClose = () => {
    onConfirm(false);
  };

  const handleAgree = () => {
    onConfirm(false);
    onDelete();
  };

  return (
    <CustomDialog
      open={confirm}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <CustomDialogTitle id="alert-dialog-title">Xóa sản phẩm</CustomDialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bạn có chắc chắn xóa sản phẩm này?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonCancel onClick={handleClose}>Cancel</ButtonCancel>
        <ButtonOk onClick={handleAgree} autoFocus>
          OK
        </ButtonOk>
      </DialogActions>
    </CustomDialog>
  );
}

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 15,
    padding: theme.spacing(2),
    minWidth: 400,
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  color: theme.palette.primary.main,
}));

const ButtonOk = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 10,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 20px",
  "&:hover": {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    opacity: 0.9,
  },
}));

const ButtonCancel = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  color: "#fff",
  borderRadius: 10,
  height: 48,
  padding: "0 20px",
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
    opacity: 0.8,
  },
}));
