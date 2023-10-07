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
import { registerSchema } from "../helper/validation";
import { FormHelperText } from "@mui/material";

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword((show) => !show);
  const { signup } = useLogin();
  const { handleChange, handleSubmit, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        image: "",
        bio: "",
        password: "",
        password2: "",
      },
      validationSchema: registerSchema,
      onSubmit: (values) => {
        console.log(values);
        signup(values);
      },
    });

  return (
    <Container component="main" maxWidth="xs" className="">
      <CssBaseline />
      <Box
        sx={{
          pt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "350px",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <TextField
            required
            fullWidth
            id="username"
            label="User Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username ? errors.username : ""}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email ? errors.email : ""}
          />
          <TextField
            required
            fullWidth
            id="image"
            label="Image"
            type="url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.image}
            error={touched.image && Boolean(errors.image)}
            helperText={touched.image ? errors.image : ""}
          />
          <TextField
            required
            fullWidth
            id="bio"
            label="Bio"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bio}
            error={touched.bio && Boolean(errors.bio)}
            helperText={touched.bio ? errors.bio : ""}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id="password"
              type={showPassword ? "password" : "text"}
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
              label="password"
              name="password"
              error={touched.password && Boolean(errors.password)}
            />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {touched.password ? errors.password : ""}
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
            <OutlinedInput
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
              id="password2"
              type={showPassword ? "password" : "text"}
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
              label="Confirm Password"
              name="password2"
              error={touched.password2 && Boolean(errors.password2)}
            />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {touched.password2 ? errors.password2 : ""}
            </FormHelperText>
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign Up
          </Button>
          <Grid container mb={2}>
            <Grid item>
              <Link to="/login" className="link">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
