import axios from "axios";

export function genBaseUrlApi() {
  return `http://localhost:8080`;
}

export function getThings() {
  return axios.get(`${genBaseUrlApi()}/get-all`);
}

export function getThingQR(thingId) {
  return axios.get(`${genBaseUrlApi()}/get-object/qr?id=${thingId}`, {
    responseType: "blob",
  });
}
