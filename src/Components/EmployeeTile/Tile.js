import { makeStringCapitalize } from "../../Utility/utility";
import "./Tile.css";

function Tile({ user }) {
  return (
    <div className="tile-container" data-testid="custom-tile">
      <div data-testid="name-container" className="name-container">
        {makeStringCapitalize(user.name)}
      </div>
      <div
        data-testid="additional-data-container"
        className="additional-data-container">
        {user.designation} ( {user.team} )
      </div>
    </div>
  );
}

export default Tile;
