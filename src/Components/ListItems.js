import Tile from "./Tile";

function ListItems({ data }) {
  return (
    <div className="list-container">
      {data.map((user) => (
        <Tile key={user.id} user={user} />
      ))}
    </div>
  );
}

export default ListItems;
