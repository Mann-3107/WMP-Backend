import React from 'react'
import { Link } from 'react-router-dom';
import Coordies from './Coordies';

const CgPage = () => {
  return (
    <>
    {!localStorage.getItem('token')?
      <div className='container'>
        <Link to="/cg/login" className='btn btn-primary mx-1' role='button'>Login</Link>
          <Link to="/cg/signup" className='btn btn-primary mx-1' role='button'>Signup</Link>
      </div> : <Coordies/>}
    </>
  )
}

export default CgPage