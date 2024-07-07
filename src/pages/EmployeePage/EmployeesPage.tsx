import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setEmployees } from "../../store/slices/employeeSlice";
import { getAllEmployees } from "../../services/employee-services";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import { Link } from "react-router-dom";
import styles from "./EmployeePage.module.scss";

const EmployeesPage: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.f_name} ${employee.l_name}`.toLowerCase();
    return (
      employee.f_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.l_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={styles.employeeContainer}>
      <header className={styles.employeeHeader}>
        <h1>Employees</h1>
        <div className={styles.employeeSubHeader}>
          <Link to="/add">
            <button>Add New Employee</button>
          </Link>
          <input
            type="text"
            placeholder="Search by first or last name"
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchBar}
          />
          &#128269;
        </div>
      </header>

      <div className={styles.employeeList}>
        {filteredEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
