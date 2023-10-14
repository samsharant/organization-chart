import "./Tile.css";

function Tile({ user }) {
  return (
    <div className="tile-container" data-testid="custom-tile">
      <div data-testid="name-container" className="name-container">
        {user.name[0].toUpperCase() + user.name.slice(1)}
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
