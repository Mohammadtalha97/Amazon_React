import axios from "axios";
import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from "../Constant/products";

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      user: { userInfo },
    } = getState();
    console.log("token", userInfo.token);
    const { data } = await axios.delete(
      "http://localhost:5000/api/products/" + productId,
      {
        headers: { Authorization: "Bearer" + userInfo.token },
      }
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export default deleteProduct;
