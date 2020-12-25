import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllMatchesWithID, getMatchAndMoreMatches } from "../../lib/api";
import Title from "../../components/title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import Match from "../../components/match";

export default function SingleMatch({ match, preview }) {
  const router = useRouter();
  if (!router.isFallback && !match?._id) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <Title>Loading…</Title>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {match.name} | {CMS_NAME}
                </title>
              </Head>
              <Match match={match} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getMatchAndMoreMatches(params.id, preview);
  return {
    props: {
      preview,
      match: data?.match || null,
      moreMatches: data?.moreMatches || null,
    },
  };
}

export async function getStaticPaths() {
  const allMatches = await getAllMatchesWithID();
  return {
    paths:
      allMatches?.map((match) => ({
        params: {
          id: match.id,
        },
      })) || [],
    fallback: true,
  };
}
