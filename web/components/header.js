import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between w-full pt-4 pb-4">
        <a href="/">
          <span className="font-semibold text-xl tracking-tight">
            Tress-mesterskap
          </span>
        </a>
        <div className="md:items-center md:w-auto flex">
          <div className="md:flex hidden">
            <a className="block mr-4" href="/players">
              Spillere
            </a>
          </div>
          <div className="md:flex hidden">
            <a className="block mr-4" href="/match">
              Slag
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
