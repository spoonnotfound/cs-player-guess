import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="transition-height fixed top-0 z-50 h-[3.75rem] w-screen px-4 max-sd:h-11 md:px-7 sd:px-5 h-[3.75rem] bg-background">
      <div className="relative flex h-full flex-nowrap items-center gap-5 max-sd:justify-between">
        <button aria-label="Open Menu" className="sd:hidden">
          <Image
            src="https://ext.same-assets.com/1433263999/1379301122.svg"
            alt="Menu"
            width={20}
            height={20}
          />
        </button>

        <Link
          href="/"
          title="Go to homepage"
          className="block group box-content shrink-0 border-b-2 p-3 transition-all max-sd:absolute max-sd:right-0 max-sd:left-0 max-sd:m-auto max-sd:max-w-6 opacity-100 border-transparent"
        >
          <Image
            className="h-4 w-auto transition-all group-hover:scale-125"
            alt="Home"
            src="https://ext.same-assets.com/0/1834679437.svg"
            width={20}
            height={16}
          />
        </Link>

        <button className="relative flex items-center gap-2 rounded bg-[#2a133a] px-5 py-3 max-md:w-full max-md:justify-start md:min-w-48 max-sd:hidden">
          <Image
            src="https://ext.same-assets.com/0/138029387.svg"
            alt="CS2"
            className="block size-7 shrink-0 sd:size-4"
            width={28}
            height={28}
          />
          <span className="font-style-label-l1 sd:font-style-label-l4">CS2</span>
          <Image
            src="https://ext.same-assets.com/1433263999/1379301122.svg"
            alt="Dropdown"
            width={16}
            height={16}
          />
        </button>

        <div className="flex size-full flex-nowrap gap-5 transition-opacity delay-200 duration-300 max-sd:hidden">
          <NavItem href="/tournaments" text="Tournaments" />
          <NavItem href="/austin-major-2025" text="Austin Major" />
          <NavItem href="/mini-games" text="mini-games" />
          <Link
            href="/article"
            className="flex h-full items-center border-y-2 border-transparent text-center font-style-label-l4 whitespace-nowrap text-foreground-100 transition-all hover:text-foreground-95 text-foreground hover:text-foreground/95"
          >
            NEWS
          </Link>
          <Link
            href="/shop"
            className="flex h-full items-center border-y-2 border-transparent text-center font-style-label-l4 whitespace-nowrap text-foreground-100 transition-all hover:text-foreground-95 text-foreground hover:text-foreground/95"
            target="_blank"
            rel="noreferrer"
          >
            SHOP
            <Image
              src="https://ext.same-assets.com/1433263999/1379301122.svg"
              alt="External Link"
              width={16}
              height={16}
            />
          </Link>
          <NavItem href="/counter-strikle/daily" text="OTHER" current />
        </div>

        <div className="ml-auto flex flex-nowrap items-center gap-1 max-sd:hidden">
          <button className="p-3 font-style-label-l3 whitespace-nowrap text-foreground transition-all hover:text-foreground/95">
            Log in
          </button>
          <button className="button px-3 whitespace-nowrap">
            Join The Community
          </button>
        </div>

        <button
          className="size-8 rounded-full border border-solid border-white sd:hidden"
          aria-label="Join The Community"
        >
          <Image
            src="https://ext.same-assets.com/1433263999/1379301122.svg"
            alt="Join"
            width={20}
            height={20}
          />
        </button>
      </div>
    </nav>
  );
};

type NavItemProps = {
  href: string;
  text: string;
  current?: boolean;
};

const NavItem = ({ href, text, current = false }: NavItemProps) => {
  return (
    <div className={`relative flex h-full items-center border-y-2 ${current ? 'border-b-primary' : 'border-transparent'}`}>
      <Link
        href={href}
        className="group flex h-full cursor-pointer content-center items-center gap-1 font-style-label-l4"
      >
        <span className="text-foreground group-hover:text-foreground/95">{text}</span>
        <Image
          src="https://ext.same-assets.com/1433263999/1379301122.svg"
          alt="Dropdown"
          width={16}
          height={16}
        />
      </Link>
    </div>
  );
};

export default Navbar;
