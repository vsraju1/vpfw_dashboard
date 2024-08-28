import app from './firebaseConfig'
import { getDatabase, ref, get } from 'firebase/database'
import './App.css'
// import Homepage from './Pages/Homepage/Homepage'
import Finance from './pages/FinancePage/Finance'
import { useState, useEffect } from 'react'
// import DataFile from './components/'
import FinanceContext from './Context/FinanceContext'
import FinanceDetails from './components/Expense/FinanceDetails.jsx'
import { srcData, worksData } from './Data/Data'
import TransactonsPage from './pages/TransactionsPage/TransactonsPage.jsx'
import WorksPage from './pages/WorksPage/WorksPage.jsx'
import { WorksContext } from './Context/WorkContext.js'



function App() {
  const [finance, setFinance] = useState(srcData)
  const [workList, setWorkList] = useState(worksData)

  // useEffect(() => {
  //   const fetchDataFromFirebaseDb = async() => {
  //     const db = getDatabase(app);
  //     const dbTransactionRef = ref(db, "transactions");
  //     const transactionSnapShot = await get(dbTransactionRef);
  //     if(transactionSnapShot.exists()) {
  //       setFinance(Object.values(transactionSnapShot.val()))
  //     } else {
  //       alert("There is no data or an error occured. Please add a transaction and try again.")
  //     }
  //   }
  //   fetchDataFromFirebaseDb();
  // }
  // , [])

  // useEffect(() => {
  //   const fetchDataFromFirebaseDb = async() => {
  //     const db = getDatabase(app);
  //     const dbWorklistRef = ref(db, 'worklist')
  //     const worklistSnapShot = await get(dbWorklistRef)
  //     if(worklistSnapShot.exists()) {
  //       setWorkList(Object.values(worklistSnapShot.val()))
  //     } else {
  //       alert("There is no work data or an error occured. Please add a work and try again.")
  //     }
  //   }
  //   fetchDataFromFirebaseDb();
  // }
  // , [])

  return (
    <FinanceContext.Provider value={{finance, setFinance}}>
      <WorksContext.Provider value={{workList, setWorkList}}>
      {/* <Homepage /> */}
      <Finance />
      <FinanceDetails />
      <TransactonsPage />
      <WorksPage />
      </WorksContext.Provider>
    </FinanceContext.Provider>
  )
}

export default App
