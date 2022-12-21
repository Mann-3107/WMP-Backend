import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CoordieLogin = () => {
    const [credentials, setCredentials] = useState({ldap: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/coordie/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ldap: credentials.ldap, password: credentials.password })
        });
        const json = await response.json();
        console.log(json.authtoken);
        if(json.authtoken){
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            console.log(localStorage.getItem('token'));
            navigate('/coordie');
        } else {
            alert("Invalid Credentials");
        }
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div>
        <h2>Login to continue to Workforce Portal</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="ldap" className="form-label">Ldap</label>
                <input type="text" className="form-control" value={credentials.ldap} id="ldap" name="ldap" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default CoordieLogin
