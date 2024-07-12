import React, { useContext, useState } from "react";
import "./FinanceDetails.css";
import FinanceContext from "../../Context/FinanceContext";
import OverallCard from "../OverallCard/OverallCard";

const FinanceCard = ({ day, incomeData, expenseData }) => {
  const today = new Date();
  const dataOfTodayOrWeekOrMonth = (arr) => {
    if (day == "this month") {
      const startingDayOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const filteredDayOrWeekOrMonthData = arr.filter((item) => {
        const transactionDate = new Date(item.date);
        return (
          transactionDate >= startingDayOfThisMonth && transactionDate <= today
        );
      });
      return filteredDayOrWeekOrMonthData;
    } else if (day == "this week") {
      const dayOfWeek = today.getDay();
      const startingDayOfThisWeek = new Date();
      startingDayOfThisWeek.setDate(today.getDate() - dayOfWeek);
      const filteredDayOrWeekOrMonthData = arr.filter((item) => {
        const transactionDate = new Date(item.date);
        return (
          transactionDate >= startingDayOfThisWeek && transactionDate <= today
        );
      });
      return filteredDayOrWeekOrMonthData;
    } else if (day == "today") {
      const filteredDayOrWeekOrMonthData = arr.filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      });
      return filteredDayOrWeekOrMonthData;
    }
  };

  const filteredIncomeData = dataOfTodayOrWeekOrMonth(incomeData);
  const filteredExpenseData = dataOfTodayOrWeekOrMonth(expenseData);

  // Totaling amount from income filtered data
  const totalIncomeAmount = filteredIncomeData?.reduce(
    (totalAmount, currentObject) => {
      return totalAmount + currentObject.amount;
    },
    0
  );

  // Totaling amount from expense filtered data
  const totalExpenseAmount = filteredExpenseData?.reduce(
    (totalAmount, currentObject) => {
      return totalAmount + currentObject.amount;
    },
    0
  );

  const categoryFn = (arr) => {
    const fnArray = arr?.map((obj) => {
      const { categoryValue, amount } = obj;
      const newObject = { categoryValue, amount };
      return newObject;
    });
    const mergedAmounts = (arr2 = []) => {
      const mergedObj = {};
      for (const obj of arr2) {
        const { categoryValue, amount } = obj;
        if (mergedObj[categoryValue]) {
          mergedObj[categoryValue].amount += amount;
        } else {
          mergedObj[categoryValue] = { categoryValue, amount };
        }
      }

      return Object.values(mergedObj);
    };
    const finalArray = mergedAmounts(fnArray);
    return finalArray;
  };

  const income_details = categoryFn(filteredIncomeData);

  const expense_details = categoryFn(filteredExpenseData);

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
    <>
      <div className="finance_card">
        <div className={`financeCard_item`}>
          <div className="finance_title">
            <h3>Expense({day})</h3>
          </div>
          {expense_details?.map((item, index) => (
            <div key={index} className="finance_text">
              <div>
                <b>{item.categoryValue}: </b>
              </div>
              <div>
                <p style={{ fontSize: "1.2rem", color: "red" }}>
                  {convetToINR(item.amount)}
                </p>
              </div>
            </div>
          ))}
          <div className="finance_text">
            <div>
              <b>total: </b>
            </div>
            <div>
              <p style={{ fontSize: "1.2rem", color: "red" }}>
                {totalExpenseAmount ? convetToINR(totalExpenseAmount) : 0}
              </p>
            </div>
          </div>
        </div>
        <div className={`financeCard_item`}>
          <div className="finance_title">
            <h3>Income({day})</h3>
          </div>
          {income_details?.map((item, index) => (
            <div key={index} className="finance_text">
              <div>
                <b>{item.categoryValue}: </b>
              </div>
              <div>
                <p style={{ fontSize: "1.2rem", color: "green" }}>
                  {convetToINR(item.amount)}
                </p>
              </div>
            </div>
          ))}
          <div className="finance_text">
            <div>
              <b style={{ color: "green" }}>total: </b>
            </div>
            <div>
              <p style={{ fontSize: "1.2rem", color: "green" }}>
                {totalExpenseAmount ? convetToINR(totalIncomeAmount) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <OverallCard
        day={day}
        incomeTotal={totalIncomeAmount}
        expenseTotal={totalExpenseAmount}
      />
    </>
  );
};

const FinanceDetails = () => {
  // Getting data from global state
  const data = useContext(FinanceContext);

  // creating new array of income data from transactions data
  const incomeData = data.finance.filter((item) => item.type === "income");

  // Total amount of income data
  const incomeTotal = incomeData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  // creating new array of expense data from transactions data
  const expenseData = data.finance.filter((item) => item.type === "expense");

  // Total amount of expense data
  const expenseTotal = expenseData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  // Formatting parameter num to INR currency
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
    <div className="finance_details">
      <h2 style={{color: `${incomeTotal - expenseTotal >= 0 ? 'green' : 'red'}`, fontWeight: "600", fontSize: "2rem", marginTop: "20px"}}>Balance: {convetToINR(incomeTotal - expenseTotal)}</h2>
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="today"
          incomeData={incomeData}
          expenseData={expenseData}
        />
      </div>
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="this week"
          incomeData={incomeData}
          expenseData={expenseData}
        />
      </div>
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="this month"
          incomeData={incomeData}
          expenseData={expenseData}
        />
      </div>
    </div>
  );
};

export default FinanceDetails;
