import Match from "./match";

export default function Matches({ matches }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {matches.map((match) => (
          <Match match={match} />
        ))}
      </div>
    </section>
  );
}
