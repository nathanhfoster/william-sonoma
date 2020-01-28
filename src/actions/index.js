import axios from "axios"

const { REACT_APP_API_URL } = process.env

const BASE_URL = REACT_APP_API_URL || "http://localhost:3000/"

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
