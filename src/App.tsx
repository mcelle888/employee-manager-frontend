import "./App.scss";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import LandingPage from "./pages/LandingPage/LandingPage";
import EmployeesPage from "./pages/EmployeePage/EmployeesPage";
import AddEmployeePage from "./pages/AddEmployeePage/AddEmployeePage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/add" element={<AddEmployeePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
