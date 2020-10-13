import { CART_REMOVE_ITEM } from "../Constant/addToCart";
import Cookie from "js-cookie";

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();

  Cookie.set("cartItems", JSON.stringify(cartItems));
};

export default removeFromCart;
