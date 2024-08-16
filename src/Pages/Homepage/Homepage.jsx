import React, { useContext } from "react";
import "./Homepage.css";
import Card from "../../Components/DashboardCard/DashboardCard.jsx";
import Header from "../../Components/Header/Header.jsx";
import FinanceContext from "../../Context/FinanceContext.js";



const Homepage = () => {
  const {finance, setFinance} = useContext(FinanceContext)
  console.log(finance)
  return (
    <>
      <Header />
      <div className="graph">
        <div className="top_graph graph_item">
          <div className="graph_details left">
            <div>
              IN : <span>$50,00,000</span>
            </div>
            <div>
              OUT: <span>$45,00,000</span>
            </div>
            <div>
              BALANCE: <span>$5,00,000</span>
            </div>
          </div>
          <div className="graph_details right">
          </div>
        </div>
        <div className="botton_graph graph_item">
          <div className="graph_details left"></div>
          <div className="graph_details right"></div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
