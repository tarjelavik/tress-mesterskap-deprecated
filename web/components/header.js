import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav class="flex justify-between w-full p-4">
        <a href="/">
          <span class="font-semibold text-xl tracking-tight">
            Tress-mesterskap
          </span>
        </a>
        <div class="md:items-center md:w-auto flex">
          <div class="md:flex hidden">
            <a class="block mr-4" href="/match">
              Slag
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
