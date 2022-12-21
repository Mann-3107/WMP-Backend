import coordieContext from '../../context/coordie/coordieContext';
import venueContext from '../../context/venue/venueContext';

import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CoordieWork from './CoordieWork';

const Coordies = () => {
  const cc = useContext(coordieContext);
  const {coordies, getCoordies} = cc;
  const vc = useContext(venueContext);
  const {venues, getVenues} = vc;
  

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')){
      getCoordies();
      getVenues();
    } else {
      navigate('/cg/login');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className='container my-3'>
        <h2>Your Coordies</h2>
          <div className="accordion" id="venueAccordian">
            {venues.map((venue) => {
              return(
              <div key={venue._id} className="accordion-item">
                <h2 className="accordion-header" id={`heading${venue.number}`}>
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${venue.number}`} aria-expanded="true" aria-controls={`collapse${venue.number}`}>
                    {venue.name}
                  </button>
                </h2>
                <div id={`collapse${venue.number}`} className="accordion-collapse collapse  " aria-labelledby={`heading${venue.number}`} data-bs-parent="#venueAccordian">
                  <div className="accordion-body text-center">
                    {coordies.map((coordie) => {
                      return <div key={coordie._id} className="row border-3 border-primary">
                        <div className="col-4">
                          {venue._id === coordie.venue ? <span>{coordie.name}</span> : <></>}
                        </div>
                        <div className="col-8">
                          {venue._id === coordie.venue ? <CoordieWork cid={coordie._id} /> : <></>}
                          
                        </div>
                        <hr className='mt-3'/>
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