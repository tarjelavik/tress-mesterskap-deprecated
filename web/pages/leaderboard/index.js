import dynamic from "next/dynamic";
import Link from "next/link";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllPlayers } from "../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Header from "../../components/header";
import Title from "../../components/title";
import { getLeaderboard } from "../../lib/functions";

export default function Leaderboard({ leaderboard, preview }) {
  const data = getLeaderboard(leaderboard);

  const DynamicScoreAccumulatedAverageGraphListView = dynamic(() =>
    import("../../components/score-accumulated-average-graph-list-view")
  );

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header />
        <Container>
          <Title>Resultatliste</Title>
          {data.map((list, index) => (
            <div className="flex">
              <div className="flex-none text-4xl md:text-8xl text-orange-400 font-bold w-1/12 mr-10 self-center">
                {index + 1}
              </div>
              <div className="flex-none text-2xl px-5 md:text-4xl self-center">
                {list.average}
              </div>
              <div className="flex-none hidden md:block px-2 w-1/2">
                <DynamicScoreAccumulatedAverageGraphListView
                  data={list.accumulatedAverages}
                />
              </div>
              <div className="flex-grow text-2xl text-purple-700 md:text-6xl font-semibold self-center">
                <Link as={`/players/${list._id}`} href="/players/[slug]">
                  {list.name}
                </Link>
              </div>
            </div>
          ))}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const leaderboard = await getAllPlayers(preview);
  return {
    props: { leaderboard, preview },
  };
}
