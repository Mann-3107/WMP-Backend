import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react'
import workContext from '../../context/work/workContext';
import commentContext from '../../context/comment/commentContext';
import LastUpdate from './LastUpdate';

const CoordieWork = ({cid}) => {
    const wc = useContext(workContext);
    const {works, getWorksCg} = wc;
    const cc = useContext(commentContext);
    const {comments, getLastComment} = cc;
    useEffect(() => {
        getWorksCg(cid)
        
    // eslint-disable-next-line
    }, [works]);
    useEffect(() => {
        getLastComment(cid)
    // eslint-disable-next-line
    }, [comments]);
    
  return (
    <>
        {works.length === 0 ? <div>No work allotted</div> : <>
        {works.map((work) => {
            return  <>
            {work.coordie === cid ? <div key={work._id} className="row">
                <div className='col-6' style={{wordWrap: 'normal'}}>{work.description}</div>
                <div className="col-6">
                    <LastUpdate wid={work._id} />
                </div>
            </div> : <></>}
            </>
            
        })}
        </>
        }
    </>
  )
}

export default CoordieWork