export default function Title({ children }) {
  return (
    <h1 className="text-4xl md:text-2xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}