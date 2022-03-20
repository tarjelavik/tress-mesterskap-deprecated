import cn from "classnames";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";
import MatchTable from "./match-table";
import PortableBlock from "./portable-block";

export default function Match({ match }) {
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 gap-4 mb-16">
      <div className="md:col-span-3 lg:col-span-4 col-span-12">
        <h3 className="text-2xl mb-3 leading-snug">
          <Link as={`/match/${match._id}`} href="/match/[slug]">
            <a className="hover:underline"><Date dateString={match.gameStart} /></a>
          </Link>
        </h3>
        {match.mainRepresentation && (
          <CoverImage
            slug={match.slug}
            title={match.title}
            url={match.mainRepresentation}
          />
        )}
        {!match.mainRepresentation && (
          <img
            width={1000}
            height={700}
            alt={`Placeholder image`}
            className={cn(
              "shadow-small hover:shadow-medium transition-shadow duration-200"
            )}
            src="https://generative-placeholders.glitch.me/image?width=1000&height=700&style=123"
          />
        )}
        {/* <div className="text-lg mb-4">
          <Date dateString={match.gameStart} />
        </div> */}
      </div>
      <div className="md:col-span-9 lg:col-span-8 col-span-12">
        {match.results && <MatchTable data={match.results} />}
        {match.excerpt && <PortableBlock content={match.excerpt} />}
      </div>
    </div>
  );
}
