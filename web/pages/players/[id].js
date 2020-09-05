import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllPlayersWithID, getPlayer } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import PlayerStats from "../../components/player-stats";

export default function Player({ player, preview }) {
  const router = useRouter();
  if (!router.isFallback && !player?._id) {
    return <ErrorPage statusCode={404} />;
  }
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
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostTitle>{player.name}</PostTitle>
                <PlayerStats player={player._id} games={player.games} />
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
