import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex w-full flex-col justify-center">
      <div className="m-auto flex w-full flex-col items-center justify-center gap-10 py-10 no-underline lg:w-fit lg:py-0" style={{ minHeight: "20rem" }}>
        <div className="flex flex-col place-items-center gap-5 px-7 text-neutral lg:flex-row lg:place-content-between lg:items-center lg:gap-12">
          <FooterLink href="/privacy-policy" text="Terms of use" />
          <FooterLink href="https://about.blast.tv/" text="About" external />
          <FooterLink href="mailto:support@blast.tv" text="Support@blast.tv" />
          <FooterLink href="/press" text="Press" />

          <div className="flex w-full place-content-center items-center justify-between lg:w-fit lg:gap-12">
            <SocialLink href="https://twitter.com/BLASTtv" label="Open BLAST X account in a new window" />
            <SocialLink href="https://www.instagram.com/blastpremier" label="Open BLAST instagram account in a new window" />
            <SocialLink href="https://www.tiktok.com/@blasttv" label="Open BLAST tiktok account in a new window" />
          </div>
        </div>

        <div className="w-full text-center">
          <span className="font-style-body-b2 text-neutral">BLAST ApS., Hauser Plads 1, 3., 1127 Copenhagen</span>
        </div>
      </div>
    </div>
  );
};

type FooterLinkProps = {
  href: string;
  text: string;
  external?: boolean;
};

const FooterLink = ({ href, text, external = false }: FooterLinkProps) => {
  return (
    <div>
      <Link
        className="line-clamp-1 text-inherit no-underline"
        href={href}
        rel="noreferrer"
        target={external ? "_blank" : "_self"}
      >
        <p className="font-style-label-l3 text-neutral hover:text-white transition-colors">{text}</p>
      </Link>
    </div>
  );
};

type SocialLinkProps = {
  href: string;
  label: string;
};

const SocialLink = ({ href, label }: SocialLinkProps) => {
  return (
    <Link
      className="no-underline mx-2"
      href={href}
      rel="noreferrer"
      target="_blank"
      aria-label={label}
    />
  );
};

export default Footer;
