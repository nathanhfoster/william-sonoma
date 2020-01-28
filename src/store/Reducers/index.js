import { combineReducers } from "redux"
import { DEFAULT_STATE_PRODUCTS, Products } from "./Products"

const RootReducer = combineReducers({
  Products,
})

export {
  RootReducer,
  DEFAULT_STATE_PRODUCTS,
}
