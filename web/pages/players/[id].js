import react from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllPlayersWithID, getPlayer } from "../../lib/api";
import Title from "../../components/title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import PlayerStats from "../../components/player-stats";
import { Line } from "react-chartjs-2";
import { getResultScoreSeries } from "../../lib/functions";

export default function Player({ player, preview }) {
  const router = useRouter();
  if (!router.isFallback && !player?._id) {
    return <ErrorPage statusCode={404} />;
  }

  const axes = react.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  const data = getResultScoreSeries(player._id, player.games);

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {player.name} | {CMS_NAME}
                </title>
              </Head>
              <Title>{player.name}</Title>
              <PlayerStats player={player._id} games={player.games} />
              <Line data={data} width={400} height={200} />
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
          id: player.id,
        },
      })) || [],
    fallback: true,
  };
}
