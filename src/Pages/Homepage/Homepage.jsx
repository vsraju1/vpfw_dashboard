import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Components or pages
import "./Homepage.css";
import Card from "../../Components/DashboardCard/DashboardCard.jsx";
import Header from "../../Components/Header/Header.jsx";
import FinanceContext from "../../Context/FinanceContext.js";

const Homepage = () => {
  const { finance, setFinance } = useContext(FinanceContext);
  console.log(finance);

  // Getting today's data
  const currentDate = new Date();

  // Creting array for last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() - i);
    return day;
  });

  // Creatomg New array for each day
  const summarizedBarData = last7Days.map((day) => {
    const formattedDay = day.toLocaleDateString("en-US", { weekday: "short" });
    const dayTransactions = finance?.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.toDateString() === day.toDateString();
    });

    const totalIncome = dayTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = dayTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const barData = {
      day: formattedDay,
      Income: totalIncome,
      Expense: totalExpense,
    };

    return barData;
  });

  console.log(last7Days);
  console.log(summarizedBarData);
  return (
    <>
      <Header />
      {/* <BarChart
        width={500}
        height={300}
        data={summarizedBarData.reverse()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Income"
          fill="green"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Expense"
          fill="red"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart> */}
    </>
  );
};

export default Homepage;
