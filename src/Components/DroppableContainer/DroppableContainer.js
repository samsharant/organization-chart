import { useDrop } from "react-dnd";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { useContext } from "react";
import chartDataContext from "../../Context/ChartDataContext";
import axios from "axios";
import { toast } from "react-toastify";

function DroppableContainer({ manager, data, teamToFilter }) {
  const team = data.find((employee) => employee.id === manager)?.team;
  const { chartDataContextValue, updateContextValue } = useContext(
    chartDataContext,
  ) || { chartDataContextValue: [], updateContextValue: () => {} };

  const updateChart = (id) => {
    const newManager = manager;
    const updatedChartData = [...chartDataContextValue];
    const targetEmployeeIdx = updatedChartData.findIndex(
      (employee) => employee.id === id,
    );
    const targetEmployee = updatedChartData[targetEmployeeIdx];

    //do not updated if - item dropps in same team
    if (targetEmployee.manager !== newManager)
      updatedChartData[targetEmployeeIdx].manager = newManager;

    updateContextValue(updatedChartData);
    axios
      .put(`/api/chartData/${targetEmployee.id}`, {
        ...targetEmployee,
        manager: newManager,
      })
      .then(async (response) => {
        // Handle the response
        if (response.status === 200) {
          //DB will be updated by this time
          toast("SUCCESS [PUT] : 200", { type: "success" });
        }
      });
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "employee",
    drop: ({ sourceId }) => {
      updateChart(sourceId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      {(teamToFilter === "all" || teamToFilter === team) && (
        <div
          ref={drop}
          className={`${
            isOver
              ? "active-draggable-cards-container"
              : "draggable-cards-container"
          } ${"pointer-up"}`}>
          {data.map((user) => {
            if (user.manager === manager) {
              return <EmployeeCard user={user} isDraggable={true} />;
            }
          })}
        </div>
      )}
    </>
  );
}

export default DroppableContainer;
