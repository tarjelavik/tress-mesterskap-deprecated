import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <header>
      <nav className="flex items-center flex-wrap bg-yellow-300 p-3">
        <a href="/">
          <span className="font-semibold text-xl text-blue-500 tracking-tight mr-10">
            Tressmesterskap
          </span>
        </a>
        <button
          onClick={handleClick}
          className="focus:outline-none inline-flex p-2 hover:bg-blue-300 rounded lg:hidden ml-auto text-blue-700 hover:text-blue-100 outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        >
          <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink-500 font-bold items-center justify-center hover:bg-yellow-400 hover:text-white">
            <a className="block" href="/leaderboard">
              Resultatliste
            </a>
          </div>
          {/* <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink-500 font-bold items-center justify-center hover:bg-yellow-400 hover:text-white">
            <a className="block" href="/players">
              Spillere
            </a>
          </div> */}
          <div className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-pink-500 font-bold items-center justify-center hover:bg-yellow-400 hover:text-white">
            <a className="block" href="/match">
              Slag
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
