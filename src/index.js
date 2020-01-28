import "./index.css"
import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import LoadingScreen from "./components/LoadingScreen"
import storeFactory from "./store"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
const App = lazy(() => import("./App"))

const { NODE_ENV } = process.env

const initialState = {}
const ReduxStore = storeFactory(initialState)

ReactDOM.render(
  <Provider store={ReduxStore}>
    <Suspense fallback={<LoadingScreen />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
)

if (NODE_ENV === "development") {
  serviceWorker.unregister()
} else {
  serviceWorker.register()
}
