import "./Chart.css";
import EmployeeCard from "./EmployeeCard";
import DroppableContainer from "./DroppableContainer";
import { useContext, useState } from "react";
import chartDataContext from "../Context/ChartDataContext";

function Chart({ teamToFilter }) {
  const { chartDataContextValue } = useContext(chartDataContext) || {
    chartDataContextValue: [],
  };
  const [data] = useState(chartDataContextValue);

  const renderL1Cards = () => {
    return data.map((user) => {
      if (!user.manager)
        return (
          <div
            className={`cards-container ${
              teamToFilter !== "leadership" ? "pointer-down" : ""
            }`}>
            <EmployeeCard user={user} isDraggable={false} />
          </div>
        );
      else return <></>;
    });
  };

  const renderL2Cards = () => {
    return data.map((user) => {
      if (
        user.manager === "hf001" &&
        (teamToFilter === "all" || teamToFilter === user.team)
      )
        return (
          <div className="cards-container pointer-up">
            <EmployeeCard user={user} isDraggable={false} />
          </div>
        );
      else return <></>;
    });
  };

  const renderL3Cards = () => {
    const teamsByManagerId = ["hf002", "hf003", "hf004"];
    return teamsByManagerId.map((manager) => (
      <DroppableContainer
        data={data}
        manager={manager}
        teamToFilter={teamToFilter}
      />
    ));
  };

  return (
    <div data-testid="chart-wrapper" className="chart-wrapper">
      <div
        data-testid="first-level-container"
        className={`first-level-container ${
          teamToFilter === "all" ? "valid-all-chart" : ""
        }`}>
        {renderL1Cards()}
      </div>
      <div
        data-testid="second-level-container"
        className="second-level-container">
        {renderL2Cards()}
      </div>
      <div
        data-testid="third-level-container"
        className="third-level-container">
        {renderL3Cards()}
      </div>
    </div>
  );
}

export default Chart;