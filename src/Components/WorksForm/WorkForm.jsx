import React, { useContext, useState } from "react";
import ".././Utility.css";
import "./WorkForm.css";
import { WorksContext } from "../../Context/WorkContext";

const WorkForm = ({setShowWorksForm, worksForm}) => {
  const {workList, setWorkList} = useContext(WorksContext)


  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [workName, setWorkName] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [advanceArray, setAdvanceArray] = useState([])
  const [finalAmount, setFinalAmount] = useState(0);

  const settingDateFormat = (str) => {
    return str.toISOString().split("T")[0]
  }
  const date = new Date()
  // const handleAdvanceAmount = (amt) => {
  //   const newAdvance = {
  //     amt,
  //     date
  //   }
  //   return setAdvanceAmount([...newAdvance])
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAdvance = {
      amount: Number(advanceAmount),
      date: settingDateFormat(date),
    }
    // Work order object
    const workOrder = {
      id: Number(`${date.getDate()}${
          date.getMonth() + 1
        }${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`),
      customer_name: customerName,
      phone: phone,
      work_name: workName,
      advance: [...advanceArray, newAdvance], // Empty array for advances
      final_amt: Number(finalAmount) || 0, // Default final amount
      received_date: settingDateFormat(date), // Today's date
      received_time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      received_amt: parseFloat(advanceArray?.reduce((totalAmount, currentObject) => totalAmount + currentObject.amount, 0)) + newAdvance.amount, // Total advances (initially 0)
      isPending: true, // Default status
      delivered: false, // Default status
      isFitted: false, // Default status
      balancePending: true, // Default status
      updatedAt: settingDateFormat(date), // Initial update date
    };
    // const totalIncomeAmount = filteredIncomeData?.reduce(
    //   (totalAmount, currentObject) => {
    //     return totalAmount + currentObject.amount;
    //   },
    //   0
    // );

    // Adding the work to work list
    setWorkList((prev) => [...prev, workOrder])

    // Add the work order to your work list array (workOrders)
    // You can handle this part based on your application's architecture
    setShowWorksForm(false)
    // Reset form fields if needed
  };

  console.log("New work order:", workList)
  return (
    <div className="workForm">
      <form onSubmit={handleSubmit}>
      <div className="close" onClick={() => setShowWorksForm(!worksForm)}>x</div>
        <h2>VPFW</h2>
        <div className="flex g-10">
          <label className="w-100">
            Customer Name:
            <input
              className="br-5"
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
          <label className="w-100">
            Phone Number:
            <input
              className="br-5"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="w-100">
          <label className="">
            Work Name:
            <input
              className="br-5"
              type="text"
              placeholder="Enter Work Name"
              value={workName}
              onChange={(e) => setWorkName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="flex g-10">
          <label>
            Advance Amount:
            <input
              className="br-5"
              type="number"
              placeholder="Initial Advance"
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
            />
          </label>
          <label>
            Final Amount:
            <input
              className="br-5"
              type="number"
              placeholder="Total Work Value"
              value={finalAmount}
              onChange={(e) => setFinalAmount(e.target.value)}
            />
          </label>
        </div>
        <button className="br-5 w-100" type="submit">
          Add Work
        </button>
      </form>
    </div>
  );
};

export default WorkForm;
