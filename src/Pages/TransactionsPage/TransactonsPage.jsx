import React, { useContext, useState } from "react";
import FinanceContext from "../../Context/FinanceContext";
import "./TransactionsPage.css";
import { CalculateRange } from "../../Hooks/usePagination";

const tableHeaderDate = [
  "id",
  "name",
  "type",
  "Sub type",
  "amount",
  "date",
  "time",
];
const TransactonsPage = () => {
  const srcdata = useContext(FinanceContext);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const pages = CalculateRange(srcdata.finance, rowsPerPage);
  const onNextPrevBtnClicked = (str) => {
    if (str === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (str === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const data = [...srcdata.finance].reverse().slice(startIndex, endIndex);

  // creating new array of income data from transactions data
  const incomeData = data.filter((item) => item.type === "income");
  // const incomeData = data.filter((item) => item.type === "income");

  // Total amount of income data
  const incomeTotal = incomeData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  // creating new array of expense data from transactions data
  const expenseData = data.filter((item) => item.type === "expense");
  // const expenseData = data.filter((item) => item.type === "expense");

  // Total amount of expense data
  const expenseTotal = expenseData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  // To capitalize strings
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Converting to INR
  const convetToINR = (num) => {
    const numToINRCurrency = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    });
    let formattedInCurrency;
    return (formattedInCurrency = numToINRCurrency.format(num));
  };
  return (
    <div className="transactions" id="transactions">
      <h2>All Transactions</h2>
      <div className="transaction_total">
        <div>
          <div className="total">
            <span>Total Income:</span>{" "}
            <span style={{ color: "green" }}>{convetToINR(incomeTotal)}</span>{" "}
          </div>
          <div className="total">
            <span>Total Expense:</span>{" "}
            <span style={{ color: "red" }}>{convetToINR(expenseTotal)}</span>{" "}
          </div>
          <div className="total">
            <span>Balance:</span>{" "}
            <span
              className={`${
                incomeTotal - expenseTotal >= 0
                  ? "transaction_green"
                  : "transaction_red"
              }`}
            >
              {convetToINR(incomeTotal - expenseTotal)}
            </span>{" "}
          </div>
        </div>
        <div className="transaction_page">
          Page: {currentPage} of {pages.length}
        </div>
        <div>
          <div className="transaction_DownloadBtn">
            <button>
              <select name="download" id="download">
              <option value="day">Download Txns</option>
                <option value="day">Today Txns</option>
                <option value="week">Week Txns</option>
                <option value="month">Month Txns</option>
                <option value="year">Year Txns</option>
                <option value="all">All Txns</option>
              </select>
            </button>
          </div>
          <div className="transaction_button">
          <button
            disabled={currentPage === 1}
            onClick={() => onNextPrevBtnClicked("prev")}
          >
            Prev
          </button>
          <button
            disabled={currentPage === pages.length}
            onClick={() => onNextPrevBtnClicked("next")}
          >
            Next
          </button>
          </div>
        </div>
      </div>
      <div>
        <table className="transaction_table">
          <thead>
            <tr>
              {tableHeaderDate.map((item, index) => (
                <th
                  className={`${index === 0 ? "transaction_id" : ""} ${
                    index === 2 ? "transaction_type" : ""
                  } ${index === 6 ? "transaction_time" : ""}`}
                  key={index}
                >
                  {item.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((transaction, index) => (
              <tr
                key={index}
                className={`${
                  transaction.type == "expense"
                    ? "transaction_red"
                    : "transaction_green"
                }`}
              >
                <td className="transaction_id">{index + 1}</td>
                <td>{capitalizeFirstLetter(transaction.name)}</td>
                <td className="transaction_type">
                  {capitalizeFirstLetter(transaction.type)}
                </td>
                <td>{capitalizeFirstLetter(transaction.categoryValue)}</td>
                <td className={`transaction_amount`}>
                  {convetToINR(transaction.amount)}
                </td>
                <td>{transaction.date}</td>
                <td className="transaction_time">{transaction.time}</td>
              </tr>
            ))}
            <tr>
              <td className="transaction_id"></td>
              <td></td>
              <td className="transaction_type"></td>
              <td style={{ fontSize: "1.4rem" }}>Balance</td>
              <td
                style={{ fontSize: "1.4rem" }}
                className={`${
                  incomeTotal - expenseTotal < 0
                    ? "transaction_red"
                    : "transaction_green"
                }`}
              >
                {convetToINR(incomeTotal - expenseTotal)}
              </td>
              <td></td>
              <td className="transaction_time"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactonsPage;
