import React from 'react';
import dynamic from "next/dynamic";
import Link from "next/link";
import Container from "../../components/container";
import Layout from "../../components/layout";
import { getAllPlayers, getMatchesByYear } from "../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Header from "../../components/header";
import Title from "../../components/title";
import { getLeaderboard } from "../../lib/functions";
import { orderBy } from "lodash";

export default function Leaderboard({ years, leaderboard, preview }) {
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
          <div className='flex gap-4 mb-10'>
            {years ? years.map(year => (
              <div className='px-2 py-1 bg-emerald-800 text-white font-bolder text-2xl'><Link href={`/leaderboard/${year}`}>{year}</Link></div>
            )) : null}
          </div>

          <div className="grid grid-cols-12 gap-4 auto-cols-min mb-10">
            <div>#</div>
            <div className="col-span-5">Spiller</div>
            <div className="col-span-2 self-center">Vunnet</div>
            <div className="col-span-2 self-center">Forventet</div>
            <div className="col-span-2 self-center">Gj.snitt</div>
            {data.map((player, index) => (
              <React.Fragment key={player._id}>
                <div className="font-bold mr-5 self-center">
                  {index + 1}
                </div>
                <div className="col-span-5 font-semibold self-center">
                  <Link as={`/players/${player._id}`} href="/players/[slug]">
                    {player.name}
                  </Link>
                  {index === 0 && (
                    " ⭐"
                  )}
                </div>
                <div className="col-span-2 self-center">
                  {player.wins} / {player.played}
                </div>
                <div className="col-span-2 self-center">
                  {player.expectedWins}
                </div>
                <div className="col-span-2 self-center">
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
  const years = await getMatchesByYear();
  return {
    props: { years, leaderboard, preview },
  };
}
