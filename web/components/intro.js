import { CMS_NAME, CMS_URL } from "../lib/constants";

export default function Intro() {
  return (
    <section className="py-4 px-10 mb-8 md:mb-12 bg-pink-300">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-pink-800">
        {CMS_NAME}
      </h1>
      <h4 className="md:text-left text-4xl mt-5 text-pink-600">
        ...det tar aldri slutt
      </h4>
    </section>
  );
}
