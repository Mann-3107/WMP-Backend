import workContext from "../context/work/workContext"
import React, { useContext, useEffect } from 'react'
import AddWork from "./AddWork";
import { useNavigate } from "react-router-dom";

const Works = () => {
    const context = useContext(workContext);
  const {works, getWorks} = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')){
        getWorks()
    } else {
        navigate('/login');
    }
    
    // eslint-disable-next-line
  }, []);

  return (
    <>
        <AddWork/>
      <div className="container my-3">
        <h2>Your Works</h2>
        
        {works.map((work) => {
          return work.description
        })}
      </div>
    </>
  )
}

export default Works
