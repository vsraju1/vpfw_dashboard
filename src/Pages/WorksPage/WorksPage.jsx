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

  const [filteredWorks, setFilteredWorks] = useState(workList);
  useEffect(() => {
    setFilteredWorks(workList.filter((work) => work.status === "pending"));
  }, []);
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
  const handleFilter = (status) => {
    if (status) {
      const filtered = workList.filter((work) => work.status === status);
      setFilteredWorks(filtered);
      if (status === "pending") {
        setAllWorks(false);
        setPendingWorks(true);
        setUnPaidWorks(false);
        setCompletedWorks(false);
      } else if (status === "completed") {
        setAllWorks(false);
        setPendingWorks(false);
        setUnPaidWorks(false);
        setCompletedWorks(true);
      } else if (status === "balance pending") {
        setAllWorks(false);
        setPendingWorks(false);
        setUnPaidWorks(true);
        setCompletedWorks(false);
      }
    } else {
      setFilteredWorks(workList);
      setAllWorks(true);
      setPendingWorks(false);
      setUnPaidWorks(false);
      setCompletedWorks(false);
    }
  };

  const NumberOfPendingWorks = workList.filter(
    (item) => item.isPending === true
  );
  const NumberOfCompletedWorks = workList.filter(
    (item) => item.isPending === false && item.balancePending === false
  );

  const paymentReceivables = () => {
    const paymentPendingWorks = workList.filter(
      (item) => item.isPending === false && item.balancePending === true
    );

    const balanceAmounts = paymentPendingWorks.map((transaction) => {
      return transaction.final_amt - transaction.received_amt;
    });

    const totalPendingAmount = balanceAmounts.reduce(
      (sum, balance) => sum + balance,
      0
    );
    return totalPendingAmount;
  };
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
        <WorksCard worksNumbers={NumberOfPendingWorks.length} />
        <WorksCard
          worksHeading="Completed Works"
          worksNumbers={NumberOfCompletedWorks.length}
        />
        <WorksCard worksHeading="All Works" worksNumbers={workList.length} />
        <WorksCard
          worksHeading="Payment Receivables"
          worksNumbers={paymentReceivables()}
        />
      </div>
      <div className="bottom">
        <div className="work_filters">
          <div className="worksFilter_left workFilterItem">
            <span
              className={allWorks ? `active` : ""}
              onClick={() => handleFilter("")}
            >
              All Works
            </span>
            <span
              className={pendingWorks ? `active` : ""}
              onClick={() => handleFilter("pending")}
            >
              Pending
            </span>
            <span
              className={unPaidWorks ? `active` : ""}
              onClick={() => handleFilter("balance pending")}
            >
              Unpaid
            </span>
            <span
              className={completedWorks ? `active` : ""}
              onClick={() => handleFilter("completed")}
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
              {filteredWorks?.reverse().map((item, index) => (
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
                  workStatus={item.status}
                  advance={item.advance}
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
