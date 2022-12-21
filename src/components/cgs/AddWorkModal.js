import React from 'react'
import { useContext, useState, useRef} from 'react';
import workContext from '../../context/work/workContext';

const AddCommentModal = ({coordies}) => {
    const refClose = useRef();
    const wc = useContext(workContext);
    const {addWork} = wc;
    const [work, setWork] = useState({coordie: "", description: ""});
    const handleClick = (e) => {
        e.preventDefault();
        addWork(work.description, work.coordie)
        alert("Work assigned successfully")
        setWork({coordie: "selection", description: ""})
        refClose.current.click();
    }
    const onChange = (e) => {
        setWork({...work, [e.target.name]: e.target.value})
    }
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Assign Work</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form action="">
                        <div className="row my-2">
                            <div className="col-5">
                                <label htmlFor="coordie">Coordie</label>
                            </div>
                            <div className="col-7">
                                <select value={work.coordie} name="coordie" id="coordie" onChange={onChange}>
                                    <option>Select the coordie</option>
                                    {coordies.map((coordie) => {
                                        return <option key={coordie._id} value={coordie._id}>{coordie.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-5">
                                <label htmlFor="description">Description</label>
                            </div>
                            <div className="col-7">
                                <input type="text" name='description' id='description' onChange={onChange} value={work.description} required/>
                            </div>
                        </div>
                        <button ref={refClose} type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                        <button disabled={work.description.length<=0 || work.coordie.length<=0} className="btn btn-primary mx-1" onClick={handleClick}>Assign Work</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCommentModal
