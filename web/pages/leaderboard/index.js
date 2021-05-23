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
import { orderBy } from "lodash";

export default function Leaderboard({ leaderboard, preview }) {
  let data = getLeaderboard(leaderboard);
  data = orderBy(data, ["expectedWins"], ["desc"]);

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
          <div className="grid grid-cols-5 gap-4 auto-cols-min">
            <div></div>
            <div></div>
            <div>Seirer</div>
            <div>Forventet</div>
            <div>Gj.snitt</div>
            {data.map((list, index) => (
              <>
                <div className="text-2xl md:text-4xl text-orange-400 font-bold mr-5 self-center">
                  {index + 1}
                </div>
                <div className="text-2xl text-purple-700 md:text-4xl font-semibold self-center">
                  <Link as={`/players/${list._id}`} href="/players/[slug]">
                    {list.name}
                  </Link>
                </div>
                <div className="text-2xl px-5 md:text-4xl self-center">
                  {list.wins}
                </div>
                <div className="text-2xl px-5 md:text-4xl self-center">
                  {list.expectedWins}
                </div>
                <div className="text-2xl px-5 md:text-4xl self-center">
                  {list.average}
                </div>
                {/* <div className="md:block px-2 w-1/2">
                <DynamicScoreAccumulatedAverageGraphListView
                  data={list.accumulatedAverages}
                />
              </div> */}
              </>
            ))}
          </div>
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
