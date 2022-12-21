import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import commentContext from '../../context/comment/commentContext';

const Comments = ({wid}) => {
    const cc = useContext(commentContext);
    const { comments, getComments } = cc;
    useEffect(() => {
        getComments();
    // eslint-disable-next-line
    }, [])
  return (
    <>  
        {comments.length > 0 ? <>
          {comments.map((comment) => {
            return <div key={comment._id}>
            {comment.work === wid ? 
            <span>{comment.comments}</span> : <></>}
            </div>
        })}
        </> : <></>}
    </>
  )
}

export default Comments
