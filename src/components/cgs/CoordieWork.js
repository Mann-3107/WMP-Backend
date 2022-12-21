import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import workContext from '../../context/work/workContext';
import LastUpdate from './LastUpdate';

const CoordieWork = ({cid}) => {
    const wc = useContext(workContext);
    const {works, getWorksCg} = wc;
    useEffect(() => {
        getWorksCg(cid)
    }, []);
    console.log(works);
    
  return (
    <>
        {works.length === 0 ? <div>No work allotted</div> : <>
        {works.map((work) => {
            return <> 
            <div className="row">
                <div key={work._id} className='col-6'>{work.description}</div>
                <div className="col-6">
                    <LastUpdate wid={work._id} />
                </div>
                </div>
            </>
        })}
        </>
        }
    </>
  )
}

export default CoordieWork