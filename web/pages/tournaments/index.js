import Container from "../../components/container";
import Matches from "../../components/matches";
import Layout from "../../components/layout";
import { getAllTournaments } from "../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Header from "../../components/header";
import Title from "../../components/title";
import Link from 'next/link';

export default function AllTournaments({ allTournaments, preview }) {
  const matches = allTournaments;
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header />
        <Container>
          <Title>Turneringer</Title>
          {allTournaments && allTournaments.map(tournament => (
            <article key={tournament._id}>
              <h1 className='text-4xl mb-5'><Link href={`/tournaments/${tournament._id}`}>{tournament.name}</Link></h1>
            </article>
          ))}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allTournaments = await getAllTournaments(preview);
  return {
    props: { allTournaments, preview },
  };
}
