import WorkContext from "./workContext";
import { useState } from "react";

const WorkState = (props) => {
    const host = "http://localhost:8000"
    const [works, setWorks] = useState([])

    // Add work functionality
    const addWork = async ( description, coordie ) => {
        let url = `${host}/api/work/cg/addwork`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({description, coordie})
        });
        const work = response.json();
        setWorks(works.concat(work))
    }

    // Fetch all works for coordie
    const getWorksCoordie = async () => {
        let url = `${host}/api/work/coordie/fetchallworks`
        const response = await fetch(url, {
            method: 'GET',
            headers:{
            'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setWorks(json)
    }

    // Fetch all works for cg
    const getWorksCg = async ( coordie_id ) => {
        let url = `${host}/api/work/cg/fetchallworks`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({coordie: coordie_id})
        })
        const json = await response.json();
        setWorks(json)
    }

    return (
        <WorkContext.Provider value={{works, addWork, getWorksCoordie, getWorksCg}}>
            {props.children}
        </WorkContext.Provider>
    )
}

export default WorkState;