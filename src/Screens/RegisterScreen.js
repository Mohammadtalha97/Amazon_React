import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import register from "../Redux/Actions/register";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.user);
  const { loading, userInfo, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form__container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="Name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="RePassword">RePassword</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              onChange={(e) => setrePassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="button primary">
              Sign Up
            </button>
          </li>
          <li>
            Already Have An Account
            {/* <Link to="/signin">Sign Up</Link> */}
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
              className="button secondary text-center  "
            >
              Create Your Amazon Account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default RegisterScreen;
