import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Obfuscate from "react-obfuscate";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.min.css";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Work",
    path: "/work",
  },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "About",
    path: "/about",
  },
];

const Layout = ({
  children,
  title,
  heroImage,
  heroContent = "",
  heroVideoUrl = "",
  backgroundClass = "bg-black",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const [heroStyles, setHeroStyles] = useState({});

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(!menuOpen);
      setTimeout(() => {
        setMenuVisible(!menuOpen);
      }, 100);
    } else {
      setMenuVisible(!menuOpen);
      setTimeout(() => {
        setMenuOpen(!menuOpen);
      }, 100);
    }
  };

  useEffect(() => {
    if (heroVideoUrl) {
      setHeroStyles({
        position: "relative",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      });
    } else if (heroImage) {
      setHeroStyles({
        background: `url(${heroImage}) center center no-repeat`,
        backgroundSize: `cover`,
        minHeight: `70vh`,
      });
    }
  }, [heroImage, heroVideoUrl]);

  return (
    <>
      <div
        className="relative mx-auto z-20 overflow-x-hidden"
        style={heroStyles}
      >
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {heroVideoUrl && (
          <div className="bpd-hero-video-foreground absolute z-0 inset-0 h-full w-full">
            <iframe
              src={heroVideoUrl}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen={true}
              title="Ravens Film Works"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            ></iframe>
          </div>
        )}
        <header className="relative z-10 lg:container mx-4 lg:mx-auto flex justify-between items-center py-12">
          <Link href="/">
            <a className="w-2/3 lg:w-72">
              <Image
                width="300"
                height="100"
                src="/images/ravens-logo-white-gold.svg"
                alt="Ravens Logo"
              />
            </a>
          </Link>
          <div className="relative flex justify-end items-center">
            <Link href="/contact">
              <a className="hidden lg:inline-block rounded-full font-bold uppercase tracking-wider border border-white py-2 px-8 text-sm hover:bg-gold hover:text-black transition-all">
                Get in Touch
              </a>
            </Link>
            <div className="relative lg:ml-8 lg:mr-0">
              <button
                className="w-12 h-8 focus:outline-none relative"
                onClick={() => toggleMenu(!menuOpen)}
              >
                <span
                  className={`${menuOpen ? "opacity-100" : "opacity-0"} ${
                    menuVisible ? "absolute" : "hidden"
                  } top-0 right-0 w-12 h-8 transform transition-all ease-in duration-300`}
                >
                  <Image
                    className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                    src={`/images/menu-close.svg`}
                    layout="fill"
                  />
                </span>
                <span
                  className={`${!menuOpen ? "opacity-100" : "opacity-0"} ${
                    !menuVisible ? "absolute" : "hidden"
                  } top-0 right-0 w-12 h-8 transform transition-all ease-in duration-300`}
                >
                  <Image
                    className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                    src={`/images/menu.svg`}
                    layout="fill"
                  />
                </span>
              </button>
              <div
                className={`${
                  menuOpen
                    ? "translate-x-0 opacity-90"
                    : "translate-x-4 opacity-0"
                } ${
                  menuVisible ? "absolute" : "hidden"
                } transform transition-all ease-in duration-300 z-40 right-0 top-14 text-right`}
              >
                <Link href="/work">
                  <a
                    className={`block transform py-6 uppercase text-bold text-xl`}
                  >
                    Work
                  </a>
                </Link>
                <Link href="/services">
                  <a
                    className={`block transform py-6 uppercase text-bold text-xl`}
                  >
                    Services
                  </a>
                </Link>
                <Link href="/contact">
                  <a
                    className={`block transform py-6 uppercase text-bold text-xl`}
                  >
                    Contact
                  </a>
                </Link>
                <Link href="/about">
                  <a
                    className={`block transform py-6 uppercase text-bold text-xl`}
                  >
                    About
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {heroContent}
      </div>
      <div className={`${backgroundClass} relative z-10 px-4`}>
        <ToastContainer />
        <main>{children}</main>
        <footer className="text-center lg:text-left mt-16">
          <h2 className="font-bold text-3xl text-center my-12 uppercase">
            Contact Us
          </h2>
          <div className="lg:flex justify-center">
            <div className="lg:pr-8 lg:border-r-2 border-gold leading-9 tracking-wider lg:text-right">
              <p>
                RAVENS FILM WORKS
                <br />
                <a href="https://goo.gl/maps/cBx6BL7eAkibPu9X9">
                  1569 W 2225 S<br />
                  Woods Cross, UT 84087
                </a>
              </p>
            </div>
            <div className="lg:pl-8 pt-12 lg:pt-0 leading-9 tracking-wider">
              <p>
                <span className="mr-2">P:</span>
                <Obfuscate tel="801-971-4683" />
                <br />
                <span className="mr-2">E:</span>
                <Obfuscate email="info@ravens.works" />
                <br />
                <a href="https://www.instagram.com/ravensfilmworks/">
                  <svg
                    className="w-4 h-4 text-white fill-current inline mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <title>Logo Instagram</title>
                    <path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z" />
                    <path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z" />
                  </svg>
                  @ravensfilmworks
                </a>
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center lg:justify-between max-w-3xl mx-auto pt-12">
            {navLinks.map((navLink) => {
              return (
                <Link key={navLink.path} href={navLink.path}>
                  <a
                    className={
                      router.pathname === navLink.path
                        ? `text-gold px-4 outline-none transform py-6 uppercase text-bold`
                        : `px-4 outline-none transform py-6 uppercase text-bold`
                    }
                  >
                    {navLink.title}
                  </a>
                </Link>
              );
            })}
          </nav>

          <div className="prose lg:mt-12 max-w-5xl mx-auto text-center">
            <p className="py-10">
              &copy; RAVENS FILM WORKS {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Layout;
