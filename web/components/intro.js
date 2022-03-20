import { CMS_NAME, CMS_URL } from "../lib/constants";

export default function Intro() {
  return (
    <section className="py-4 px-5 mb-8 md:mb-12 bg-gray-200">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight md:pr-8 text-gray-800">
        {CMS_NAME}
      </h1>
      <h4 className="text-right text-xl md:text-2xl lg:text-3xl mt-5 text-gray-600">
        ...det tar aldri slutt
      </h4>
    </section>
  );
}
