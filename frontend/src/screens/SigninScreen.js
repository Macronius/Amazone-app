import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function SigninScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //define inside the function
    const submitHandler = (e)=> {
        e.preventDefault();                     //necessary because will use AJAX request to sign in user not refresh or post back to another page
        // TODO: signin action
    }


    return (
      <div>
        <form className="form" onSubmit={submitHandler}>
          <h1>Sign In</h1>
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
};