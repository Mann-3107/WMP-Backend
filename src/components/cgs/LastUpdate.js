import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import commentContext from '../../context/comment/commentContext';

const LastUpdate = ({wid}) => {
  const cc = useContext(commentContext);
  const {comment, getLastComment} = cc;
  useEffect(() => {
    getLastComment(wid)
  }, []);
  return (
    <>
      {!comment ? <div>No Comment</div> : <>
        {comment.work === wid ? <span>{comment.comments}</span> : <></>}
        
      </>}
    </>
  )
}

export default LastUpdate
