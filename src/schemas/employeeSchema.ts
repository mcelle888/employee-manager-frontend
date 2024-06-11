import * as z from 'zod';

export const employeeSchema = z.object({
  f_name: z.string().min(1, 'First name is required'),
  l_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  fullTime: z.boolean(),
  permanent: z.boolean(),
  dateStarted: z.string().min(1, 'Date started is required'),
  dateEnded: z.string().nullable(),  
  address: z.object({
    number: z.string().min(1, 'Number is required'),
    address: z.string().min(1, 'Address is required'),
    postcode: z.string().min(1, 'Postcode is required'),
    stateId: z.string().min(1, 'State ID is required'), 
  }),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
