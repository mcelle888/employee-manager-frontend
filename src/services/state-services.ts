const baseUrl = "http://localhost:8080/states";

export interface State {
  id: number;
  state: string;
}

export const getAllStates = async (): Promise<State[]> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch states");
  }
  const data = await response.json();
  return data;
};
