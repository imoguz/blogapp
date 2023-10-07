import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail } from "../features/blogSlice";
import { useAuthContext } from "../context/authContext";
import { toastifySuccess, toastifyError } from "../helper/Toastify";

const useBlogs = () => {
  const baseURL = "https://33468.fullstack.clarusway.com";
  const dispatch = useDispatch();
  const { userData } = useAuthContext();
  const config = {
    headers: { Authorization: `Token ${userData.key}` },
  };

  // id parameter must be passed with "/", example: "3/"
  const getApiData = async (section, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(`${baseURL}/api/${section}/${id}`);
      dispatch(fetchSuccess({ section, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };

  const getUserBlogs = async (section, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(
        `${baseURL}/api/blogs/?author=${id}`,
        config
      );
      dispatch(fetchSuccess({ section, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };

  const getCurrentData = async (section, blogName, id) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios(`${baseURL}/api/${blogName}/${id}/`, config);
      dispatch(fetchSuccess({ section, data }));
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };

  const delBlog = async (id) => {
    dispatch(fetchStart());
    try {
      await axios.delete(`${baseURL}/api/blogs/${id}/`, config);
      toastifySuccess("The blog has been successfully deleted.");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };
  const updateBlog = async (id, formValues) => {
    dispatch(fetchStart());
    try {
      await axios.put(`${baseURL}/api/blogs/${id}/`, formValues, config);
      getApiData("blogs", "");
      getCurrentData("activeBlog", "blogs", id);
      toastifySuccess("The blog has been successfully updated.");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };
  const postBlogData = async (section, formValues) => {
    dispatch(fetchStart());
    try {
      await axios.post(`${baseURL}/api/${section}/`, formValues, config);
      toastifySuccess("New blog has been successfully created.");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };

  const postApiData = async (section, data, id) => {
    dispatch(fetchStart());
    try {
      await axios.post(`${baseURL}/api/${section}/${id}/`, data, config);
      getApiData("blogs", "");
      getUserBlogs("userBlogs", userData?.user?.id);
      getApiData("comments", id);
      getCurrentData("activeBlog", "blogs", id);
      section === "comments" &&
        toastifySuccess("Your comments has been successfully added.");
    } catch (error) {
      dispatch(fetchFail());
      toastifyError(error.message);
    }
  };

  return {
    getApiData,
    postApiData,
    postBlogData,
    getCurrentData,
    delBlog,
    updateBlog,
    getUserBlogs,
  };
};
export default useBlogs;
