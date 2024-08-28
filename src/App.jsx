import app from "./firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";
import Finance from "./Pages/FinancePage/Finance";
import { useState } from "react";
// import DataFile from './Components/Data/DataFile'
import FinanceContext from "./Context/FinanceContext";
import FinanceDetails from "./Components/Expense/FinanceDetails";
import { srcData } from "./Data/Data";
import TransactonsPage from "./Pages/TransactionsPage/TransactonsPage";
import WorkForm from "./Components/WorksForm/WorkForm";
import { worksData } from "./Data/Data";
import { WorksContext } from "./Context/WorkContext";
import WorksPage from "./Pages/WorksPage/WorksPage";
import Practice from "./Pages/PracticePage/Practice";

function App() {
  const [finance, setFinance] = useState(srcData);
  const [workList, setWorkList] = useState(worksData);

  // const fetchDataFromFirebaseDb = async() => {
  //   const db = getDatabase(app);
  //   const dbRef = ref(db, "transactions");
  //   const snapShot = await get(dbRef);
  //   if(snapShot.exists()) {
  //     setFinance(Object.values(snapShot.val()))
  //   } else {
  //     alert("There is no data or an error occured. Please add a transaction and try again.")
  //   }
  // }

  // fetchDataFromFirebaseDb();

  return (
    <FinanceContext.Provider value={{ finance, setFinance }}>
      <WorksContext.Provider value={{ workList, setWorkList }}>
        <Practice />
        {/* <Homepage /> */}
        {/* <Finance /> */}
        {/* <FinanceDetails /> */}
        {/* <TransactonsPage /> */}
        {/* <WorksPage /> */}
      </WorksContext.Provider>
    </FinanceContext.Provider>
  );
}

export default App;
