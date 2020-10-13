import axios from "axios";
import {
  PRODUCTS_SAVE_FAIL,
  PRODUCTS_SAVE_REQUEST,
  PRODUCTS_SAVE_SUCCESS,
} from "../Constant/products";

const saveProducts = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCTS_SAVE_REQUEST, payload: product });
    const {
      user: { userInfo },
    } = getState();

    if (!product._id) {
      const { data } = await axios.post(
        "http://localhost:5000/api/products",
        product,
        {
          headers: { Authorization: "Bearer" + userInfo.token },
        }
      );
      dispatch({ type: PRODUCTS_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        "http://localhost:5000/api/products/" + product._id,
        product,
        {
          headers: { Authorization: "Bearer" + userInfo.token },
        }
      );
      dispatch({ type: PRODUCTS_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCTS_SAVE_FAIL, payload: error.message });
  }
};

export default saveProducts;
