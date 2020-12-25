import client, { previewClient } from "./sanity";

const getUniqueDocuments = (documents) => {
  const slugs = new Set();
  return documents.filter((document) => {
    if (slugs.has(document._id)) {
      return false;
    } else {
      slugs.add(document._id);
      return true;
    }
  });
};

const matchFields = `
  _id,
  name,
  gameStart,
  results[]{
    player->{_id, name},
    score
  },
  description,
  mainRepresentation
`;

const playerFields = `
  _id,
  name,
  "games": *[_type=='match' && references(^._id)]{
    _id,
    name,
    results[]{
      player, 
      score
    }
  }
`;

const getClient = (preview) => (preview ? previewClient : client);

export async function getPreviewByID(id) {
  const data = await getClient(true).fetch(
    `*[_id == $id]{
      _id
    }`,
    { id }
  );
  return data[0];
}

export async function getAllMatchesWithID() {
  const data = await client.fetch(`*[_type == "match"]{ 'id': _id }`);
  return data;
}

export async function getAllPlayersWithID() {
  const data = await client.fetch(`*[_type == "player"]{ 'id': _id }`);
  return data;
}

export async function getPlayer(id, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "player" && _id == $id]{
      ${playerFields}
    }`,
    { id }
  );
  return results;
}

export async function getAllMatchesForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "match"][0...5] | order(gameStart desc, _updatedAt desc){
      ${matchFields}
    }`);
  return getUniqueDocuments(results);
}

export async function getAllMatches(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "match"] | order(gameStart desc, _updatedAt desc){
      ${matchFields}
    }`);
  return getUniqueDocuments(results);
}

export async function getMatchAndMoreMatches(id, preview) {
  const curClient = getClient(preview);
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
    ),
  ]);
  return { match, moreMatches: getUniqueDocuments(moreMatches) };
}
