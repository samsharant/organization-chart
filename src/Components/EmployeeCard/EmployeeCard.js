import { makeStringCapitalize } from "../../Utility/utility";
import "./EmployeeCard.css";

//react-dnd
import { useDrag } from "react-dnd";

function EmployeeCard({ user, isDraggable }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "employee",
    item: { sourceId: user.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={isDraggable ? drag : null}
      className={`${
        isDraggable ? "draggable-employee-card" : "employee-card"
      } ${isDragging ? "dragging-card" : ""}`}>
      <div className="name-container">{makeStringCapitalize(user.name)}</div>
      <div className="designation-container">
        <span>{user.designation}</span>
      </div>
    </div>
  );
}

export default EmployeeCard;
