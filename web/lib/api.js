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
  _type,
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

const tournamentFields = `
  _id,
  name,
  gameStart,
  "matches": *[_type in ['match', 'cup'] && references(^._id)]| order(gameStart asc) {
    ${matchFields}
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
  const data = await getClient(preview).fetch(`*[_type == "match"]{_id}`);
  return data;
}

export async function getAllTournamentsWithID(preview) {
  const data = await getClient(preview).fetch(`*[_type == "tournament"]{_id}`);
  return data;
}

export async function getAllPlayersWithID(preview) {
  const data = await getClient(preview).fetch(`*[_type == "player"]{_id}`);
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
    `*[_type in ["match", "cup"] && _id == $id]{
      ${matchFields}
    }`,
    { id }
  );
  return results;
}

export async function getTournament(id, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "tournament" && _id == $id]{
      ${tournamentFields}
    }`,
    { id }
  );
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

export async function getAllTournaments(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "tournament"] | order(end desc){
      ${tournamentFields}
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

export async function getAllPlayersByYear(year, preview) {
  const yearStart = new Date(year, 1, 1)
  const yearEnd = new Date(year, 12, 31)
  const results = await getClient(preview)
    .fetch(`*[_type == "player"] | order(name desc){
      _id,
      name,
      mainRepresentation,
      "games": *[_type=='match' && (gameStart >= $yearStart && gameStart < $yearEnd) && references(^._id)]| order(gameStart asc) {
        _id,
        name,
        gameStart,
        results[]{
          player, 
          isWinner,
          score
        }
      }
    }`, { yearStart, yearEnd });
  return getUniqueDocuments(results);
}

export async function getAllPlayersByTournament(id, preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "player"] | order(name desc){
      _id,
      name,
      mainRepresentation,
      "games": *[_type in ['match'] && references(^._id) && references($id)]| order(gameStart asc) {
        _id,
        name,
        gameStart,
        results[]{
          player, 
          isWinner,
          score
        }
      }
    }`, { id });
  return getUniqueDocuments(results);
}

export async function getMatchesByYear(preview) {
  const years = await getClient(preview)
    .fetch(`*[_type == "match"]{
      gameStart
    }`);

  const results = years.reduce((acc, curr) => {
    let year = (new Date(curr.gameStart)).getFullYear().toString()

    if (!acc.includes(year)) {
      return [...acc, year];
    }
    return acc
  }, [])

  return results;
}
