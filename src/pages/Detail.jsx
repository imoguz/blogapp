import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../components/Comments";
import useBlogs from "../hooks/useBlogs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAuthContext } from "../context/authContext";
import { useParams } from "react-router-dom";
import DetailModal from "../components/DetailModal";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
const Detail = () => {
  const { id } = useParams();
  const { userData } = useAuthContext();
  const [modalInfo, setModalInfo] = useState({ id, buttonName: "" });
  const [isComment, setIsComment] = useState(false);
  const [open, setOpen] = useState(false);
  const { postApiData, getCurrentData } = useBlogs();
  const handleFav = () => {
    postApiData("likes", {}, id);
    getCurrentData("activeBlog", "blogs", id);
  };

  useEffect(() => {
    getCurrentData("activeBlog", "blogs", id);
  }, []);
  const {
    activeBlog: {
      image,
      author,
      publish_date,
      likes_n,
      category_name,
      content,
      likes,
      comment_count,
      post_views,
    },
  } = useSelector((state) => state.blog);
  const date = new Date(publish_date).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const checkLike = likes_n?.some(
    (item) => item.user_id === userData?.user?.id
  );
  return (
    <Grid
      className="minheight"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Card sx={{ width: 600, p: 2, my: 2, boxShadow: 5 }}>
        <CardMedia
          component="img"
          alt="content image"
          height="200"
          image={image}
          sx={{ objectFit: "contain", mb: 2 }}
        />
        <CardContent>
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            <Avatar
              alt={author}
              src="/static/images/avatar/2.jpg"
              sx={{ bgcolor: "#1976D2" }}
            />
            <Grid item>
              <Typography variant="body2" color="text.primary">
                {author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {date}
              </Typography>
            </Grid>
          </Box>
          <Typography gutterBottom variant="h5" component="div">
            {category_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 4,
          }}
        >
          <Grid item sx={{ display: "flex", gap: 1 }}>
            <Box
              component="span"
              onClick={handleFav}
              className="hoverIcon"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 1 }}
            >
              <FavoriteIcon sx={{ color: checkLike && "red" }}></FavoriteIcon>
              <Typography variant="span" color="text.secondary" fontSize={16}>
                {likes}
              </Typography>
            </Box>
            <Box
              component="span"
              onClick={() => setIsComment(!isComment)}
              className="hoverIcon"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 1 }}
            >
              <CommentIcon />
              <Typography variant="span" color="text.secondary" fontSize={16}>
                {comment_count}
              </Typography>
            </Box>
            <Box
              component="span"
              className="hoverIcon"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, p: 1 }}
            >
              <VisibilityIcon />
              <Typography variant="span" color="text.secondary" fontSize={16}>
                {post_views}
              </Typography>
            </Box>
          </Grid>
          <DetailModal open={open} setOpen={setOpen} modalInfo={modalInfo} />
          {userData?.user?.username === author && (
            <Box
              component="span"
              mx="auto"
              sx={{
                display: "flex",
                gap: 4,
              }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<UpdateIcon />}
                onClick={() => {
                  setOpen(true);
                  modalInfo.buttonName = "update";
                }}
              >
                Update Blog
              </Button>

              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => {
                  setOpen(true);
                  modalInfo.buttonName = "delete";
                }}
              >
                Delete Blog
              </Button>
            </Box>
          )}
        </CardActions>
        {isComment && <Comments id={id} />}
      </Card>
    </Grid>
  );
};

export default Detail;
