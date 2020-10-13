import {
  PRODUCTS_SAVE_FAIL,
  PRODUCTS_SAVE_REQUEST,
  PRODUCTS_SAVE_SUCCESS,
} from "../Constant/products";

function productsSaveReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCTS_SAVE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCTS_SAVE_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      };
    case PRODUCTS_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default productsSaveReducer;
