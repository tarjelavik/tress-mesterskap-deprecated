import client, { previewClient } from './sanity'

const getUniqueMatches = (matches) => {
  const slugs = new Set()
  return matches.filter((match) => {
    if (slugs.has(match._id)) {
      return false
    } else {
      slugs.add(match._id)
      return true
    }
  })
}

const matchFields = `
  _id,
  name,
  gameStart,
  results[]{
    "player": player->name,
    score
  },
  description,
  mainRepresentation
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewMatchByID(id) {
  const data = await getClient(true).fetch(
    `*[_type == "match" && _id == $id] | order(gameStart desc){
      ${matchFields}
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllMatchesWithID() {
  const data = await client.fetch(`*[_type == "match"]{ 'id': _id }`)
  return data
}

export async function getAllMatchesForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "match"] | order(gameStart desc, _updatedAt desc){
      ${matchFields}
    }`)
  return getUniqueMatches(results)
}

export async function getMatchAndMoreMatches(id, preview) {
  const curClient = getClient(preview)
  const [match, moreMatches] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "match" && _id == $id] | order(_updatedAt desc) {
        ${matchFields}
      }`,
        { id }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "match" && _id != $id] | order(gameStart desc, _updatedAt desc){
        ${matchFields}
      }[0...2]`,
      { id }
    )
  ])
  return { match, moreMatches: getUniqueMatches(moreMatches) }
}
