import { useContext } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import chartDataContext from "../../Context/ChartDataContext";

//axios
import axios from "axios";

//toastify
import { toast } from "react-toastify";

//react-dnd
import { useDrop } from "react-dnd";
import { makeStringCapitalize } from "../../Utility/utility";

const toastStyle = { fontSize: "12px", height: "30px", width: "300px" };

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

    //do not updated if - the item dropped in same team
    if (targetEmployee.manager === newManager) return;

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
          toast(
            `Manager update for ${makeStringCapitalize(
              targetEmployee.name,
            )}: Success!`,
            {
              type: "success",
              style: toastStyle,
            },
          );
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
              return (
                <EmployeeCard key={user.id} user={user} isDraggable={true} />
              );
            }
          })}
        </div>
      )}
    </>
  );
}

export default DroppableContainer;
