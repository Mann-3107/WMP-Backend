import React from 'react'
import { Link } from 'react-router-dom';
import Works from './Works';

const CoordiePage = () => {
  return (
    <>
    {!localStorage.getItem('token')?
      <form className="d-flex" role="search">
          <Link to="/coordie/login" className='btn btn-primary mx-1' role='button'>Login</Link>
          <Link to="/coordie/signup" className='btn btn-primary mx-1' role='button'>Signup</Link>
        </form> : <Works/>}
    </>
  )
}

export default CoordiePage