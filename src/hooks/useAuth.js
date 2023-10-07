import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toastifySuccess, toastifyError } from "../helper/Toastify";
const useAuth = () => {
  const baseURL = "https://33468.fullstack.clarusway.com";
  const { userData, setUserData } = useAuthContext();
  const navigate = useNavigate();

  const signin = async (formValue) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/users/auth/login/`,
        formValue
      );
      localStorage.setItem("userData", JSON.stringify(data));
      setUserData(JSON.parse(localStorage.getItem("userData")) || {});
      navigate("/");
      toastifySuccess("You have successfully logged in.");
    } catch (error) {
      toastifyError(
        "You have not successfully logged in. Check your login information."
      );
    }
  };

  const signup = async (formValue) => {
    try {
      const { data } = await axios.post(
        `${baseURL}/users/register/`,
        formValue
      );
      toastifySuccess("You have successfully registered.");
      setUserData(data);
      navigate("/login");
    } catch (error) {
      toastifyError(
        "You have not successfully registered. Check your login information."
      );
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${baseURL}/users/auth/logout/`);
      localStorage.removeItem("userData");
      setUserData({});
      toastifySuccess("You have successfully logged out.");
    } catch (error) {
      toastifySuccess("You have not successfully logged out.");
    }
  };

  const update = async (formValue, key) => {
    const config = {
      headers: { Authorization: `Token ${key}` },
    };
    try {
      await axios.put(`${baseURL}/users/auth/user/`, formValue, config);
      toastifySuccess(
        "User information successfully updated. You need to login again..."
      );
      logout();
      navigate("/login");
    } catch (error) {
      toastifyError(
        "User information can not be updated. Check your user information."
      );
    }
  };

  return { signin, signup, logout, update };
};

export default useAuth;
