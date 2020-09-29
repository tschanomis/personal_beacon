import axios from "axios";

const LOCALURL = "http://localhost:8000/api";

export default function RequestAPI(method = "GET", url = "/", data = []) {
  return axios({
    method: method,
    url: LOCALURL + url,
    data: data,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + data.token
    }
  });
}
