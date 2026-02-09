import { useState } from 'react'
import './App.css'
import Controls from './components/Controls/Controls'
import Items from './components/Items/Items'
import KPI_Selector from './components/KPI_Selector/KPI_Selector'

function App() {
  const [globalKPI, setGlobalKPI] = useState("");
  console.log(globalKPI)

  return (
    <>
      <KPI_Selector setGlobalKPI = {setGlobalKPI} />
      <Items/>
      <Controls/>
    </>
  )
}

export default App
