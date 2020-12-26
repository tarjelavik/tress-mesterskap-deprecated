import Container from "../../components/container";
import Matches from "../../components/matches";
import Layout from "../../components/layout";
import { getAllPlayers } from "../../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Header from "../../components/header";
import Players from "../../components/players";
import Title from "../../components/title";

export default function AllPlayers({ allPlayers, preview }) {
  const players = allPlayers;
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header />
        <Container>
          <Title>Spillere</Title>
          <Players players={players} />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPlayers = await getAllPlayers(preview);
  return {
    props: { allPlayers, preview },
  };
}
