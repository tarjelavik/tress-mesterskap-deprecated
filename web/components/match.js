import cn from "classnames";
import Date from "./date";
import CoverImage from "./cover-image";
import Link from "next/link";
import MatchTable from "./match-table";
import PortableBlock from "./portable-block";

export default function Match({ match }) {
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 gap-4 mb-16">
      <div className='col-span-12'>
        <h3 className="text-xl mb-1 leading-snug">
          <Link as={`/match/${match._id}`} href="/match/[slug]">
            <a className="hover:underline">
              {match.name}
            </a>
          </Link>
        </h3>
      </div>

      {match._type === 'match' && (<div className="md:col-span-9 lg:col-span-8 col-span-12">
        {match.results && <MatchTable data={match.results} />}
      </div>)}

      {match.mainRepresentation && match._type === 'match' && (
        <div className="md:col-span-3 lg:col-span-4 col-span-12 flex flex-col justify-end h-full">
          <CoverImage
            slug={match.slug}
            title={match.title}
            url={match.mainRepresentation}
          />
        </div>
      )}

      <div className='col-span-12'>
        <p className='text-neutral-300 text-xs'>
          {match.gameStart ? (<Date dateString={match.gameStart} />) : null}
        </p>
        {match.excerpt && <PortableBlock content={match.excerpt} />}
      </div>
    </div>
  );
}
