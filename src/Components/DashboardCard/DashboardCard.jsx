import React from 'react'
import './DashboardCard.css'



const Card = ({data, color, classNam}) => {
    let keys = Object.keys(data)
  return (
    <div className={`card ${classNam}`}>
      <div className="card_title">
        <h2>{data.title}</h2> 
      </div>
      <div className="card_text">
        <div className='text_item'><span>{keys[1]}</span> <span style={{color: color}}>₹{data.today}</span></div>
        <div className='text_item'><span>{keys[2]}</span> <span style={{color: color}}>₹{data.week}</span></div>
        <div className='text_item'><span>{keys[3]}</span> <span style={{color: color}}>₹{data.month}</span></div>
      </div>
    </div>
  )
}

export default Card