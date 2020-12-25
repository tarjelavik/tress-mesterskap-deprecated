import cn from "classnames";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";
import MatchTable from "./match-table";
import PortableBlock from "./portable-block";

export default function Match({ match }) {
  return (
    <div class="grid md:grid-cols-8 grid-cols-1 gap-4">
      <div className="md:col-span-2 col-span-8">
        {match.mainRepresentation && (
          <CoverImage
            slug={match.slug}
            title={match.title}
            url={match.mainRepresentation}
          />
        )}
        {!match.mainRepresentation && (
          <img
            width={600}
            height={600}
            alt={`Placeholder image`}
            className={cn(
              "shadow-small hover:shadow-medium transition-shadow duration-200"
            )}
            src="https://generative-placeholders.glitch.me/image?width=600&height=600&style=123"
          />
        )}
      </div>
      <div className="md:col-span-6 col-span-8">
        <h3 className="text-3xl mb-3 leading-snug">
          <Link as={`/match/${match._id}`} href="/match/[slug]">
            <a className="hover:underline">{match.name}</a>
          </Link>
        </h3>
        <div className="text-lg mb-4">
          <Date dateString={match.gameStart} />
        </div>
        {match.results && <MatchTable data={match.results} />}
        {match.excerpt && <PortableBlock content={match.excerpt} />}
      </div>
    </div>
  );
}
