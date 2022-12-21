import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const host = "http://localhost:8000"
  const [departments, setDepartments] = useState([]);
  const getDepartments = async () => {
    let url = `${host}/api/auth/getdepartments`;
    const response = await fetch(url, {
        method: 'GET',
    })
    const json = await response.json();
    setDepartments(json)
}
const [credentials, setCredentials] = useState({ldap: "", password: "", name: "", department: ""});
    const navigate = useNavigate();
    useEffect(() => {
      getDepartments()
      // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("localhost:8000/api/auth/cg/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ ldap: credentials.ldap, password: credentials.password, name: credentials.name, department: credentials.department })
      })
      const json = await response.json();
      if(json.authtoken) {
        // save the athtoken and redirect
        localStorage.setItem('token', json.authtoken);
        navigate('/cg');
      } else {
        alert("Invalid Credentials");
      }
    }
    const onChange = (e) => {
      setCredentials({...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div>
        <h2>Signup to continue to Workforce Portal</h2>
        <form onSubmit={handleSubmit}>
          <div className="row my-2">
            <div className="col-3">
                  <label htmlFor="name" className="form-label">Name</label>
            </div>
            <div className="col-6">
                  <input type="text" className="form-control" value={credentials.name} id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row my-2">
            <div className="col-3">
                  <label htmlFor="ldap" className="form-label">Ldap</label>
            </div>
            <div className="col-6">
                  <input type="text" className="form-control" value={credentials.ldap} id="ldap" name="ldap" aria-describedby="emailHelp" onChange={onChange}/>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row my-2">
            <div className="col-3">
            <label htmlFor="password" className="form-label">Password</label>
            </div>
            <div className="col-6">
                <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onChange}/>
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row my-2">
            <div className="col-3">
            <label htmlFor="department" className="form-label">Department</label>
            </div>
            <div className="col-6">
            <select value={credentials.department} name="department" id="department" onChange={onChange}>
              <option>Select the department</option>
                {departments.map((department) => {
                    return <option key={department._id} value={department._id}>{department.name}</option>
                })}
            </select>
            </div>
            <div className="col-3"></div>
          </div>
            
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default Signup
