import React from "react";
import "./WorksPage.css";
import WorksCard from "../../Components/WorksCard/WorksCard";

const WorksPage = () => {
  const tableHeaders = [
    "S.No.",
    "Received",
    "Customer Name",
    "Status",
    "Add Advance",
    "Total Received",
    "Last Updated",
  ];
  const statusList = ["Balance Pending", "Delivered", "Yet To Fit", "Completed"]
  return (
    <div className="worksPage">
      <div className="top">
        <h2>Works List</h2>
        <button>Add Work</button>
      </div>
      <div className="middle">
        <WorksCard />
        <WorksCard worksHeading="Completed Works" worksNumbers="166" />
        <WorksCard worksHeading="All Works" worksNumbers="288"/>
        <WorksCard worksHeading="Payment Receivables" worksNumbers="₹176,000"/>
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
            <input type="text" placeholder="Search here"/>
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
              <tr>
                <td>1</td>
                <td>25-07-2024</td>
                <td>kiran</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
              <tr>
                <td>2</td>
                <td>25-07-2024</td>
                <td>Tirupathi Reddy</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
              <tr>
                <td>3</td>
                <td>25-07-2024</td>
                <td>Srinivas</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
              <tr>
                <td>4</td>
                <td>25-07-2024</td>
                <td>Balvanth reddy</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
              <tr>
                <td>6</td>
                <td>25-07-2024</td>
                <td>Uttej</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
              <tr>
                <td>7</td>
                <td>25-07-2024</td>
                <td>Nagu</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
              <tr>
                <td>8</td>
                <td>25-07-2024</td>
                <td>Vijju reddy</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
              <tr>
                <td>9</td>
                <td>25-07-2024</td>
                <td>kiran</td>
                <td>
                  <select name="status" id="status">
                    <option value="pending">set status</option>
                    {statusList.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" placeholder="Add advance"/></td>
                <td>20,000</td>
                <td>27-07-2024</td>
                <td><button>Update</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorksPage;
