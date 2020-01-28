import axios from "axios"

const BASE_URL = "http://localhost:3000/"

const base = {
  Accept: "application/json"
}

const baseHeaders = {
  ...base,
  "Cache-Control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded"
}

const Axios = (responseType = "json") =>
  axios.create({
    baseURL: BASE_URL,
    crossDomain: true,
    responseType,
    headers: baseHeaders
  })

export { Axios }
