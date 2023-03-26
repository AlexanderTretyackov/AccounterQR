import axios from "axios";

export function genBaseUrlApi() {
  return `http://localhost:5000`;
}

export async function getThings() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log(response.data);
}
