import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import store from "./store";
import LandingPage from "./pages/LandingPage/LandingPage";
import EmployeesPage from "./pages/EmployeePage/EmployeesPage";
import AddEmployeePage from "./pages/AddEmployeePage/AddEmployeePage";
import NavBar from "./components/NavBar/NavBar";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/add" element={<AddEmployeePage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
