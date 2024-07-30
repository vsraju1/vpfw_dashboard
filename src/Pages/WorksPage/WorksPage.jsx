import React, { useContext, useEffect, useState } from "react";
import "./WorksPage.css";
import WorksCard from "../../Components/WorksCard/WorksCard";
import WorkForm from "../../Components/WorksForm/WorkForm";
import WorkRow from "../../Components/WorkRow/WorkRow";
import { WorksContext } from "../../Context/WorkContext";

const WorksPage = () => {
  const [showWorkForm, setShowWorkForm] = useState(false);
  const { workList } = useContext(WorksContext);
  const [allWorks, setAllWorks] = useState(false);
  const [pendingWorks, setPendingWorks] = useState(true);
  const [unPaidWorks, setUnPaidWorks] = useState(false);
  const [completedWorks, setCompletedWorks] = useState(false);

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

 

  
  // let worksData = workList;
  const handleAllWorksFilter = () => {
    setAllWorks(true);
    setPendingWorks(false);
    setUnPaidWorks(false);
    setCompletedWorks(false);
  };
  const handlePendingFilter = () => {
    setAllWorks(false);
    setPendingWorks(true);
    setUnPaidWorks(false);
    setCompletedWorks(false);
  };
  const handleUnPaidFilter = () => {
    setAllWorks(false);
    setPendingWorks(false);
    setUnPaidWorks(true);
    setCompletedWorks(false);
  };
  const handleCompletedFilter = () => {
    setAllWorks(false);
    setPendingWorks(false);
    setUnPaidWorks(false);
    setCompletedWorks(true);
  };
  let worksData;
  console.log(worksData, "From outsite if");
  if (allWorks && !pendingWorks && !unPaidWorks && !completedWorks) {
    worksData = workList;
    console.log("all works main data: ", worksData);
  }
  if (pendingWorks && !allWorks && !unPaidWorks && !completedWorks) {
    worksData = workList.filter((item) => item.isPending === true);
    // tableHeaders.splice(tableHeaders.indexOf("Status"), 1)
  }
  if (unPaidWorks && !pendingWorks && !allWorks && !completedWorks) {
    worksData = workList.filter(
      (item) => item.balancePending === true && item.isPending === false
    );
  }
  if (completedWorks && !pendingWorks && !unPaidWorks && !allWorks) {
    worksData = workList.filter((item) => item.isPending === false && item.balancePending === false);
  }


  const handleAddWorkBtn = () => {
    setShowWorkForm(!showWorkForm);
  };

  return (
    <div className="worksPage">
      {console.log("From worksPage: ", workList)}
      {showWorkForm && (
        <WorkForm setShowWorksForm={setShowWorkForm} worksForm={showWorkForm} />
      )}
      <div className="top">
        <h2>Works List</h2>
        <button onClick={handleAddWorkBtn}>Add Work</button>
      </div>
      <div className="middle">
        <WorksCard />
        <WorksCard worksHeading="Completed Works" worksNumbers="166" />
        <WorksCard worksHeading="All Works" worksNumbers="288" />
        <WorksCard worksHeading="Payment Receivables" worksNumbers="₹176,000" />
      </div>
      <div className="bottom">
        <div className="work_filters">
          <div className="worksFilter_left workFilterItem">
            <span
              className={allWorks ? `active` : ""}
              onClick={handleAllWorksFilter}
            >
              All Works
            </span>
            <span
              className={pendingWorks ? `active` : ""}
              onClick={handlePendingFilter}
            >
              Pending
            </span>
            <span
              className={unPaidWorks ? `active` : ""}
              onClick={handleUnPaidFilter}
            >
              Unpaid
            </span>
            <span
              className={completedWorks ? `active` : ""}
              onClick={handleCompletedFilter}
            >
              Completed
            </span>
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
              {worksData?.reverse().map((item, index) => (
                <WorkRow
                  key={index}
                  index={index}
                  receivedDate={item.received_date}
                  workName={item.work_name}
                  customerName={item.customer_name}
                  receivedAmount={item.received_amt}
                  updatedAt={item.updatedAt}
                  workId={item.id}
                  workBalance={item.balancePending}
                  workStatus={item.isPending}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorksPage;
