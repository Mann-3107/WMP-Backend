import coordieContext from '../../context/coordie/coordieContext';
import venueContext from '../../context/venue/venueContext';
import portfolioContext from '../../context/portfolio/portfolioContext';
import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import CoordieWork from './CoordieWork';
import AddWorkModal from './AddWorkModal';

const Coordies = () => {
  const cc = useContext(coordieContext);
  const {coordies, getCoordies} = cc;
  const vc = useContext(venueContext);
  const {venues, getVenues} = vc;
  const pc = useContext(portfolioContext);
  const {portfolios, getPortfolios} = pc;
  

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')){
      getCoordies();
      getVenues();
      getPortfolios();
    } else {
      navigate('/cg/login');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className='container my-3'>
        <div className="row">
          <h1 className='col-6'>Your Coordies</h1>
          <div className="col-6">
            <button type="button" className="btn btn-primary col-6" data-bs-toggle="modal" data-bs-target="#exampleModal">Assign New Work</button>
            <AddWorkModal coordies={coordies} />
          </div>
        </div>
        <h3>Venues: </h3>
          <div className="accordion" id="venueAccordian">
            {venues.map((venue) => {
              return(
              <div key={venue._id} className="accordion-item">
                <h2 className="accordion-header" id={`heading${venue.number}`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${venue.number}`} aria-expanded="true" aria-controls={`collapse${venue.number}`}>
                    {venue.name}
                  </button>
                </h2>
                <div id={`collapse${venue.number}`} className="accordion-collapse collapse" aria-labelledby={`heading${venue.number}`} data-bs-parent="#venueAccordian">
                  <div className="accordion-body text-center text-primary">
                    {coordies.map((coordie) => {
                      return <div key={coordie._id} className="row border-3 border-primary">
                        <div className="col-4">
                          {venue._id === coordie.venue ? <span>{coordie.name}</span> : <></>}
                        </div>
                        <div className="col-8">
                          {venue._id === coordie.venue ? <CoordieWork cid={coordie._id} /> : <></>}
                        </div>
                          {venue._id === coordie.venue ? <hr className='mt-3'/> : <></>}
                        
                        </div>
                    })}
                  </div>
                </div>
              </div>
              )
            })}
        </div>
        <h3>Portfolios:</h3>
        <div className="accordion" id="venueAccordian">
            {portfolios.map((portfolio) => {
              return(
              <div key={portfolio._id} className="accordion-item">
                <h2 className="accordion-header" id={`heading${portfolio.number}`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${portfolio.number}`} aria-expanded="true" aria-controls={`collapse${portfolio.number}`}>
                    {portfolio.name}
                  </button>
                </h2>
                <div id={`collapse${portfolio.number}`} className="accordion-collapse collapse  " aria-labelledby={`heading${portfolio.number}`} data-bs-parent="#venueAccordian">
                  <div className="accordion-body text-center text-primary">
                    {coordies.map((coordie) => {
                      return <div key={coordie._id} className="row border-3 border-primary">
                        <div className="col-4">
                          {portfolio._id === coordie.portfolio ? <span>{coordie.name}</span> : <></>}
                        </div>
                        <div className="col-8">
                          {portfolio._id === coordie.portfolio ? <CoordieWork cid={coordie._id} /> : <></>}
                          
                        </div>
                         {portfolio._id === coordie.portfolio ? <hr className='mt-3'/> : <></>}
                        
                        </div>
                    })}
                  </div>
                </div>
              </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Coordies