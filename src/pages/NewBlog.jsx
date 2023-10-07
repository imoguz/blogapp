import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import BlogForm from "../components/BlogForm";

export default function NewBlog() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="minheight"
      sx={{ p: 4 }}
    >
      <Paper elevation={5} sx={{ p: 3 }}>
        <CssBaseline />
        <Typography component="h1" variant="h5" mb={2} align="center">
          New Blog
        </Typography>
        <BlogForm />
      </Paper>
    </Container>
  );
}
