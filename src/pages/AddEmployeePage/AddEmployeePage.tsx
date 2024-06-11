import React from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../store/slices/employeeSlice";
import { createEmployee } from "../../services/employee-services";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import { EmployeeFormValues } from "../../schemas/employeeSchema";

const AddEmployeePage: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddEmployee = async (data: EmployeeFormValues) => {
    try {
      const newEmployee = await createEmployee(data);


      dispatch(addEmployee(newEmployee));

      alert("Employee created successfully!");
    } catch (error) {
      console.error("Error creating a new employee:", error);
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
