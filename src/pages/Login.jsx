import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import useLogin from "../hooks/useAuth";
import { loginSchema } from "../helper/validation";
import { FormHelperText } from "@mui/material";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword((show) => !show);
  const { signin } = useLogin();
  const { handleChange, handleSubmit, values, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        signin(values);
      },
    });

  return (
    <Container component="main" maxWidth="xs" className="minheight">
      <CssBaseline />
      <Box
        sx={{
          pt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email ? errors.email : ""}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              variant="TextField"
              value={values.password}
              onChange={handleChange}
              id="password"
              name="password"
              label="password"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClick}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {touched.password ? errors.password : ""}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" className="link">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
