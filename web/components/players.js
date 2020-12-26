import PlayerListItem from "./player-list-item";

export default function Players({ players }) {
  return (
    <section>
      <div className="grid grid-cols-1 row-gap-5 md:row-gap-5 mb-10">
        {players.map((player) => (
          <PlayerListItem player={player} />
        ))}
      </div>
    </section>
  );
}
