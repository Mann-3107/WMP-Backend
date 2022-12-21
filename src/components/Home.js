import React from 'react'
import { Link } from 'react-router-dom';
// import Works from './Works';

export const Home = () => {
  
  return (
    <div className='container'>
      <div><Link to='/cg' className='btn btn-primary'>CG Page</Link></div>
      <div><Link to='/coordie' className='btn btn-primary'>Coordie Page</Link></div>
      {/* <Works/> */}
    </div>
  )
}
