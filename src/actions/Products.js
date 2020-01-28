import { FETCH_ALL_PRODUCTS } from "../store/Reducers/Products"
import { Axios } from "."

const FetchAllProducts = () => dispatch =>
  Axios()
    .get(`Products.json`)
    .then(res => {
      const { data } = res
      dispatch({ type: FETCH_ALL_PRODUCTS, payload: data })
    })
    .catch(e => console.log(JSON.parse(JSON.stringify(e))))

export { FetchAllProducts }
