import React, { useContext, useState } from 'react';
import workContext from '../../context/work/workContext';

const AddWork = () => {
    const context = useContext(workContext);
    const {addWork} = context;
    const [work, setWork] = useState({description: "", coordie: ""})
    const handleClick = (e) => {
        e.preventDefault();
        addWork(work.description, work.coordie)
        setWork({ description: "", coordie: "" })
    }
    const onChange = (e) => {
        setWork({...work, [e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Add Work</h2>
        <form action="">
            <div className="mb-3">
                <div className="form-floating mb-3">
                    <input type="email" readOnly className="form-control-plaintext" id="floatingPlaintextInput" value="CoordieID"/>
                    <label htmlFor="floatingPlaintextInput">Coordie</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" placeholder="Leave a comment here" value={work.description} id="description" name='description' onChange={onChange}></input>
                    <label htmlFor="floatingTextarea2">Description</label>
                </div>
                <button type='submit' className='btn btn-primary' onClick={handleClick}>Assign Work</button>
            </div>
        </form>
    </div>
  )
}

export default AddWork
