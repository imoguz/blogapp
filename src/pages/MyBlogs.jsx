import useBlogs from "../hooks/useBlogs";
import { useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Cards from "../components/Cards";
import { useAuthContext } from "../context/authContext";

function MyBlogs() {
  const { getApiData, getUserBlogs } = useBlogs();
  const { userBlogs } = useSelector((state) => state.blog);
  const {
    userData: {
      user: { id },
    },
  } = useAuthContext();
  useEffect(() => {
    getApiData("blogs", "");
    getApiData("categories", "");
    getUserBlogs("userBlogs", id);
  }, []);
  return (
    <Grid
      container
      spacing={3}
      mt={3}
      px={5}
      className="minheight"
      justifyContent="center"
    >
      <CssBaseline />

      {userBlogs?.map((item) => (
        <Grid item key={item.id}>
          <Cards item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
export default MyBlogs;
