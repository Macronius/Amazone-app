import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  //STATE DEFINITIONS (React)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //ESTABLISH REDIRECT FROM QUERY STRING IN URL BY CLICKING SIGNIN BUTTON
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  //get userinfo from app.js for useEffect
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  //DISPATCH (Redux)
  const dispatch = useDispatch();

  //define inside the function
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: signin action
    dispatch(signin(email, password));
    //NOTE: userInfo is initially null, after above line runs, userInfo will contain value
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label forHTML="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>{" "}
          {/* html5 validation system */}
        </div>
        <div>
          <label forHTML="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

//NOTE: e.preventDefault() - necessary because will use AJAX request to sign in user not refresh or post back to another page
