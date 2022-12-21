import React from 'react'
import { useEffect, useState } from 'react'

const Comments = ({wid}) => {
  const host = "http://localhost:8000"
    const [comments, setComments] = useState([]);
  const getComments = async (wid) => {
    let url = `${host}/api/work/coordie/allupdates`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ work: wid })
    })
    const json = await response.json();
    setComments(json.reverse())
}
    useEffect(() => {
        getComments(wid);
    // eslint-disable-next-line
    }, [comments])
  return (
    <>  
        {comments.length > 0 ? <>
          {comments.map((comment) => {
            return <div key={comment._id}>
            {comment.work === wid ? 
            <span>{comment.comments}</span> : <></>}
            </div>
        })}
        </> : <span>No Comments</span>}
    </>
  )
}

export default Comments
