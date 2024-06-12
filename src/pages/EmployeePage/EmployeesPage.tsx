import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEmployees } from "../../store/slices/employeeSlice";
import { getAllEmployees } from "../../services/employee-services";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { Link } from "react-router-dom";
import styles from "./EmployeePage.module.scss"

const EmployeesPage: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        dispatch(setEmployees(data));
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, [dispatch]);

  return (
    <div className={styles.employeeContainer}>
      <h1>Employees</h1>
      <Link to="/add">
        <button>Add New Employee</button>
      </Link>
      <div className={styles.employeeList}>
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
