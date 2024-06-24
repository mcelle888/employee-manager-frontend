export interface Employee {
  id: number;
  f_name: string;
  l_name: string;
  email: string;
  phone: number;
  dob: string;
  fullTime: boolean;
  permanent: boolean;
  dateStarted: string;
  dateEnded: string | null;
  address: Address;
  imageLink: string;
}

export interface Address {
  id: number;
  number: number;
  address: string;
  postcode: number;
  state: State;
}

export interface State {
  id: number;
  state: string;
}
