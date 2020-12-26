import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { getAllPlayersWithID, getPlayer } from "../../lib/api";
import Title from "../../components/title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import AverageScore from "../../components/average-score";
import PlayerImage from "../../components/player-image";

export default function Player({ player, preview }) {
  const router = useRouter();
  if (!router.isFallback && !player?._id) {
    return <ErrorPage statusCode={404} />;
  }

  const DynamicComponent = dynamic(() =>
    import("../../components/score-graph")
  );

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
                  {player.name} | {CMS_NAME}
                </title>
              </Head>
              <div class="flex gap-4">
                <div class="w-16 h-16 relative mb-4">
                  <div class="group w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple table cursor-pointer">
                    {player.mainRepresentation && (
                      <PlayerImage
                        slug={player.slug}
                        title={player.name}
                        url={player.mainRepresentation}
                      />
                    )}
                    {!player.mainRepresentation && (
                      <img
                        src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
                        alt="lovely avatar"
                        class="object-cover object-center w-full h-full visible group-hover:hidden"
                      />
                    )}
                  </div>
                </div>
                <div className="col-span-10">
                  <Title>{player.name}</Title>
                </div>
              </div>

              <div id="stats" class="max-w-xl px-4 py-4 mx-auto">
                <div class="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                  <div class="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded">
                    <AverageScore player={player._id} games={player.games} />
                  </div>

                  {/* <div
                    class="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0"
                  >
                    <div>
                      <div>
                        <p class="flex items-center justify-end text-red-500 text-md">
                          <span class="font-bold">6%</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path
                              class="heroicon-ui"
                              d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"
                            />
                          </svg>
                        </p>
                      </div>
                      <p class="text-3xl font-semibold text-center text-gray-800">
                        43
                      </p>
                      <p class="text-lg text-center text-gray-500">
                        New Tickets
                      </p>
                    </div>
                  </div>

                  <div
                    class="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0"
                  >
                    <div>
                      <div>
                        <p class="flex items-center justify-end text-gray-500 text-md">
                          <span class="font-bold">0%</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path
                              class="heroicon-ui"
                              d="M17 11a1 1 0 010 2H7a1 1 0 010-2h10z"
                            />
                          </svg>
                        </p>
                      </div>
                      <p class="text-3xl font-semibold text-center text-gray-800">
                        43
                      </p>
                      <p class="text-lg text-center text-gray-500">
                        New Tickets
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
              <div class="mb-10">
                <DynamicComponent player={player._id} games={player.games} />
              </div>
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPlayer(params.id, preview);
  return {
    props: {
      preview,
      player: data[0] || null,
    },
  };
}

export async function getStaticPaths() {
  const allPlayers = await getAllPlayersWithID();
  return {
    paths:
      allPlayers?.map((player) => ({
        params: {
          id: player._id,
        },
      })) || [],
    fallback: true,
  };
}
