import React, { useContext, useState } from "react";
import "./FinanceDetails.css";
import FinanceContext from "../../Context/FinanceContext";
import OverallCard from "../FinanceCard/OverallCard";

// const expenseCategory = [
//   "material",
//   "salary",
//   "paint",
//   "general expenses",
//   "intrest",
//   "repayment",
//   "advance return",
// ];

// const incomeCategory = ["advance", "completion", "borrowed"];

const FinanceCard = ({ title, day, position, dayArray }) => {
  // Totaling amount from dayarray(income or expense) data
  const totalAmount = dayArray?.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

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
    // return fnArray;
  };
  // categoryFn(title, dayArray)
  const array_details = categoryFn(dayArray);

  const today = new Date()
  const dataOfTodayOrWeekOrMonth = () => {
    if(day == 'this month'){
      // const dayOfWeek = today.getDay()
      const startingDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 2)
      // startingDayOfThisWeek.setDate(today.getDate() - dayOfWeek)
      const filteredDayOrWeekOrMonthData = array_details.filter(item => {
        const transactionDate = new Date(item.date)
        return transactionDate >= startingDayOfThisMonth && transactionDate <= today
      })
      return filteredDayOrWeekOrMonthData;
    }
    else if(day == 'this week'){
      const dayOfWeek = today.getDay()
      // const startingDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 2)
      const startingDayOfThisWeek = new Date()
      startingDayOfThisWeek.setDate(today.getDate() - dayOfWeek)
      const filteredDayOrWeekOrMonthData = array_details.filter(item => {
        const transactionDate = new Date(item.date)
        return transactionDate >= startingDayOfThisWeek && transactionDate <= today
      })
      return filteredDayOrWeekOrMonthData;
    }
    else {
      let filteredDayOrWeekOrMonthData;
      return filteredDayOrWeekOrMonthData = array_details
    }
  }

  const filteredDayOrWeekOrMonthData = dataOfTodayOrWeekOrMonth()

  return (
    <>
      <div className={position}>
        <div className="finance_title">
          <h3>
            {title}({day})
          </h3>
        </div>
        {console.log(array_details, "this is array details")}
        {filteredDayOrWeekOrMonthData?.map((item, index) => (
          <div key={index} className="finance_text">
            <div>
              <b>{item.categoryValue}: </b>
            </div>
            <div>
              <p style={{ fontSize: "1.2rem" }}>{item.amount}</p>
            </div>
          </div>
        ))}
        <div className="finance_text">
          <div>
            <b>total: </b>
          </div>
          <div>
            <p style={{ fontSize: "1.2rem" }}>
              {totalAmount ? totalAmount : 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const FinanceDetails = () => {
  const [amount, setAmount] = useState(0);
  // Getting data from global state
  const data = useContext(FinanceContext);

  // Setting today's data
  const today = new Date();
  today.setHours(0, 0, 0, 0); //set time to midnight

  // Filtering data of today's date
  const filteredData = data.finance.filter((item) => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() === today.getTime();
  });

  // creating new array of expense data from today's data
  const expenseData = filteredData.filter((item) => item.type === "expense");
  // Totaling amount from expense data
  const expenseTotal = expenseData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  // Creating new array of income data from today's data
  const incomeData = filteredData.filter((item) => item.type === "income");

  // Totaling amount from income data
  const incomeTotal = incomeData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  // Creating an array of the passt 7 days
  const past7Days = [...Array(7).keys()].map((index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - index);
    return date.toISOString().split("T")[0];
  });

  // // Filter data for the past 7 days
  const thisWeekData = data.finance.filter((item) => {
    const itemDate = item.date;
    return past7Days.includes(itemDate);
  });

  // Creating this week's expense data array
  const thisWeekExpenseData = thisWeekData.filter(
    (item) => item.type == "expense"
  );

  // Creating this week's income data array
  const thisWeekIncomeData = thisWeekData.filter(
    (item) => item.type == "income"
  );

  // if(day == 'this week') {

  // }

  return (
    <div className="finance_details">
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="today"
          position="left"
          dayArray={expenseData}
          // categoryArray={expenseCategory}
        />
        <FinanceCard
          title="Income"
          day="today"
          position="right"
          dayArray={incomeData}
          // categoryArray={incomeCategory}
        />
      </div>
      <OverallCard incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="this week"
          position="left"
          // dayArray={thisWeekExpenseData}
          dayArray={expenseData}
          // categoryArray={expenseCategory}
        />
        <FinanceCard
          title="Income"
          day="this week"
          position="right"
          dayArray={thisWeekIncomeData}
          // categoryArray={incomeCategory}
        />
      </div>
      <div>this</div>
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="this month"
          position="left"
          // categoryArray={expenseCategory}
        />
        <FinanceCard
          title="Income"
          day="this month"
          position="right"
          // categoryArray={incomeCategory}
        />
      </div>
    </div>
  );
};

export default FinanceDetails;
