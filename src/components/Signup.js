import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Signup(props) {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // Default options are marked with * and url should be stored in other file
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        // save the token received after successful registration
        if (!json.success) {
            navigate("/signup");
            props.showAlert("Registration not done", "danger");
        } else {
            localStorage.setItem("auth-token", json.authToken);
            navigate("/");
            props.showAlert("Registration successful", "success");
        }
    }

  return (
      <div className='container'>
          <h1>Sign Up</h1>
          <form onSubmit={onSubmit} className="my-3">
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" minLength={5} required />
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
  )
}

export default Signup