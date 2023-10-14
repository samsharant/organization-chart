import React, { useEffect, useState } from "react";
import OrgChart from "./Pages/OrgChart/OrgChart";
import { fetchChartData } from "./Services/ChartDataService";
import chartDataContext from "./Context/ChartDataContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [chartDataContextValue, setChartDataContextValue] = useState([]);

  const getChartData = async () => {
    const data = await fetchChartData();
    setChartDataContextValue(data);
  };

  useEffect(() => {
    getChartData();
  }, []);

  const updateContextValue = (updatedData) => {
    setChartDataContextValue(updatedData);
  };

  return (
    <chartDataContext.Provider
      value={{ chartDataContextValue, updateContextValue }}>
      <OrgChart />
      <ToastContainer position="top-center" autoClose={500} />
    </chartDataContext.Provider>
  );
}

export default App;
