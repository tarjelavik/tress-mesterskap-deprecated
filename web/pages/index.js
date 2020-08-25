import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllMatchesForHome } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Header from '../components/header'
// import Header from '../components/header'

export default function Index({ allMatches, preview }) {
  const heroMatch = allMatches[0]
  const moreMatches = allMatches.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{CMS_NAME}</title>
        </Head>
        <Header />
        <Container>
        {/* <Header /> */}
          {/* <Intro /> */}
          {heroMatch && (
            <HeroPost
              title={heroMatch.name}
              coverImage={heroMatch.mainRepresentation}
              date={heroMatch.gameStart}
              // author={heroMatch.author}
              slug={heroMatch._id}
              excerpt={heroMatch.description}
              results={heroMatch.results}
            />
          )}
          {moreMatches.length > 0 && <MoreStories matches={moreMatches} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allMatches = await getAllMatchesForHome(preview)
  return {
    props: { allMatches, preview },
  }
}
