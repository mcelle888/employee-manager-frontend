import * as z from "zod";

export const employeeSchema = z.object({
  f_name: z.string().min(1, "First name is required"),
  l_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Phone number is required")
  ),
  dob: z.string().min(1, "Date of birth is required"),
  fullTime: z.boolean(),
  permanent: z.boolean(),
  dateStarted: z.string().min(1, "Date started is required"),
  dateEnded: z.string().nullable(),
  address: z.object({
    number: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Number is required")
    ),
    address: z.string().min(1, "Address is required"),
    postcode: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Postcode is required")
    ),
    state: z.object({
      id: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "State is required")
      ),
      state: z.string().min(1, "State name is required"),
    }),
  }),
  imageLink: z.string().nullable().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
