import cn from "classnames";
import Link from "next/link";
import { urlFor } from "../lib/sanity";

export default function PlayerImage({ title, url, slug }) {
  const image = (
    <img
      width={400}
      height={400}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={urlFor(url).height(400).width(400).url()}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/match/${slug}`} href="/match/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
