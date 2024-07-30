import React, { useContext, useState, useRef } from "react";
import "./WorksPage.css";
import WorksCard from "../../Components/WorksCard/WorksCard";
import WorkForm from "../../Components/WorksForm/WorkForm";
import { WorksContext } from "../../Context/WorkContext";

const WorksPage = () => {
  const statusRef = useRef()
  const  = () => {
    e.cur
  }
  const {workList} = useContext(WorksContext)
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [status, setStatus] = useState("")
  const [addNewAdvance, setAddNewAdvance] = useState(0)
  const [showAdvanceBox, setShowAdvanceBox] = useState(true)
  const tableHeaders = [
    "S.No.",
    "Received",
    "Work",
    "Customer Name",
    "Status",
    "Add Advance",
    "Amount Received",
    "Last Updated",
  ];
  const statusList = [
    "Balance Pending",
    "Completed",
  ];
  const handleAddWorkBtn = () => {
    setShowWorkForm(!showWorkForm);
  };

  const settingDateFormat = (str) => {
    return str.toISOString().split("T")[0]
  }
  const date = new Date()

  const handleWorkUpdate = (workId) => {
    const workArray = workList.filter((item) => item.id === workId)
    const work = workArray[0]
    console.log(work,"work before updating")
    if(status || addNewAdvance){
      if(addNewAdvance && !status){
        const newAdvance = {
          amount: Number(addNewAdvance),
          date: settingDateFormat(date),
        }
        work.advance.push(newAdvance)
        work.updatedAt = settingDateFormat(date)
        work.received_amt = parseFloat(work.advance?.reduce((totalAmount, currentObject) => totalAmount + currentObject.amount, 0))
      }
      else if(status && !addNewAdvance){
        if(status == "Balance Pending"){
          work.isPending = false
          work.delivered = true
          work.isFitted = true
          work.updatedAt = settingDateFormat(date)
          setShowAdvanceBox(true)
        }
        else if(status == "Completed"){
          work.isPending = false
          work.delivered = true
          work.isFitted = true
          work.balancePending = false
          work.updatedAt = settingDateFormat(date)
          setShowAdvanceBox(false)
        }
      }
    }
    setAddNewAdvance(0)
    console.log(work, "work after updated")
  }
  return (
    <div className="worksPage">
      {console.log("From worksPage: ", workList)}
        {showWorkForm && <WorkForm setShowWorksForm={setShowWorkForm} worksForm={showWorkForm}/>}
        <div className="top">
          <h2>Works List</h2>
          <button onClick={handleAddWorkBtn}>Add Work</button>
        </div>
        <div className="middle">
          <WorksCard />
          <WorksCard worksHeading="Completed Works" worksNumbers="166" />
          <WorksCard worksHeading="All Works" worksNumbers="288" />
          <WorksCard
            worksHeading="Payment Receivables"
            worksNumbers="₹176,000"
          />
        </div>
        <div className="bottom">
          <div className="work_filters">
            <div className="worksFilter_left workFilterItem">
              <span>All Works</span>
              <span>Pending</span>
              <span>Unpaid</span>
              <span>Completed</span>
            </div>
            <div className="worksFilter_right workFilterItem">
              <input type="text" placeholder="Search here" />
            </div>
          </div>
          <div className="works_table">
            <table>
              <thead>
                <tr>
                  {tableHeaders.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                  {workList.reverse()?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.received_date}</td>
                      <td>{item.work_name}</td>
                      <td>{item.customer_name}</td>
                      <td><select value={status} onChange={(e) => setStatus(e.target.value)} name="status" id="status">
                      <option value="">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select></td>
                      {showAdvanceBox && <td> <input type="number" placeholder="Add advance" value={addNewAdvance} onChange={(e) => setAddNewAdvance(e.target.value)}/></td>}
                      <td>{item.received_amt}</td>
                      <td>{item.updatedAt}</td>
                      <td><button onClick={() => handleWorkUpdate(item.id)}>Update</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default WorksPage;
