"use client";

import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  FaUserAlt,
  FaSearch,
  FaUniversalAccess,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface DropdownMenuProps {
  title: string;
  links: Array<{ id: number; url: string; text: string }>;
}
interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center text-primary font-din font-semibold mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, links }) => {
  return (
    <li className="relative group">
      <button className="flex items-center text-primary font-din font-semibold -mb-1 px-2 py-1 border-b-2 border-transparent group-hover:text-white group-hover:bg-primary transition-colors duration-300">
        {title}
        <span className="pl-1">
          <MdOutlineKeyboardArrowDown className="w-5 h-5" />
        </span>
      </button>
      <ul className="absolute left-0 hidden mt-1 space-y-2 bg-white shadow-lg group-hover:block w-64">
        {links.map(({ id, url, text }) => (
          <li key={id} className="border-b border-gray-100">
            <Link
              href={url}
              className="block px-4 py-2 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-primary hover:bg-primary hover:text-white ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  screenIndustryServices,
  accessContent,
  culturalFund,
  news,
  resources,
  aboutUs,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  screenIndustryServices: Array<NavLink>;
  accessContent: Array<NavLink>;
  culturalFund: Array<NavLink>;
  news: Array<NavLink>;
  resources: Array<NavLink>;
  aboutUs: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="bg-white text-gray-900">
      <div className="flex justify-between h-16 mx-auto px-0 sm:px-6">
        <div className="flex items-center space-x-4">
          <a href="#" className="px-4 text-primary hover:text-blue-500">
            <FaUserAlt className="h-5 w-5" />
          </a>
          <a href="#" className="px-4 text-primary hover:text-blue-500">
            <FaPhoneAlt className="h-5 w-5" />
          </a>
          <a href="#" className="px-4 text-primary hover:text-blue-500">
            <FaSearch className="h-5 w-5" />
          </a>
          <a href="#" className="px-4 text-primary hover:text-blue-500">
            <FaUniversalAccess className="h-5 w-5" />
          </a>
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-2 lg:flex">
            <DropdownMenu
              title="SCREEN INDUSTRY SERVICES"
              links={screenIndustryServices}
            />
            <DropdownMenu title="ACCESS CONTENT" links={accessContent} />
            <DropdownMenu title="CULTURAL FUND" links={culturalFund} />
            <NavLink id={0} url="/news" newTab={false} text="NEWS" />
            <DropdownMenu title="RESOURCES" links={resources} />
            <DropdownMenu title="ABOUT US" links={aboutUs} />
          </ul>
        </div>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" />{" "}
          {/* Overlay */}
          <Dialog.Panel className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Strapi</span>
                {logoUrl && <img className="h-8 w-auto" src={logoUrl} alt="" />}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  {links.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        <div className="flex justify-center rounded-lg shadow-2xl h-20 w-44 relative bg-white">
          <Logo src={logoUrl} />
        </div>
        <button
          className="p-4 lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-7 w-7 text-gray-900" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
