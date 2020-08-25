import PostPreview from '../components/post-preview'

export default function MoreStories({ matches }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        Flere slag...
      </h2>
      <p>{matches.results}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {matches.map((match) => (
          <PostPreview
            key={match._id}
            title={match.name}
            coverImage={match.mainRepresentation}
            date={match.gameStart}
            results={match.results}
            // author={match.author}
            slug={match._id}
            excerpt={match.description}
          />
        ))}
      </div>
    </section>
  )
}
