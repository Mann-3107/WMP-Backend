import React, {useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import venueContext from '../../context/venue/venueContext';
import portfolioContext from '../../context/portfolio/portfolioContext';


const CoordieSignup = () => {
  const host = "http://localhost:8000"
  const vc = useContext(venueContext);
  const {venues, getVenues} = vc;
  const pc = useContext(portfolioContext);
  const {portfolios, getPortfolios} = pc;
  const [departments, setDepartments] = useState([]);
  const getDepartments = async () => {
    let url = `${host}/api/auth/getdepartments`;
    const response = await fetch(url, {
        method: 'GET',
    })
    const json = await response.json();
    setDepartments(json)
}
  const [credentials, setCredentials] = useState({ldap: "", password: "", name: "", department: "", allotment: ""});
    const navigate = useNavigate();
    useEffect(() => {
      getVenues()
      getPortfolios()
      getDepartments()
      // eslint-disable-next-line
    }, [])

    let allotedVenue = false;
    let allotedPortfolio = false;
    const checkVP = (id) => {
      
      
      venues.map((venue) => {
        if (venue._id === id) {
          allotedVenue = true;
        }
        return <></>
      })
      portfolios.map((portfolio) => {
        if (portfolio._id === id) {
          allotedPortfolio = true;
        }
        return <></>
      })
    }


    let json = []
    const handleSubmit = async (e) => {
        e.preventDefault();
        checkVP(credentials.allotment)
        
        
        if (allotedVenue) {
          const response = await fetch("http://localhost:8000/api/auth/coordie/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ldap: credentials.ldap, password: credentials.password, name: credentials.name, department: credentials.department, venue: credentials.allotment })
          });
          json = await response.json();
        } else if (allotedPortfolio) {
          const response = await fetch("http://localhost:8000/api/auth/coordie/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ldap: credentials.ldap, password: credentials.password, name: credentials.name, department: credentials.department, portfolio: credentials.allotment })
          });
          json = await response.json();
        } else {
          json = []
        }
        
        if(json.authtoken){
            // save the authtoken and redirect
            localStorage.setItem('token', json.authtoken);
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
          <div className="row my-1">
            <div className="col-3">
            <label htmlFor="allotment" className="form-label">Allotment</label>
            </div>
            <div className="col-6">
            <select value={credentials.allotment} name="allotment" id="allotment" onChange={onChange}>
              <option>Select the allotment</option>
              <optgroup label='Venues'>
              {venues.map((venue) => {
                    return <option key={venue._id} value={venue._id}>{venue.name}</option>
                })}
              </optgroup>
              <optgroup label='Portfolios'>
              {portfolios.map((portfolio) => {
                    return <option key={portfolio._id} value={portfolio._id}>{portfolio.name}</option>
                })}
              </optgroup>
                
            </select>
            </div>
            <div className="col-3"></div>
          </div>
            
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
  )
}

export default CoordieSignup
