import cn from "classnames";
import Link from "next/link";
import { imageBuilder } from "../lib/sanity";

export default function CoverImage({ title, url, slug }) {
  const image = (
    <img
      width={1000}
      height={1000}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={imageBuilder.image(url).height(1000).width(1000).url()}
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
