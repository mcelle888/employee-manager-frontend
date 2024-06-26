import React from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/slices/employeeSlice";
import { createEmployee } from "../../services/employee-services";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { EmployeeFormValues } from "../../schemas/employeeSchema";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddEmployeePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddEmployee = async (data: EmployeeFormValues) => {
    try {
      const newEmployee = await createEmployee(data);
      dispatch(addEmployee(newEmployee));
      toast.success(
        <div>
          Employee created successfully!{" "}
          <Link to="/employees">View Employees</Link>
        </div>,
        { autoClose: 2000 }
      );
    } catch (error) {
      console.error("Error creating a new employee:", error);
      toast.error("Error creating employee.", { autoClose: 2000 });
    }
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <EmployeeForm mode="Create" onSubmit={handleAddEmployee} />
    </div>
  );
};

export default AddEmployeePage;
