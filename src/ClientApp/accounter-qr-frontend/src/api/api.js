import axios from "axios";

export function genBaseUrlApi() {
  return `http://localhost:8080`;
}

export function getThings() {
  return axios.get(`${genBaseUrlApi()}/get-all`);
}
