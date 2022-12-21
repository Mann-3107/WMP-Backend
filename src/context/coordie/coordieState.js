import coordieContext from "./coordieContext";
import { useState } from "react";

const CoordieState = (props) => {
    const host = "http://localhost:8000"
    const [coordies, setCoordies] = useState([]);

    // Fetch All coordies
    const getCoordies = async () => {
        let url = `${host}/api/auth/cg/getcoordies`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setCoordies(json)
    }

    return (
        <coordieContext.Provider value={{ coordies, getCoordies}}>
            {props.children}
        </coordieContext.Provider>

    )
}

export default CoordieState;