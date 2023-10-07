import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Detail from "../pages/Detail";
import NewBlog from "../pages/NewBlog";
import Register from "../pages/Register";
import About from "../pages/About";
import Profile from "../pages/Profile";
import MyBlogs from "../pages/MyBlogs";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route element={<PrivateRouter />}>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/newblog" element={<NewBlog />} />
        <Route path="profile" element={<Profile />} />
        <Route path="myBlogs" element={<MyBlogs />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default AppRouter;
