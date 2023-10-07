import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSuccess } from "../features/blogSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header() {
  const { userData, darkMode, setDarkMode } = useAuthContext();
  const pages = ["DASHBOARD", "NEW BLOG", "ABOUT"];
  const settings = userData?.key
    ? ["My Blogs", "Profile", "Logout"]
    : ["Login", "Guest"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (e) => {
    switch (e.target.innerText) {
      case "NEW BLOG":
        navigate("/newblog");
        break;

      case "ABOUT":
        navigate("/about");
        break;

      default:
        navigate("/");
        break;
    }
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    switch (e.target.innerText) {
      case "My Blogs":
        navigate("myBlogs");
        break;
      case "Profile":
        navigate("profile");
        break;
      case "Logout":
        logout();
        break;
      case "Login":
        navigate("login");
        break;
      case "Guest":
        {
          navigate("/");
          //hazırlanacak
        }
        break;
    }
  };
  const [data, setdata] = useState({
    searchValue: "",
    searchField: "author",
  });
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(fetchSuccess({ section: "search", data }));
  }, [data]);
  return (
    <>
      <AppBar position="fixed" sx={{ height: "4.5rem" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              src={logo}
              alt="Abdullah"
              className="logo"
              onClick={() => navigate("/")}
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" className="hover">
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  className="hover"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Search
                sx={{
                  mr: 0,
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  type="search"
                  className="search"
                  name="searchValue"
                  onChange={handleSearch}
                />
              </Search>

              <select
                className="hoverselect"
                style={{
                  fontFamily: "Roboto",
                  backgroundColor: "#144d87",
                  outline: "none",
                  border: "none",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  fontSize: "1rem",
                  color: "white",
                  padding: "0 5px",
                }}
                name="searchField"
                onChange={handleSearch}
              >
                <option style={{ borderRadius: "none" }} value="author">
                  Author
                </option>
                <option value="title">Title</option>
                <option value="content">Content</option>
              </select>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                gap: 3,
                pl: 3,
                alignItems: "center",
              }}
            >
              <Box
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  border: 2,
                  borderRadius: 2,
                  borderColor: "white",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {darkMode ? (
                  <Tooltip title="Open Dark Mode">
                    <DarkModeIcon
                      fontSize="medium"
                      sx={{
                        opacity: 0.8,
                        "&:hover": {
                          opacity: 1,
                          cursor: "pointer",
                        },
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Open Light Mode">
                    <LightModeIcon
                      fontSize="medium"
                      sx={{
                        opacity: 0.8,
                        "&:hover": {
                          opacity: 1,
                          cursor: "pointer",
                        },
                      }}
                    />
                  </Tooltip>
                )}
              </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userData?.user?.username}
                    src={userData?.user?.image}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" className="hover">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{ height: "4.5rem" }}></div>
    </>
  );
}
export default Header;
