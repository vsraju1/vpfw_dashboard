import app from './firebaseConfig'
import { getDatabase, ref, get } from 'firebase/database'
import './App.css'
// import Homepage from './Pages/Homepage/Homepage'
import Finance from './pages/FinancePage/Finance'
import { useState, useEffect } from 'react'
// import DataFile from './Components/Data/DataFile'
import FinanceContext from './Context/FinanceContext'
import FinanceDetails from './components/Expense/FinanceDetails'
import { srcData } from './Data/Data'
import TransactonsPage from './pages/TransactionsPage/TransactonsPage'



function App() {
  const [finance, setFinance] = useState(srcData)

  useEffect(() => {
    const fetchDataFromFirebaseDb = async() => {
      const db = getDatabase(app);
      const dbRef = ref(db, "transactions");
      const snapShot = await get(dbRef);
      if(snapShot.exists()) {
        setFinance(Object.values(snapShot.val()))
      } else {
        alert("There is no data or an error occured. Please add a transaction and try again.")
      }
    }
    fetchDataFromFirebaseDb();
  }
  , [])

  return (
    <FinanceContext.Provider value={{finance, setFinance}}>
      {/* <Homepage /> */}
      <Finance />
      <FinanceDetails />
      <TransactonsPage />
    </FinanceContext.Provider>
  )
}

export default App
