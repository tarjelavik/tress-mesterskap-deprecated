import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllMatchesWithID, getMatchAndMoreMatches } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'

export default function Match({ match, moreMatches, preview }) {
  const router = useRouter()
  if (!router.isFallback && !match?._id) {
    return <ErrorPage statusCode={404} />
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
                  {match.name} | {CMS_NAME}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={match.name}
                coverImage={match.mainRepresentation}
                date={match.gameStart}
                // author={post.author}
              />
              <PostBody content={match.description} />
            </article>
            <SectionSeparator />
            {moreMatches.length > 0 && <MoreStories matches={moreMatches} />}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getMatchAndMoreMatches(params.id, preview)
  return {
    props: {
      preview,
      match: data?.match || null,
      moreMatches: data?.moreMatches || null,
    },
  }
}

export async function getStaticPaths() {
  const allMatches = await getAllMatchesWithID()
  return {
    paths:
      allMatches?.map((match) => ({
        params: {
          id: match.id,
        },
      })) || [],
    fallback: true,
  }
}
