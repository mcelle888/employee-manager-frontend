import { Employee } from './api-responses.interface';
import { EmployeeFormValues } from '../schemas/employeeSchema';

const baseUrl = "http://localhost:8080/employees";

// Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  const data = await response.json();
  return data;
};

// Get an employee by ID
export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${baseUrl}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employee');
  }
  const data = await response.json();
  return data;
};

// Create a new employee
export const createEmployee = async (employee: EmployeeFormValues): Promise<Employee> => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Failed to create employee');
  }
  const data = await response.json();
  return data;
};

// Update an employee
export const updateEmployee = async (id: number, employee: Partial<Employee>): Promise<Employee> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) {
    throw new Error('Failed to update employee');
  }
  const data = await response.json();
  return data;
};

// Delete an employee
export const deleteEmployee = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }
};
