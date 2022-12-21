import CommentContext from "./commentContext";
import { useState } from "react";

const CommentState = (props) => {
    const host = "http://localhost:8000"
    const [comment, setComment] = useState({});

    // Fetch latest comment for work
    const getLastComment = async ( work_id ) => {
        let url = `${host}/api/work/cg/lastupdate`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ work: work_id })
        })
        const json = await response.json();
        setComment(json)
    }

    return (
        <CommentContext.Provider value={{comment, getLastComment}}>
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentState;