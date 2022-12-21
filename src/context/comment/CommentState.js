import CommentContext from "./commentContext";
import { useState } from "react";

const CommentState = (props) => {
    const host = "http://localhost:8000"
    const [comments, setComments] = useState([]);

    // Fetch latest comment for work
    const getLastComment = async ( cid ) => {
        let url = `${host}/api/work/cg/lastupdate`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ coordie: cid })
        })
        const json = await response.json();
        setComments(json.reverse())
    }

    // Fetch all comments of a work
    const getComments = async () => {
        let url = `${host}/api/work/coordie/allupdates`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setComments(json.reverse())
    }

    // Add comment
    const addComment = async ( work_id, updates ) => {
        let url = `${host}/api/work/coordie/updatestatus`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ work: work_id, comments: updates })
        })
        const json = await response.json();
        setComments(comments.concat(json))
    }

    return (
        <CommentContext.Provider value={{comments, getLastComment, getComments, addComment}}>
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentState;