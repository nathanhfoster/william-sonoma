const FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS"

const DEFAULT_STATE_PRODUCTS = {
  id: "",
  name: "",
  categoryType: "",
  groups: [],
  totalPages: 0,
  categories: []
}

const Products = (state = DEFAULT_STATE_PRODUCTS, action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_ALL_PRODUCTS:
      return { ...state, ...payload }
    default:
      return state
  }
}

export { FETCH_ALL_PRODUCTS, DEFAULT_STATE_PRODUCTS, Products }
