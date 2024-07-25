import React from 'react'
import "./WorksCard.css"

const WorksCard = ({worksHeading="pending Works", worksNumbers="122"}) => {
  return (
    <div className='worksCard'>
        <h4>{worksHeading}</h4>
        <p>{worksNumbers}</p>
    </div>
  )
}

export default WorksCard