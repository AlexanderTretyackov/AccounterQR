import axios from "axios";

export function genBaseUrlApi() {
  return `http://localhost:8080`;
}

export function getThings() {
  return axios.get(`${genBaseUrlApi()}/get-all`);
}

export function deleteThingById(thingId) {
  return axios.delete(`${genBaseUrlApi()}/delete?id=${thingId}`);
}

export function getThingQR(thingId) {
  return axios.get(`${genBaseUrlApi()}/get-object/qr?id=${thingId}`, {
    responseType: "blob",
  });
}

export function addNewThing(newThing) {
  return axios.post(`${genBaseUrlApi()}/add-object`, newThing);
}
