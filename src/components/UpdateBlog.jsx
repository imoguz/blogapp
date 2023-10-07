import { Box, Button, Grid, Typography } from "@mui/material";
import BlogForm from "./BlogForm";
import { useSelector } from "react-redux";

const UpdateBlog = ({ modalInfo, setOpen }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const { activeBlog } = useSelector((state) => state.blog);
  return (
    <Box sx={style} maxWidth="xs">
      <Typography component="h1" variant="h5" mb={2}>
        Update Blog
      </Typography>
      <BlogForm activeBlog={activeBlog} setOpen={setOpen} />
    </Box>
  );
};

export default UpdateBlog;
