import useBlogs from "../hooks/useBlogs";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../components/Cards";
import CssBaseline from "@mui/material/CssBaseline";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { fetchSuccess } from "../features/blogSlice";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

function Dashboard() {
  const [radioValue, setRadioValue] = useState("publish_date");
  const [sortDirection, setSortDirection] = useState(false);
  const { getApiData } = useBlogs();
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    getApiData("blogs", "");
    getApiData("categories", "");
  }, []);

  const sortFn = () => {
    const data = [...blogs];
    data.sort((a, b) => {
      if (radioValue === "publish_date") {
        return sortDirection
          ? new Date(b.publish_date) - new Date(a.publish_date)
          : new Date(a.publish_date) - new Date(b.publish_date);
      } else {
        return sortDirection
          ? b[radioValue] - a[radioValue]
          : a[radioValue] - b[radioValue];
      }
    });
    dispatch(fetchSuccess({ section: "blogs", data }));
  };
  useEffect(() => {
    sortFn();
  }, [radioValue, sortDirection]);

  return (
    <Box>
      <Grid item>
        <FormControl
          onChange={(e) => setRadioValue(e.target.value)}
          sx={{
            display: "flex",
            position: "fixed",
            width: "100%",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 3,
            backgroundColor: "#87c2fd",
          }}
        >
          <FormLabel id="radio-buttons">Sort by :</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons"
            name="row-radio-buttons-group"
            defaultValue="publish_date"
          >
            <FormControlLabel
              value="publish_date"
              control={<Radio />}
              label="Date"
            />
            <FormControlLabel value="likes" control={<Radio />} label="Likes" />
            <FormControlLabel
              value="comment_count"
              control={<Radio />}
              label="Comments"
            />
            <FormControlLabel
              value="post_views"
              control={<Radio />}
              label="Views"
            />
          </RadioGroup>
          <Button
            onClick={() => {
              setSortDirection(!sortDirection);
            }}
            variant="text"
            startIcon={sortDirection ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {sortDirection ? "Ascending" : "Descending"}
          </Button>
        </FormControl>
        <div style={{ height: "2.6rem" }}></div>
      </Grid>
      <Grid
        container
        justifyContent="center"
        p={4}
        sx={{ gap: 3 }}
        className="minheight"
      >
        <CssBaseline />
        {blogs?.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </Grid>
    </Box>
  );
}
export default Dashboard;
