"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CgWebsite } from "react-icons/cg";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`text-primary text-xs hover:text-white transition ${
          path === url && "text-white border-white"
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  const iconClass = "text-primary w-6 h-6";
  switch (social) {
    case "WEBSITE":
      return <CgWebsite className={iconClass} />;
    case "TWITTER":
      return <AiFillTwitterCircle className={iconClass} />;
    case "YOUTUBE":
      return <AiFillYoutube className={iconClass} />;
    case "LINKEDIN":
      return <FaLinkedin className={iconClass} />;
    case "FACEBOOK":
      return <FaFacebook className={iconClass} />;
    default:
      return null;
  }
}

export default function Footer({
  screenIndustry,
  accessContent,
  aboutUs,
  helpCentre,
  legalLinks,
  socialLinks,
}: {
  logoUrl: string | null;
  logoText: string | null;
  screenIndustry: Array<FooterLink>;
  accessContent: Array<FooterLink>;
  aboutUs: Array<FooterLink>;
  helpCentre: Array<FooterLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}) {
  return (
    <footer className="py-6 bg-color-dark-muted text-gray-50 font-sans">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="space-y-4 md:col-span-1">
            <p className="text-lg font-bold">ACKNOWLEDGEMENT OF COUNTRY</p>
            <div className="flex space-x-4">
              {socialLinks.map((link: FooterLink) => (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center w-10 h-10 rounded-full "
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              ))}
            </div>
            <ul className="space-y-1">
              {legalLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:col-span-1">
            <p className="text-lg font-bold text-white">SCREEN INDUSTRY</p>
            <ul className="space-y-1">
              {screenIndustry.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:col-span-1">
            <p className="text-lg font-bold text-white">ACCESS CONTENT</p>
            <ul className="space-y-1">
              {accessContent.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:col-span-1">
            <p className="text-lg font-bold text-white">HELP CENTRE</p>
            <ul className="space-y-1">
              {helpCentre.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
          <div className="space-y-4 md:col-span-1">
            <p className="text-lg font-bold text-white">ABOUT US</p>
            <ul className="space-y-1">
              {aboutUs.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between"></div>
      </div>
    </footer>
  );
}
