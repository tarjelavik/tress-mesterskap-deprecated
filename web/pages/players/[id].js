import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllPlayersWithID, getPlayer } from "../../lib/api";
import Title from "../../components/title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import AverageScore from "../../components/average-score";
import PlayerImage from "../../components/player-image";
import MatchesWon from "../../components/matchesWon";

export default function Player({ player, preview }) {
  const router = useRouter();
  if (!router.isFallback && !player?._id) {
    return <ErrorPage statusCode={404} />;
  }

  const DynamicScoreGraph = dynamic(() =>
    import("../../components/score-graph")
  );
  const DynamicScorePerRoundGraph = dynamic(() =>
    import("../../components/score-per-round-graph")
  );
  const DynamicAccumulatedAverageGraph = dynamic(() =>
    import("../../components/score-accumulated-average-graph")
  );

  return (
    <Layout preview={preview}>
      <Header />
      <Container>
        {router.isFallback ? (
          <Title>Loading…</Title>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {player.name} | {CMS_NAME}
                </title>
              </Head>
              <div className="flex gap-4">
                <div className="w-16 h-16 relative mb-4">
                  <div className="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                    {player.mainRepresentation && (
                      <PlayerImage
                        slug={player.slug}
                        title={player.name}
                        url={player.mainRepresentation}
                      />
                    )}
                    {!player.mainRepresentation && (
                      <div style={{ backgroundColor: '#ccc', width: '100%', height: '100%' }}></div>
                    )}
                  </div>
                </div>
                <div className="col-span-10">
                  <Title>{player.name}</Title>
                </div>
              </div>

              <div id="stats" className="max-w-xl px-4 py-4 mx-auto">
                <div className="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                  <div className="px-4 py-4 mb-5 bg-white border border-gray-300 rounded">
                    <AverageScore player={player._id} games={player.games} />
                  </div>
                  <div className="px-4 py-4 mb-5 bg-white border border-gray-300 rounded">
                    <MatchesWon player={player._id} games={player.games} />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="my-10">
                  <h1 className="text-2xl font-bold text-center">
                    Resultat per spill
                  </h1>
                  <DynamicScoreGraph player={player._id} games={player.games} />
                </div>
                <div className="my-10">
                  <h1 className="text-2xl font-bold text-center">
                    Utvikling av gjennomsnittet
                  </h1>
                  <DynamicAccumulatedAverageGraph
                    player={player._id}
                    games={player.games}
                  />
                </div>
              </div>
              <div className="my-10">
                <h1 className="text-2xl font-bold text-center">
                  Resultat per runde
                </h1>
                <DynamicScorePerRoundGraph
                  player={player._id}
                  games={player.games}
                />
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPlayer(params.id, preview);
  return {
    props: {
      preview,
      player: data[0] || null,
    },
  };
}

export async function getStaticPaths() {
  const allPlayers = await getAllPlayersWithID();
  return {
    paths:
      allPlayers?.map((player) => ({
        params: {
          id: player._id,
        },
      })) || [],
    fallback: true,
  };
}
