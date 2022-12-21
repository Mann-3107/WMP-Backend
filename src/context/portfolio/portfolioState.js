import portfolioContext from "./portfolioContext";
import { useState } from "react";

const PortfolioState = (props) => {
    const host = "http://localhost:8000"
    const [portfolios, setPortfolios] = useState([]);

    // Fetch All coordies
    const getPortfolios = async () => {
        let url = `${host}/api/auth/getportfolios`;
        const response = await fetch(url, {
            method: 'GET',
        })
        const json = await response.json();
        setPortfolios(json)
    }

    return (
        <portfolioContext.Provider value={{portfolios, getPortfolios}}>
            {props.children}
        </portfolioContext.Provider>

    )
}

export default PortfolioState;