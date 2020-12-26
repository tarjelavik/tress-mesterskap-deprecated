import Container from "../components/container";
import Matches from "../components/matches";
import Layout from "../components/layout";
import { getAllMatchesForHome } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Header from "../components/header";
import Intro from "../components/intro";

export default function Index({ allMatches, preview }) {
  const matches = allMatches;
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header />
        <Container>
          <Intro />
          <Matches matches={matches} />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allMatches = await getAllMatchesForHome(preview);
  return {
    props: { allMatches, preview },
  };
}
