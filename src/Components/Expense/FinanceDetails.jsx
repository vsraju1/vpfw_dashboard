import React, { useContext, useState } from "react";
import "./FinanceDetails.css";
import FinanceContext from "../../Context/FinanceContext";
import OverallCard from "../OverallCard/OverallCard";

const FinanceCard = ({ title, day, position, dayArray }) => {
  const today = new Date();
  const dataOfTodayOrWeekOrMonth = () => {
    if (day == "this month") {
      const startingDayOfThisMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const filteredDayOrWeekOrMonthData = dayArray.filter((item) => {
        const transactionDate = new Date(item.date);
        console.log(transactionDate);
        return (
          transactionDate >= startingDayOfThisMonth && transactionDate <= today
        );
      });
      return filteredDayOrWeekOrMonthData;
    } else if (day == "this week") {
      const dayOfWeek = today.getDay();
      const startingDayOfThisWeek = new Date();
      startingDayOfThisWeek.setDate(today.getDate() - dayOfWeek);
      const filteredDayOrWeekOrMonthData = dayArray.filter((item) => {
        const transactionDate = new Date(item.date);
        return (
          transactionDate >= startingDayOfThisWeek && transactionDate <= today
        );
      });
      return filteredDayOrWeekOrMonthData;
    } else if (day == "today") {
      const filteredDayOrWeekOrMonthData = dayArray.filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        console.log(
          itemDate.getTime(),
          today.getTime(),
          "this from today array"
        );
        return itemDate.getTime() === today.getTime();
      });
      return filteredDayOrWeekOrMonthData;
    }
  };

  const filteredDayOrWeekOrMonthData = dataOfTodayOrWeekOrMonth();

  // Totaling amount from dayarray(income or expense) data
  const totalAmount = filteredDayOrWeekOrMonthData?.reduce(
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
  const array_details = categoryFn(filteredDayOrWeekOrMonthData);

  // totalling amount
  const dayarrayTotal = array_details.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  return (
    <>
      <div className={position}>
        <div className="finance_title">
          <h3>
            {title}({day})
          </h3>
        </div>
        {console.log(array_details, day, `this is ${day} details`)}
        {array_details?.map((item, index) => (
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

  // creating new array of expense data from today's data
  const expenseData = data.finance.filter((item) => item.type === "expense");
  // Totaling amount from expense data
  const expenseTotal = expenseData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  // Creating new array of income data from today's data
  const incomeData = data.finance.filter((item) => item.type === "income");

  // Totaling amount from income data
  const incomeTotal = incomeData.reduce((totalAmount, currentObject) => {
    return totalAmount + currentObject.amount;
  }, 0);

  return (
    <div className="finance_details">
      <div className="day">
        {console.log(data.finance)}
        <FinanceCard
          title="Expenses"
          day="today"
          position="left"
          dayArray={expenseData}
        />
        <FinanceCard
          title="Income"
          day="today"
          position="right"
          dayArray={incomeData}
        />
      </div>
      {/* <OverallCard incomeTotal={incomeTotal} expenseTotal={expenseTotal} /> */}
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="this week"
          position="left"
          dayArray={expenseData}
        />
        <FinanceCard
          title="Income"
          day="this week"
          position="right"
          dayArray={incomeData}
        />
      </div>
      <div>this</div>
      <div className="day">
        <FinanceCard
          title="Expenses"
          day="this month"
          position="left"
          dayArray={expenseData}
        />
        <FinanceCard
          title="Income"
          day="this month"
          position="right"
          dayArray={incomeData}
        />
      </div>
    </div>
  );
};

export default FinanceDetails;
