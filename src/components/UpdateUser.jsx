import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateUser({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { update } = useAuth();
  const {
    userData: {
      key,
      user: { username, first_name, last_name },
    },
  } = useAuthContext();
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      username: username,
      first_name: first_name,
      last_name: last_name,
    },
    onSubmit: (values) => {
      update(values, key);
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography component="h1" variant="h5">
            Update User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              onChange={handleChange}
              value={values.username}
            />
            <TextField
              margin="normal"
              fullWidth
              id="first_name"
              label="First Name"
              onChange={handleChange}
              value={values.first_name}
            />
            <TextField
              margin="normal"
              fullWidth
              id="last_name"
              label="Last Name"
              onChange={handleChange}
              value={values.last_name}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
