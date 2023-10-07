import { Box, Button, Grid, Typography } from "@mui/material";
import useBlogs from "../hooks/useBlogs";
import { useNavigate } from "react-router-dom";

const DeleteBlog = ({ modalInfo, setOpen }) => {
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
  const { delBlog } = useBlogs();
  const navigate = useNavigate();
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Do you really want to delete your blog?{" "}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        This process cannot be undone!
      </Typography>
      <Grid
        item
        sx={{ display: "flex", gap: 5, mt: 3, justifyContent: "center" }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            delBlog(modalInfo.id);
            setOpen(false);
            navigate(-1);
          }}
        >
          Delete
        </Button>
      </Grid>
    </Box>
  );
};

export default DeleteBlog;
