import PlayerListItem from "./player-list-item";

export default function Players({ players }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-5 mb-10">
        {players.map((player) => (
          <PlayerListItem player={player} />
        ))}
      </div>
    </section>
  );
}
