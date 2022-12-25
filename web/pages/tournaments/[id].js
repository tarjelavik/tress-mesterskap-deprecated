import React from 'react';
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllPlayersByTournament, getAllTournamentsWithID, getTournament } from "../../lib/api";
import Title from "../../components/title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Match from "../../components/match";
import Matches from '../../components/matches';
import Link from 'next/link';
import { getLeaderboard } from '../../lib/functions';
import { orderBy } from 'lodash';

export default function SingleTournament({ tournament, leaderboard, preview }) {
  const router = useRouter();
  if (!router.isFallback && !tournament?._id) {
    return <ErrorPage statusCode={404} />;
  }

  let data = getLeaderboard(leaderboard);
  data = orderBy(data, ["expectedWins"], ["desc"]);


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
                  {tournament.name} | {CMS_NAME}
                </title>
              </Head>

              <h1 className='text-4xl mb-5'>{tournament.name}</h1>

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
                  </React.Fragment>
                ))}
              </div>

              <Matches matches={tournament.matches} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const tournament = await getTournament(params.id, preview);
  const leaderboard = await getAllPlayersByTournament(params.id, preview)
  return {
    props: {
      preview,
      tournament: tournament[0] || null,
      leaderboard: leaderboard
    },
  };
}

export async function getStaticPaths() {
  const allTournaments = await getAllTournamentsWithID();
  return {
    paths:
      allTournaments?.map((tournament) => ({
        params: {
          id: tournament._id,
        },
      })) || [],
    fallback: true,
  };
}
