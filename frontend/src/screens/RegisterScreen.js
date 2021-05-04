import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen(props) {
  //STATE DEFINITIONS (React)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //ESTABLISH REDIRECT FROM QUERY STRING IN URL BY CLICKING SIGNIN BUTTON
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  //get userinfo from app.js for useEffect
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  //DISPATCH (Redux)
  const dispatch = useDispatch();

  //define inside the function
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: signin action
    if(password !== confirmPassword){
      alert("Password and Password Confirm do not match")
    }else{
      dispatch(register(name, email, password));
    }
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
          <h1>Register New Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label forHTML="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>{" "}
          {/* html5 validation system */}
        </div>
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
          <label forHTML="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            placeholder="Re-enter password to confirm"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

//NOTE: e.preventDefault() - necessary because will use AJAX request to sign in user not refresh or post back to another page
