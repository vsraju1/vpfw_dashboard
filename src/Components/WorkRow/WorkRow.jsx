import React, { useContext, useEffect, useState } from "react";
import { WorksContext } from "../../Context/WorkContext";

const WorkRow = ({
  index,
  receivedDate,
  workName,
  customerName,
  advance,
  updatedAt,
  workId,
  workStatus,
  workBalance,
}) => {
  const [addNewAdvance, setAddNewAdvance] = useState(0);
  const { workList, setWorkList } = useContext(WorksContext);
  const [status, setStatus] = useState("");
  const [showAdvanceBox, setShowAdvanceBox] = useState(true);

  const statusList = ["Balance Pending", "Completed"];

  const settingDateFormat = (str) => {
    return str.toISOString().split("T")[0];
  };
  const date = new Date();

  const handleWorkUpdate = (work_Id) => {
    if (status || addNewAdvance) {
      const updatedWorks = workList.map((work) => {
        if (work.id === work_Id) {
          if (status && addNewAdvance) {
            const newAdvance = {
              amount: Number(addNewAdvance),
              date: settingDateFormat(date),
            };
            if (status === "Completed") {
              return {
                ...work,
                balancePending: false,
                delivered: true,
                isFitted: true,
                isPending: false,
                status: "completed",
                advance:[...work.advance, newAdvance],
                updatedAt: settingDateFormat(date),
              };
            } else if (status === "Balance Pending") {
              return {
                ...work,
                balancePending: true,
                delivered: true,
                isFitted: true,
                isPending: false,
                status: "balance pending",
                advance: [...work.advance, newAdvance],
                updatedAt: settingDateFormat(date),
              };
            }
          } else if (status) {
            if (status === "Completed") {
              return {
                ...work,
                balancePending: false,
                delivered: true,
                isFitted: true,
                isPending: false,
                status: "completed",
                updatedAt: settingDateFormat(date),
              };
            } else if (status === "Balance Pending") {
              return {
                ...work,
                balancePending: true,
                delivered: true,
                isFitted: true,
                isPending: false,
                status: "balance pending",
                updatedAt: settingDateFormat(date),
              };
            }
          } else if (addNewAdvance) {
            const newAdvance = {
              amount: Number(addNewAdvance),
              date: settingDateFormat(date),
            };
            return {
              ...work,
              advance: [...work.advance, newAdvance],
              updatedAt: settingDateFormat(date),
            };
          }
        }
        return work;
      });
      setWorkList(updatedWorks)
    }
    setAddNewAdvance(0);
    setStatus("");
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{receivedDate}</td>
      <td>{workName}</td>
      <td>{customerName}</td>
      <td>
        {workStatus === "completed" ? (
          "Completed"
        ) : (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            name="status"
            id="status"
          >
            <option value="">set status</option>
            {statusList.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        )}
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
      <td>{advance?.reduce((totalAmount, currentObject) => totalAmount + currentObject.amount, 0)}</td>
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
