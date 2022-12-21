import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Coordies from './Coordies';

const CgPage = () => {
  let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login")
    }
  return (
    <>
    {!localStorage.getItem('token')?
      <form className="d-flex" role="search">
          <Link to="/cg/login" className='btn btn-primary mx-1' role='button'>Login</Link>
          <Link to="/cg/signup" className='btn btn-primary mx-1' role='button'>Signup</Link>
        </form> : <Coordies/>}
    </>
  )
}

export default CgPage