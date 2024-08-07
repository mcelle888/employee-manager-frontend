import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "../../services/api-responses.interface";
import { EmployeeFormValues } from "../../schemas/employeeSchema";
import Modal from "../../containers/Modal/Modal";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import {
  updateEmployee as updateEmployeeService,
  deleteEmployee as deleteEmployeeService,
} from "../../services/employee-services";
import { RootState } from "../../store";
import { setEmployees } from "../../store/slices/employeeSlice";
import { toast } from "react-toastify";
import styles from "./EmployeeCard.module.scss";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employee.employees);

   const handleEditEmployee = async (data: EmployeeFormValues) => {
     try {
       const updatedEmployee = await updateEmployeeService(employee.id, {
         ...data,
         address: {
           ...data.address,
           id: employee.address.id,  
         },
         imageLink: data.imageLink || "",  
       });
       const updatedEmployees = employees.map((emp) =>
         emp.id === updatedEmployee.id ? updatedEmployee : emp
       );
       dispatch(setEmployees(updatedEmployees));
       toast.success("Employee updated successfully!", { autoClose: 2000 });
       setIsEditModalOpen(false);
     } catch (error) {
       console.error("Error updating employee:", error);
       toast.error("Error updating employee.", { autoClose: 2000 });
     }
   };

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployeeService(employee.id);
      const updatedEmployees = employees.filter(
        (emp) => emp.id !== employee.id
      );
      dispatch(setEmployees(updatedEmployees));
      toast.success("Employee deleted successfully!", { autoClose: 2000 });
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee.", { autoClose: 2000 });
    }
  };

  return (
    <div className={styles.employeeCard}>
      <img
        className={styles.profileImg}
        src={employee.imageLink}
        alt={`${employee.f_name} ${employee.l_name}`}
      />
      <h3>
        {employee.f_name} {employee.l_name}
      </h3>
      <div>
        <p>Email: {employee.email}</p>
        <p>Phone: {employee.phone}</p>
        <p>Date of Birth: {new Date(employee.dob).toLocaleDateString()}</p>
        <p>Full Time: {employee.fullTime ? "Yes" : "No"}</p>
        <p>Permanent: {employee.permanent ? "Yes" : "No"}</p>
        <p>
          Date Started: {new Date(employee.dateStarted).toLocaleDateString()}
        </p>
        {employee.dateEnded && (
          <p>Date Ended: {new Date(employee.dateEnded).toLocaleDateString()}</p>
        )}
        <div className="address">
          <h4>Address</h4>
          <p>
            {employee.address.number} {employee.address.address}
          </p>
          <p>
            {employee.address.postcode}, {employee.address.state.state}
          </p>
        </div>
      </div>
      <div className={styles.cardControls}>
        <button onClick={() => setIsEditModalOpen(true)}>Edit Employee</button>
        <button onClick={() => setIsDeleteModalOpen(true)}>
          Delete Employee
        </button>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        size="large"
      >
        <EmployeeForm
          mode="Edit"
          defaultValues={{
            ...employee,
            dob: new Date(employee.dob).toISOString().substring(0, 10),
            dateStarted: new Date(employee.dateStarted)
              .toISOString()
              .substring(0, 10),
            dateEnded: employee.dateEnded
              ? new Date(employee.dateEnded).toISOString().substring(0, 10)
              : null,
            address: {
              ...employee.address,
              state: {
                id: employee.address.state.id,
                state: employee.address.state.state,
              },
            },
          }}
          onSubmit={(data) => {
            handleEditEmployee(data);
          }}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        size="small"
      >
        <div>
          <p>Are you sure you want to delete this employee?</p>
          <button onClick={handleDeleteEmployee}>Yes</button>
          <button onClick={() => setIsDeleteModalOpen(false)}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default EmployeeCard;
