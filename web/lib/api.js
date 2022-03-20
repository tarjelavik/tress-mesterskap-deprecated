import { getClient } from './sanity.server'

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
    player->{_id, name, mainRepresentation},
    isWinner,
    score
  },
  description,
  mainRepresentation
`;

const playerFields = `
  _id,
  name,
  mainRepresentation,
  "games": *[_type=='match' && references(^._id)]| order(gameStart asc) {
    _id,
    name,
    gameStart,
    results[]{
      player, 
      isWinner,
      score
    }
  }
`;


export async function getPreviewByID(id) {
  const data = await getClient(true).fetch(
    `*[_id == $id]{
      _id
    }`,
    { id }
  );
  return data[0];
}

export async function getAllMatchesWithID(preview) {
  const data = await getClient(preview).fetch(`*[_type == "match"]`);
  return data;
}

export async function getAllPlayersWithID(preview) {
  const data = await getClient(preview).fetch(`*[_type == "player"]`);
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

export async function getMatch(id, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "match" && _id == $id]{
      ${matchFields}
    }`,
    { id }
  );
  console.log(JSON.stringify(results, null, 2))
  return results;
}

export async function getAllMatchesForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "match"] | order(gameStart desc) [0...5] {
      ${matchFields}
    }`);
  return getUniqueDocuments(results);
}

export async function getAllMatches(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "match"] | order(gameStart desc){
      ${matchFields}
    }`);
  return getUniqueDocuments(results);
}

export async function getAllPlayers(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "player"] | order(name desc){
      ${playerFields}
    }`);
  return getUniqueDocuments(results);
}
