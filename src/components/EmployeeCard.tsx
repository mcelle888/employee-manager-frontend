import React from "react";
import { Employee } from "../services/api-responses.interface";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="employee-card">
      <h3>
        {employee.f_name} {employee.l_name}
      </h3>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Date of Birth: {new Date(employee.dob).toLocaleDateString()}</p>
      <p>Full Time: {employee.fullTime ? "Yes" : "No"}</p>
      <p>Permanent: {employee.permanent ? "Yes" : "No"}</p>
      <p>Date Started: {new Date(employee.dateStarted).toLocaleDateString()}</p>
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
  );
};

export default EmployeeCard;
