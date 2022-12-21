import venueContext from "./venueContext";
import { useState } from "react";

const VenueState = (props) => {
    const host = "http://localhost:8000"
    const [venues, setVenues] = useState([]);

    // Fetch All coordies
    const getVenues = async () => {
        let url = `${host}/api/auth/getvenues`;
        const response = await fetch(url, {
            method: 'GET',
        })
        const json = await response.json();
        setVenues(json)
    }

    return (
        <venueContext.Provider value={{venues, getVenues}}>
            {props.children}
        </venueContext.Provider>

    )
}

export default VenueState;