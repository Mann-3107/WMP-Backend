import React, {useContext, useEffect} from 'react'
import workContext from '../../context/work/workContext';
import { useNavigate } from 'react-router-dom';
import AddCommentModal from './AddCommentModal';
import Comments from './Comments';

const Works = () => {
    const wc = useContext(workContext);
    const {works, getWorksCoordie} = wc;
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')){
            getWorksCoordie();
        } else {
            navigate('/coordie/login');
        }
        // eslint-disable-next-line
    }, [works]);
  return (
    <div className='container my-3'>
        <div className="row">
            <h1 className='col-6'>Your Works</h1>
            <button type="button" className="btn btn-primary col-6" data-bs-toggle="modal" data-bs-target="#exampleModal">Add new Work Update Comment</button>
            <AddCommentModal works={works} />
        </div>
        {works.map((work) => {
            return (
                <div key={work._id} className="row my-2">
                    <div className="col-4">
                        <h5>{work.description}</h5>
                    </div>
                    <div className="col-8" style={{ wordWrap:'normal' }}>
                        <Comments wid={work._id}/>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Works