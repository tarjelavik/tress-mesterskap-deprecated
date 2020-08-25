import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from './cover-image'
import Link from 'next/link'
import MatchTable from './match-table'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  results,
  // author,
  slug,
}) {
  return (
    <div>
      {coverImage && (
        <div className="mb-5">
          <CoverImage slug={slug} title={title} url={coverImage} />
        </div>
      )}
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/matches/${slug}`} href="/matches/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} />
      </div>
      {results && (<MatchTable data={results} />)}
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {/* <Avatar name={author.name} picture={author.picture} /> */}
    </div>
  )
}
