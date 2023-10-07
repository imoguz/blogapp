import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../context/authContext";

const Footer = () => {
  const { darkMode } = useAuthContext();

  return (
    <Grid
      sx={{
        backgroundColor: darkMode ? "#272727" : "#1976D2",
        color: "white",
        py: 1,
        textAlign: "center",
        height: "4.5rem",
      }}
    >
      <Typography>Developed by Abdullah Oğuz</Typography>
      <Typography> Copyright © 2023</Typography>
    </Grid>
  );
};

export default Footer;
