import axios from "axios";
import Cookie from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from "../Constant/addToCart";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: "" });
    const { data } = await axios.get(
      "http://localhost:5000/api/products/" + productId
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    const {
      cart: { cartItems },
    } = getState();

    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    dispatch({ type: "", payload: error.message });
  }
};

export const saveShipping = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

export const savePayment = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
