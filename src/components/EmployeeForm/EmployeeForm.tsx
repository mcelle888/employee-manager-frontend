import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  employeeSchema,
  EmployeeFormValues,
} from "../../schemas/employeeSchema";
import { getAllStates, State } from "../../services/state-services";
import styles from "./EmployeeForm.module.scss";

interface EmployeeFormProps {
  mode: "Create" | "Edit";
  defaultValues?: EmployeeFormValues;
  onSubmit: (data: EmployeeFormValues) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  mode,
  defaultValues,
  onSubmit,
}) => {
  const [states, setStates] = useState<State[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const states = await getAllStates();
        setStates(states);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmployeeFormValues>({
    defaultValues,
    resolver: zodResolver(employeeSchema),
  });

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateId = parseInt(event.target.value, 10);
    const selectedState = states.find((state) => state.id === selectedStateId);

    if (selectedState) {
      setValue("address.state.id", selectedState.id);
      setValue("address.state.state", selectedState.state);
    }
  };

  const onSubmitHandler = (data: EmployeeFormValues) => {
    const processedData = {
      ...data,
      phone: Number(data.phone),
      address: {
        ...data.address,
        number: Number(data.address.number),
        postcode: Number(data.address.postcode),
        state: {
          ...data.address.state,
          id: Number(data.address.state.id),
        },
      },
    };
    onSubmit(processedData);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div>
          <h3>Personal Details</h3>
          <div className={styles.field}>
            <label>First Name</label>
            <input
              className={errors.f_name && styles.input_error}
              type="text"
              {...register("f_name")}
            />
            <small className={styles.error_text}>
              {errors?.f_name?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Last Name</label>
            <input
              className={errors.l_name && styles.input_error}
              type="text"
              {...register("l_name")}
            />
            <small className={styles.error_text}>
              {errors?.l_name?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              className={errors.email && styles.input_error}
              type="email"
              {...register("email")}
            />
            <small className={styles.error_text}>
              {errors?.email?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Phone</label>
            <input
              className={errors.phone && styles.input_error}
              type="text"
              {...register("phone")}
            />
            <small className={styles.error_text}>
              {errors?.phone?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Date of Birth</label>
            <input
              className={errors.dob && styles.input_error}
              type="date"
              {...register("dob")}
            />
            <small className={styles.error_text}>
              {errors?.dob?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Full Time</label>
            <input type="checkbox" {...register("fullTime")} />
          </div>

          <div className={styles.field}>
            <label>Permanent</label>
            <input type="checkbox" {...register("permanent")} />
          </div>

          <div className={styles.field}>
            <label>Date Started</label>
            <input
              className={errors.dateStarted && styles.input_error}
              type="date"
              {...register("dateStarted")}
            />
            <small className={styles.error_text}>
              {errors?.dateStarted?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Date Ended</label>
            <input
              className={errors.dateEnded && styles.input_error}
              type="date"
              {...register("dateEnded")}
            />
            <small className={styles.error_text}>
              {errors?.dateEnded?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Image Link</label>
            <input
              className={errors.imageLink && styles.input_error}
              type="text"
              {...register("imageLink")}
            />
            <small className={styles.error_text}>
              {errors?.imageLink?.message ?? "\u00A0"}
            </small>
          </div>
        </div>

        <div>
          <h3>Address</h3>
          <div className={styles.field}>
            <label>Number</label>
            <input
              className={errors.address?.number && styles.input_error}
              type="text"
              {...register("address.number")}
            />
            <small className={styles.error_text}>
              {errors.address?.number?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Address</label>
            <input
              className={errors.address?.address && styles.input_error}
              type="text"
              {...register("address.address")}
            />
            <small className={styles.error_text}>
              {errors.address?.address?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>Postcode</label>
            <input
              className={errors.address?.postcode && styles.input_error}
              type="text"
              {...register("address.postcode")}
            />
            <small className={styles.error_text}>
              {errors.address?.postcode?.message ?? "\u00A0"}
            </small>
          </div>

          <div className={styles.field}>
            <label>State</label>
            <select
              className={errors.address?.state?.id && styles.input_error}
              {...register("address.state.id")}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.state}
                </option>
              ))}
            </select>
            <small className={styles.error_text}>
              {errors.address?.state?.id?.message ?? "\u00A0"}
            </small>
          </div>
          <div className={styles.field}>
            <button className={styles.createButton}>{mode} Employee</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
