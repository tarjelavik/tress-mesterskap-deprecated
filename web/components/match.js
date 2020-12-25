import cn from "classnames";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";
import MatchTable from "./match-table";
import PortableBlock from "./portable-block";

export default function Match({ match }) {
  return (
    <div class="grid grid-cols-2 gap-4">
      {match.mainRepresentation && (
        <div className="mb-5">
          <CoverImage
            slug={match.slug}
            title={match.title}
            url={match.mainRepresentation}
          />
        </div>
      )}
      {!match.mainRepresentation && (
        <img
          width={640}
          height={360}
          alt={`Placeholder image`}
          className={cn(
            "shadow-small hover:shadow-medium transition-shadow duration-200"
          )}
          src="https://baconmockup.com/640/360"
        />
      )}
      <div>
        <h3 className="text-3xl mb-3 leading-snug">
          <Link as={`/match/${match._id}`} href="/match/[slug]">
            <a className="hover:underline">{match.name}</a>
          </Link>
        </h3>
        <div className="text-lg mb-4">
          <Date dateString={match.gameStart} />
        </div>
        {match.results && <MatchTable data={match.results} />}
        <PortableBlock content={match.excerpt} />
      </div>
    </div>
  );
}
