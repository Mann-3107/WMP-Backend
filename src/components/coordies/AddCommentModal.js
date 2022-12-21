import React from 'react'
import { useContext, useState, useRef} from 'react';
import commentContext from '../../context/comment/commentContext';

const AddWorkModal = ({works}) => {
    const refClose = useRef();
    const cc = useContext(commentContext);
    const {addComment} = cc;
    const [comment, setComment] = useState({work: "", updates: ""});
    const handleClick = (e) => {
        e.preventDefault();
        addComment(comment.work, comment.updates)
        alert("Comment added successfully")
        setComment({work: "selection", updates: ""})
        refClose.current.click();
    }
    const onChange = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
    }
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Add comments</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form action="">
                        <div className="row my-2">
                            <div className="col-5">
                                <label htmlFor="work">Work</label>
                            </div>
                            <div className="col-7">
                                <select value={comment.work} name="work" id="work" onChange={onChange}>
                                    <option>Select the work</option>
                                    {works.map((work) => {
                                        return <option key={work._id} value={work._id}>{work.description}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-5">
                                <label htmlFor="updates">Comment</label>
                            </div>
                            <div className="col-7">
                                <input type="text" name='updates' id='updates' onChange={onChange} value={comment.updates} required/>
                            </div>
                        </div>
                        <button ref={refClose} type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Close</button>
                        <button disabled={comment.work.length<=0 || comment.updates.length<=0} className="btn btn-primary mx-1" onClick={handleClick}>Add comment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddWorkModal
