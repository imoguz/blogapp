import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "../assets/Avatar.png";
import { Box, CssBaseline, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function About() {
  return (
    <Box
      className="minheight"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <CssBaseline />

      <Card sx={{ height: 400, width: 400, mt: 5, p: 2 }}>
        <CardMedia
          component="img"
          sx={{ height: 160, objectFit: "contain" }}
          image={Avatar}
          title="Abdullah Oğuz"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5" align="center">
            Abdullah Oğuz
          </Typography>
          <Typography variant="body2" color="text.secondary">
            I am a Frontend Developer. For less than a year, I made a career
            change and focused on IT. I know HTML, CSS, Javascript, SASS,
            BootStrapt, React, Tailwind, Matarial UI tools well...
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <YouTubeIcon fontSize="large" className="hover" />
          <LinkedInIcon fontSize="large" className="hover" />
          <TwitterIcon fontSize="large" className="hover" />
          <InstagramIcon fontSize="large" className="hover" />
          <FacebookIcon fontSize="large" className="hover" />
        </CardActions>
      </Card>
    </Box>
  );
}
