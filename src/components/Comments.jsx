import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import useBlogs from "../hooks/useBlogs";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Comments({ id }) {
  const { postApiData, getApiData } = useBlogs();
  const [newComment, setNewComment] = useState({ content: "", post: "1" });
  const handleChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postApiData("comments", newComment, id);
    setNewComment({ content: "", post: "1" });
  };
  useEffect(() => {
    getApiData("comments", id);
  }, []);
  const { comments } = useSelector((state) => state.blog);
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Typography
          variant="h5"
          pl={9}
          color="text.primary"
          sx={{ textShadow: "0px 0px 3px #ff8585" }}
        >
          Comments...
        </Typography>
        {comments?.map((item) => (
          <div key={item?.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={item?.user}
                  src="..."
                  sx={{ bgcolor: "crimson" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item?.user}
                secondary={
                  <React.Fragment>
                    <Typography color="text.primary" fontSize={14}>
                      {new Date(item?.time_stamp).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                      })}
                    </Typography>
                    <Typography color="text.secondary">
                      {item?.content}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      <Box component="form" onSubmit={handleSubmit} px={5}>
        <TextField
          id="content"
          label="Your comments"
          required
          fullWidth
          multiline
          rows={3}
          onChange={handleChange}
          value={newComment.content}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ my: 3 }}>
          Add Comment
        </Button>
      </Box>
    </>
  );
}
