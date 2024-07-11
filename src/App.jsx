import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import Finance from './Pages/FinancePage/Finance'
import { useState } from 'react'
// import DataFile from './Components/Data/DataFile'
import FinanceContext from './Context/FinanceContext'
import FinanceDetails from './Components/Expense/FinanceDetails'
import { srcData } from './Data/Data'



function App() {
  const [finance, setFinance] = useState(srcData)

  return (
    <FinanceContext.Provider value={{finance, setFinance}}>
      {/* <Homepage /> */}
      <Finance />
      <FinanceDetails />
    </FinanceContext.Provider>
  )
}

export default App
