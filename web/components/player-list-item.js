import Link from "next/link";
import PortableBlock from "./portable-block";
import { getAverageScore } from "../lib/functions";
import PlayerImage from "./player-image";

export default function PlayerListItem({ player }) {
  return (
    <div class="grid grid-cols-8 gap-4">
      <div class="w-16 h-16 relative mb-4">
        <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
          {player.mainRepresentation && (
            <PlayerImage
              slug={player.slug}
              title={player.name}
              url={player.mainRepresentation}
            />
          )}
          {!player.mainRepresentation && (
            <img
              src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
              alt="lovely avatar"
              class="object-cover object-center w-full h-full visible group-hover:hidden"
            />
          )}
        </div>
      </div>
      <div className="col-span-6">
        <h3 className="text-3xl mb-3 leading-snug">
          <Link as={`/players/${player._id}`} href="/players/[slug]">
            <a className="hover:underline">{player.name}</a>
          </Link>
        </h3>
        <span>
          {getAverageScore(player._id, player.games)} på {player.games.length}{" "}
          spill
        </span>
        {player.excerpt && <PortableBlock content={player.excerpt} />}
      </div>
    </div>
  );
}
