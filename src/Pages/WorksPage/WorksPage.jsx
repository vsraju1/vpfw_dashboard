import React, { useContext, useState } from "react";
import "./WorksPage.css";
import WorksCard from "../../Components/WorksCard/WorksCard";
import WorkForm from "../../Components/WorksForm/WorkForm";
import { WorksContext } from "../../Context/WorkContext";

const WorksPage = () => {
  const {workList} = useContext(WorksContext)
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [status, setStatus] = useState("")
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
  return (
    <div className="worksPage">
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
                      <td><select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select></td>
                      <td> <input type="number" placeholder="Add advance" /></td>
                      <td>{item.received_amt}</td>
                      <td>{item.updatedAt}</td>
                      <td><button>Update</button></td>
                    </tr>
                  ))}
                {/* <tr>
                  <td>2</td>
                  <td>25-07-2024</td>
                  <td>Tirupathi Reddy</td>
                  <td>
                    <select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Add advance" />
                  </td>
                  <td>20,000</td>
                  <td>27-07-2024</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>25-07-2024</td>
                  <td>Srinivas</td>
                  <td>
                    <select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Add advance" />
                  </td>
                  <td>20,000</td>
                  <td>27-07-2024</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>25-07-2024</td>
                  <td>Balvanth reddy</td>
                  <td>
                    <select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Add advance" />
                  </td>
                  <td>20,000</td>
                  <td>27-07-2024</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>25-07-2024</td>
                  <td>Uttej</td>
                  <td>
                    <select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Add advance" />
                  </td>
                  <td>20,000</td>
                  <td>27-07-2024</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>25-07-2024</td>
                  <td>Nagu</td>
                  <td>
                    <select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Add advance" />
                  </td>
                  <td>20,000</td>
                  <td>27-07-2024</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>25-07-2024</td>
                  <td>Vijju reddy</td>
                  <td>
                    <select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Add advance" />
                  </td>
                  <td>20,000</td>
                  <td>27-07-2024</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>25-07-2024</td>
                  <td>kiran</td>
                  <td>
                    <select name="status" id="status">
                      <option value="pending">set status</option>
                      {statusList.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="number" placeholder="Add advance" />
                  </td>
                  <td>20,000</td>
                  <td>27-07-2024</td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default WorksPage;
