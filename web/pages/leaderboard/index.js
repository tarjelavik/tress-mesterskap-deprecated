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
import React from 'react';

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
          <div className="grid grid-cols-5 gap-4 auto-cols-min mb-10">
            <div></div>
            <div></div>
            <div className="self-center">Seirer</div>
            <div className="self-center">Forventet</div>
            <div className="self-center">Gj.snitt</div>
            {data.map((player, index) => (
              <React.Fragment key={player._id}>
                <div className="font-bold mr-5 self-center">
                  {index + 1}
                </div>
                <div className="font-semibold self-center">
                  <Link as={`/players/${player._id}`} href="/players/[slug]">
                    {player.name}
                  </Link>
                </div>
                <div className="px-5 self-center">
                  {player.wins} / {player.played}
                </div>
                <div className="px-5 self-center">
                  {player.expectedWins}
                </div>
                <div className="px-5 self-center">
                  {player.average}
                </div>
                {/* <div className="md:block px-2 w-1/2">
                <DynamicScoreAccumulatedAverageGraphplayerView
                  data={player.accumulatedAverages}
                />
              </div> */}
              </React.Fragment>
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
