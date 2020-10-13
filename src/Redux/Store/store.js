import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import addToCartReducer from "../Reducers/addToCartReducer";
import productDetailsReducer from "../Reducers/productDetailReducer";
import productListReducer from "../Reducers/productreducer";
import userLoginReducer from "../Reducers/user";
import userRegisterReducer from "../Reducers/register";
import productsSaveReducer from "../Reducers/productsSave";
import productDeleteReducer from "../Reducers/productDelete";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialstate = {
  cart: { cartItems },
  user: { userInfo },
};

console.log("initialState", initialstate);
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: addToCartReducer,
  user: userLoginReducer,
  userRegister: userRegisterReducer,
  productSave: productsSaveReducer,
  productDelete: productDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialstate,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
