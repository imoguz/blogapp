import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../context/authContext";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import UpdateUser from "../components/UpdateUser";
import { useState } from "react";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const {
    userData: {
      user: { bio, email, image, username },
    },
  } = useAuthContext();
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ pt: 4 }}
      className="minheight"
    >
      <CssBaseline />
      <Card sx={{ width: 345, p: 2 }}>
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: "contain" }}
          image={image || ""}
          title={username || ""}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {username || ""}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {email || ""}
          </Typography>
          <Typography variant="h5" align="center">
            {bio || ""}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpen(true)}
          >
            Update Account
          </Button>
        </CardActions>
      </Card>
      <UpdateUser open={open} setOpen={setOpen} />
    </Container>
  );
}
