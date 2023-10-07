import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box, Grid } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import useBlogs from "../hooks/useBlogs";
import { useSelector } from "react-redux";

export default function Cards({ item }) {
  const { userData } = useAuthContext();
  const navigate = useNavigate();
  const { postApiData } = useBlogs();
  const date = new Date(item.publish_date).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const handleFav = () => {
    userData?.key ? postApiData("likes", {}, item.id) : navigate("/login");
  };
  const checkLike = item.likes_n.some(
    (item) => item.user_id === userData?.user?.id
  );
  const { search } = useSelector((state) => state.blog);
  if (search.searchValue.trim() !== "") {
    if (
      !item[search.searchField]
        .toLowerCase()
        .includes(search.searchValue.toLowerCase())
    )
      return;
  }
  return (
    <Card
      sx={{
        width: 310,
        height: 420,
        px: 1,
        py: 2,
        boxShadow: 10,
        borderRadius: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 150, objectFit: "contain" }}
        image={item?.image}
        title={item?.author}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" align="center">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.primary" className="overflow">
          {item.content}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          {date}
        </Typography>
        <Box
          color="text.secondary"
          mt={2}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 0.5,
            boxShadow: 2,
            width: "min-content",
            px: 1,
            py: 0.3,
          }}
        >
          <AccountBoxIcon sx={{ color: "crimson" }} />
          <Typography variant="body2" color="text.primary">
            {item.author}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          dispaly: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid sx={{ display: "flex", width: 165 }}>
          <Box
            component="span"
            className="hoverIcon"
            onClick={handleFav}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              p: 1,
            }}
          >
            <FavoriteIcon
              sx={{
                color: checkLike && "red",
              }}
            />
            <Typography variant="span" color="text.secondary" fontSize={16}>
              {item.likes}
            </Typography>
          </Box>
          <Box
            component="span"
            className="hoverIcon"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              p: 1,
            }}
          >
            <CommentIcon />
            <Typography variant="span" color="text.secondary" fontSize={16}>
              {item.comment_count}
            </Typography>
          </Box>
          <Box
            component="span"
            className="hoverIcon"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              p: 1,
            }}
          >
            <VisibilityIcon />
            <Typography variant="span" color="text.secondary" fontSize={16}>
              {item.post_views}
            </Typography>
          </Box>
        </Grid>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}
