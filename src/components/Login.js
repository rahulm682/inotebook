import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

function Login(props) {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // Default options are marked with * and url should be stored in other file
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);

        // save the token received after successful login
        if (json.success) {
            localStorage.setItem("auth-token", json.authToken);
            navigate("/");
            props.showAlert("Login successful", "success");
        } else {
            navigate("/login");
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={onSubmit} className="my-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login