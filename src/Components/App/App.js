import React, { createContext, useState } from "react"
import Filter from '../Filter/Filter';
import Listings from '../Listings/Listings';
import AOS from 'aos';
AOS.init();
export const Store = createContext(null);

function App() {
  let params = new URLSearchParams(window.location.search);
  const [PropertyCategory, setPropertyCategory] = useState(null)
  const [BudgetCategory, setBudgetCategory] = useState(null)
  const [LocationCategory, setLocationCategory] = useState(null)
  const [RoomsCategory, setRoomsCategory] = useState(null)
  const [SortBy, setSorBy] = useState(null)
  const [Goals, setGoals] = useState(null)
  const [PropertySelect, setPropertySelect] = useState(params.get("property"))
 
  
  return (
    <>
      <Store.Provider value={{
        PropertyCategory,
        setPropertyCategory,
        BudgetCategory,
        setBudgetCategory,
        LocationCategory,
        setLocationCategory,
        RoomsCategory,
        setRoomsCategory,
        SortBy,
        setSorBy,
        Goals,
        setGoals,
        PropertySelect,
        setPropertySelect
      }}>
        <Filter />
        <Listings />
      </Store.Provider>
    </>
  )
}

export default App
