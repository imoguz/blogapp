import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuthContext } from "./context/authContext";

function App() {
  const { darkMode } = useAuthContext();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return (
    <Provider store={store}>
      <ToastContainer />
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Header />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
