import React, { useState, useContext } from "react";
import "./Finance.css";
import FinanceContext from "../../Context/FinanceContext";

const typeData = [
  {
    type: "expense",
    categories: [
      "Material",
      "Paint",
      "Salary",
      "Intrest",
      "Repayment",
      "Advance Return",
      "General Expences",
      "Home Expences"
    ],
  },
  {
    type: "income",
    categories: ["Advance", "Completion", "Borrowed"],
  },
];

const Finance = () => {
  const { finance, setFinance } = useContext(FinanceContext);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const todayDate = date.toISOString().split("T")[0];
    let data = {
      id: Number(`${date.getDate()}${date.getMonth()}${date.getFullYear()}`),
      name: name,
      type: type,
      categoryValue: categoryValue.toLowerCase(),
      amount: Number(amount),
      date: todayDate,
    };
    setFinance((prev) => [...prev, data]);
    setAmount("");
    setType("");
    setCategory([]);
    setCategoryValue("");
    setName("");
  };

  return (
    <div className="finance">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          <select
            name="type"
            id="type"
            placeholder="type"
            value={type}
            required
            onChange={(e) => {
              const selectedType = e.target.value;
              setType(selectedType);
              const categoryData = typeData.find(
                (item) => item.type === selectedType
              );
              setCategory(categoryData ? categoryData.categories : []);
            }}
          >
            <option>Type</option>
            {typeData.map((item, index) => {
              return (
                <option key={index} value={item.type}>
                  {item.type}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          <select
            disabled={!category}
            value={categoryValue}
            onChange={(e) => {
              setCategoryValue(e.target.value);
            }}
            required
          >
            <option value="" disabled>
              Category
            </option>
            {category.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input
            type="text"
            placeholder="Person name/ vendor name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button disabled={!name && !type} type="submit">
          Add
        </button>
      </form>
      {/* {console.log(finance, 'this is from main')} */}
    </div>
  );
};

export default Finance;
