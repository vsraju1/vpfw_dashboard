import React from 'react'
import './OverallCard.css'

const OverallCard = ({day="Today",incomeTotal, expenseTotal}) => {
  return (
    <div>
        <div className="overAllFinance">
        <div className="title">
          <h4>Overall({day})</h4>
        </div>
        <div className="overAllContainer">
          <div className="overAllItem">
            <span>
              <b>Income: </b>
            </span>
            <span style={{fontSize: "1.2rem",color: "green", fontWeight: "600"}}>{incomeTotal}</span>
          </div>
          <div className="overAllItem">
            <span>
              <b>Expense: </b>
            </span>
            <span style={{fontSize: "1.2rem",color: "red", fontWeight: "600"}}>{expenseTotal}</span>
          </div>
          <div className="overAllItem">
            <span>
              <b>Balance: </b>
            </span>
            <span style={{color: `${incomeTotal - expenseTotal >= 0 ? 'green' : 'red'}`, fontWeight: "600", fontSize: "1.2rem"}}>{incomeTotal - expenseTotal}</span>
          </div>
        </div>
        {/* <div className="">feature soon</div> */}
      </div>
    </div>
  )
}

export default OverallCard;