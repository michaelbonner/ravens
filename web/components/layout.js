import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Obfuscate from "react-obfuscate";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import ReactPlayer from "react-player/lazy";

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
    title: "About",
    path: "/about",
  },
  {
    title: "Services",
    path: "/services",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Layout = ({
  children,
  title,
  heroImage,
  heroContent = "",
  heroVideoUrl = "",
  backgroundClass = "bg-black",
  fadeIn = false,
}) => {
  const [siteLoaded, setSiteLoaded] = useState(!fadeIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const [heroStyles, setHeroStyles] = useState({});
  const [loadVideo, setLoadVideo] = useState(false);
  const heroRef = useRef(null);

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
    const styles = {};
    if (heroVideoUrl) {
      styles.top = 0;
      styles.right = 0;
      styles.bottom = 0;
      styles.left = 0;
      styles.height = "100%";
    }
    if (heroImage) {
      styles.backgroundImage = `url(${heroImage})`;
      styles.backgroundPosition = `center center`;
      styles.backgroundRepeat = `no-repeat`;
      styles.backgroundSize = `cover`;
    }

    setHeroStyles(styles);
  }, [heroImage, heroVideoUrl]);

  useLayoutEffect(() => {
    setLoadVideo(true);
    setTimeout(() => {
      setSiteLoaded(true);
    }, 300);
  }, []);

  return (
    <div
      className={`${
        siteLoaded ? `opacity-100` : `opacity-0`
      } transition-opacity ease-in delay-300 duration-1000`}
    >
      <div
        className={`${
          heroContent || heroVideoUrl ? `bpd-hero ` : ``
        }relative mx-auto z-20 overflow-visible`}
        style={heroStyles}
        ref={heroRef}
      >
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {loadVideo && heroVideoUrl && (
          <div className="bpd-hero-video-foreground">
            <ReactPlayer
              allow="autoplay; fullscreen; picture-in-picture"
              controls={false}
              frameBorder="0"
              height={`100%`}
              loop={true}
              muted={true}
              playing={true}
              playsinline={true}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
              }}
              title="Ravens Film Works"
              url={heroVideoUrl}
              width={`100%`}
            />
          </div>
        )}
        <header className="relative z-10 lg:container mx-4 lg:mx-auto flex justify-between items-center py-12 overflow-visible">
          <Link href="/">
            <a className="w-3/5 lg:w-72">
              <Image
                width="300"
                height="100"
                src="/images/ravens-logo-white.svg"
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
                } bg-black bg-opacity-25 transform transition-all ease-in duration-300 z-40 right-0 top-14 text-right`}
              >
                <Link href="/work">
                  <a
                    className={`px-4 bg-black bg-opacity-0 hover:bg-opacity-50 block transform py-5 uppercase text-bold text-xl transition-all`}
                  >
                    Work
                  </a>
                </Link>
                <Link href="/about">
                  <a
                    className={`px-4 bg-black bg-opacity-0 hover:bg-opacity-50 block transform py-5 uppercase text-bold text-xl transition-all`}
                  >
                    About
                  </a>
                </Link>
                <Link href="/services">
                  <a
                    className={`px-4 bg-black bg-opacity-0 hover:bg-opacity-50 block transform py-5 uppercase text-bold text-xl transition-all`}
                  >
                    Services
                  </a>
                </Link>
                <Link href="/contact">
                  <a
                    className={`px-4 bg-black bg-opacity-0 hover:bg-opacity-50 block transform py-5 uppercase text-bold text-xl transition-all`}
                  >
                    Contact
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
          <div className="lg:flex justify-center text-gray-300">
            <div className="lg:px-12 lg:border-r-2 border-gray-400 leading-9 tracking-wider lg:text-right">
              <p>
                RAVENS HQ
                <br />
                <a href="https://goo.gl/maps/cBx6BL7eAkibPu9X9">
                  1569 W 2225 S SUITE A<br />
                  Woods Cross, UT 84087
                </a>
              </p>
            </div>
            <div className="lg:px-12 my-8 lg:my-0 lg:border-r-2 border-gray-400 leading-9 tracking-wider lg:text-left">
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
            <div className="lg:px-12 my-8 lg:my-0 leading-9 tracking-wider lg:text-left">
              <p>KAUAI OFFICE</p>
              <p>7000 Olohena Road</p>
              <p>Kapa’a, HI 96746</p>
            </div>
          </div>

          <div className="max-w-3xl mt-12 mx-auto flex items-center justify-center space-x-16">
            <p className="text-gray-300 tracking-wider">AFFILIATE STUDIO:</p>
            <a href="https://www.jmillsent.com/" className="w-32">
              <Image src="/images/jme_logo_box.png" width="433" height="274" />
            </a>
          </div>

          <nav className="flex flex-wrap justify-center lg:justify-between max-w-3xl mx-auto pt-4">
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

          <div className="max-w-5xl mx-auto text-center text-gray-300">
            <p className="py-8">
              &copy; RAVENS FILM WORKS {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default Layout;
