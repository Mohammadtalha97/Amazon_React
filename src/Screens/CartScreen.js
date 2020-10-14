import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Redux/Actions/addToCart";
import { Link } from "react-router-dom";
import removeFromCart from "../Redux/Actions/removeFromCart";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const removeFromCartHandle = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="cart">
      <div className="cart_list">
        <ul className="cart_list_container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price </div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <div>
                <div className="cart_image">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cart_name">
                  <div>
                    <Link to={"/product/" + item.productId}>{item.name}</Link>
                  </div>
                  <div>
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <button
                      className="button"
                      type="button"
                      onClick={() => removeFromCartHandle(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cart_price">${item.price}</div>
              </div>
            ))
          )}
        </ul>
      </div>
      <div className="cart_action ">
        <h3>
          Subtotal({cartItems.reduce((a, c) => a + c.qty, 0)} items): ${" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkOutHandler}
          className="button primary full-width"
          disabled={cartItems.length === 0}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

export default CartScreen;
