import React, { useContext, useEffect, useState } from "react";
import { WorksContext } from "../../Context/WorkContext";

const WorkRow = ({
  index,
  receivedDate,
  workName,
  customerName,
  receivedAmount,
  updatedAt,
  workId,
  workStatus,
  workBalance,
}) => {
  const [addNewAdvance, setAddNewAdvance] = useState(0);
  const { workList } = useContext(WorksContext);
  const [status, setStatus] = useState("");
  const [showAdvanceBox, setShowAdvanceBox] = useState(true);

  const statusList = ["Balance Pending", "Completed"];

  const settingDateFormat = (str) => {
    return str.toISOString().split("T")[0];
  };
  const date = new Date();

  const handleWorkUpdate = (work_Id) => {
    const workArray = workList.filter((item) => item.id === workId);
    const work = workArray[0];
    console.log(work, "work before updating");
    if (status || addNewAdvance) {
      if (addNewAdvance && !status) {
        const newAdvance = {
          amount: Number(addNewAdvance),
          date: settingDateFormat(date),
        };
        work.advance.push(newAdvance);
        work.updatedAt = settingDateFormat(date);
        work.received_amt = parseFloat(
          work.advance?.reduce(
            (totalAmount, currentObject) => totalAmount + currentObject.amount,
            0
          )
        );
      } else if (status && !addNewAdvance) {
        if (status == "Balance Pending") {
          work.isPending = false;
          work.delivered = true;
          work.isFitted = true;
          work.updatedAt = settingDateFormat(date);
          setShowAdvanceBox(true);
        } else if (status == "Completed") {
          work.isPending = false;
          work.delivered = true;
          work.isFitted = true;
          work.balancePending = false;
          work.updatedAt = settingDateFormat(date);
          setShowAdvanceBox(false);
        }
      }
    }
    setAddNewAdvance(0);
    console.log(work, "work after updated");
  };

  const receivedAmountfn = (id) => {
    const workArray = workList.filter((item) => item.id === workId);
    const work = workArray[0];
    return work.received_amt;
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{receivedDate}</td>
      <td>{workName}</td>
      <td>{customerName}</td>
      <td>
        {(!workStatus && !workBalance) ? "Completed" : <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          name="status"
          id="status"
        >
          <option value="">set status</option>
          {statusList.map((item, index) => (
            <option
              value={item}
              key={index}
            >
              {item}
            </option>
          ))}
        </select>}
      </td>
        <td>
          {" "}
          <input
            disabled={!workStatus && !workBalance}
            type="number"
            placeholder="Add advance"
            value={addNewAdvance}
            onChange={(e) => setAddNewAdvance(e.target.value)}
          />
        </td>
      <td>{receivedAmountfn(workId)}</td>
      <td>{updatedAt}</td>
      <td>
        {(workStatus || workBalance) && (
          <button onClick={() => handleWorkUpdate(workId)}>Update</button>
        )}
      </td>
    </tr>
  );
};

export default WorkRow;
