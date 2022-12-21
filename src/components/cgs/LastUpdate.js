import React, {useState} from 'react'
import { useEffect } from 'react'

const LastUpdate = ({wid}) => {
  const host = "http://localhost:8000"
  const [comments, setComments] = useState([]);

    // Fetch latest comment for work
    const getLastComment = async ( wid ) => {
        let url = `${host}/api/work/cg/lastupdate`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ work: wid })
        })
        const json = await response.json();
        setComments(json)
    }
  useEffect(() => {
    getLastComment(wid)

    // eslint-disable-next-line
  }, [comments]);
  return (
    <>
      {comments._id === undefined ? <div key={101}>No Comments</div> : <>
        {comments.work === wid ? <div className='row'>
          <div className="col-12" style={{wordWrap: 'normal'}}>
          {comments.comments}
          </div>
          </div> : <></>}
      </>}
    </>
  )
}

export default LastUpdate
