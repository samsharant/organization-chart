import "./Chart.css";
import { useContext, useState } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import DroppableContainer from "../DroppableContainer/DroppableContainer";
import chartDataContext from "../../Context/ChartDataContext";
import { leadership, managers, teams } from "../../constants";

function Chart({ teamToFilter }) {
  const { chartDataContextValue } = useContext(chartDataContext) || {
    chartDataContextValue: [],
  };
  const [data] = useState(chartDataContextValue);

  // renders the chart's first level of cards (static)
  const renderL1Cards = () => {
    return data.map((user) => {
      if (!user.manager)
        return (
          <div
            key={user.id}
            className={`cards-container ${
              teamToFilter !== teams.leadership ? "pointer-down" : ""
            }`}>
            <EmployeeCard user={user} isDraggable={false} />
          </div>
        );
    });
  };

  // renders the chart's second level of cards (static)
  const renderL2Cards = () => {
    return data.map((user) => {
      if (
        user.manager === leadership.id &&
        (teamToFilter === teams.all || teamToFilter === user.team)
      )
        return (
          <div key={user.id} className="cards-container pointer-up">
            <EmployeeCard user={user} isDraggable={false} />
          </div>
        );
    });
  };

  //renders the chart's third level of cards - based on manager id
  const renderL3Cards = () => {
    const managerIds = [managers.oneId, managers.twoId, managers.threeId]; //managers
    return managerIds.map((manager) => (
      <DroppableContainer
        key={manager}
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
          teamToFilter === teams.all ? "valid-all-chart" : ""
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
