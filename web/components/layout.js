/* eslint-disable @next/next/no-img-element */
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
  fadeIn = false,
  description = "We are skilled technicians with a unique sensibility for storytelling. RAVENS can execute nearly any mission from heavy lift aerials to pursuit tracking or technical phantom flex high speed work.",
}) => {
  const [siteLoaded, setSiteLoaded] = useState(!fadeIn);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const [heroStyles, setHeroStyles] = useState({});
  const [loadVideo, setLoadVideo] = useState(false);
  const heroRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState("");

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
    // if (heroImage) {
    //   styles.backgroundImage = `url(${heroImage})`;
    //   styles.backgroundPosition = `center center`;
    //   styles.backgroundRepeat = `no-repeat`;
    //   styles.backgroundSize = `cover`;
    // }

    if (videoPlaying) {
      styles.backgroundImage = "";
    }

    setHeroStyles(styles);
  }, [heroImage, heroVideoUrl, videoPlaying]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoadVideo(true);
      setSiteLoaded(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }

    return () => {
      document.body.style.overflow = "inherit";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setMenuVisible(false);
      setMenuOpen(false);
    };
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      <div
        className={`${
          siteLoaded ? `opacity-100` : `opacity-0`
        } transition-opacity ease-in delay-300 duration-1000 ui-header-and-content`}
      >
        <div className="absolute w-full top-12 lg:top-16">
          <div className="relative z-50 lg:container mx-auto flex justify-end items-center overflow-visible">
            <button
              className="w-12 h-8 focus:outline-none absolute top-0 lg:top-4 right-4 lg:right-0"
              onClick={() => toggleMenu(!menuOpen)}
              aria-label="Close menu"
            >
              <span
                className={`${menuOpen ? "opacity-100" : "opacity-0"} ${
                  menuVisible ? "absolute" : "hidden"
                } top-0 right-0 transform transition-all ease-in delay-500 duration-300`}
                style={{ width: "48px", height: "32px" }}
              >
                <Image
                  alt="Close menu"
                  className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                  src={`/images/menu-close.svg`}
                  layout="fill"
                />
              </span>
            </button>
          </div>
        </div>
        <nav
          className={`${
            menuOpen ? "translate-x-0" : "translate-x-4 opacity-0"
          } ${
            menuVisible ? "fixed" : "hidden"
          } inset-0 bg-black transform transition-all ease-in duration-300 z-40 text-right flex flex-col justify-center items-center`}
        >
          <Link href="/work">
            <a
              className={`${
                !hoveredMenuItem || hoveredMenuItem === "/work"
                  ? "text-white"
                  : "text-gray-400"
              } relative group py-6 uppercase text-bold text-3xl md:text-4xl transition-all duration-700 w-64 text-center`}
              onMouseEnter={() => setHoveredMenuItem("/work")}
              onMouseLeave={() => setHoveredMenuItem("")}
            >
              <span className="relative z-10">Work</span>
              <span
                className={`${
                  hoveredMenuItem === "/work" ? "w-full" : "w-0"
                } transition-all duration-500 absolute z-0 left-0 right-0 bg-gold`}
                style={{ bottom: "calc(50% - 1px)", height: "2px" }}
              ></span>
            </a>
          </Link>
          <Link href="/about">
            <a
              className={`${
                !hoveredMenuItem || hoveredMenuItem === "/about"
                  ? "text-white"
                  : "text-gray-400"
              } relative group py-6 uppercase text-bold text-3xl md:text-4xl transition-all duration-700 w-64 text-center`}
              onMouseEnter={() => setHoveredMenuItem("/about")}
              onMouseLeave={() => setHoveredMenuItem("")}
            >
              <span className="relative z-10">About</span>
              <span
                className={`${
                  hoveredMenuItem === "/about" ? "w-full" : "w-0"
                } transition-all duration-500 absolute z-0 left-0 right-0 bg-gold`}
                style={{ bottom: "calc(50% - 1px)", height: "2px" }}
              ></span>
            </a>
          </Link>
          <Link href="/services">
            <a
              className={`${
                !hoveredMenuItem || hoveredMenuItem === "/services"
                  ? "text-white"
                  : "text-gray-400"
              } relative group py-6 uppercase text-bold text-3xl md:text-4xl transition-all duration-700 w-64 text-center`}
              onMouseEnter={() => setHoveredMenuItem("/services")}
              onMouseLeave={() => setHoveredMenuItem("")}
            >
              <span className="relative z-10">Services</span>
              <span
                className={`${
                  hoveredMenuItem === "/services" ? "w-full" : "w-0"
                } transition-all duration-500 absolute z-0 left-0 right-0 bg-gold`}
                style={{ bottom: "calc(50% - 1px)", height: "2px" }}
              ></span>
            </a>
          </Link>
          <Link href="/contact">
            <a
              className={`${
                !hoveredMenuItem || hoveredMenuItem === "/contact"
                  ? "text-white"
                  : "text-gray-400"
              } relative group py-6 uppercase text-bold text-3xl md:text-4xl transition-all duration-700 w-64 text-center`}
              onMouseEnter={() => setHoveredMenuItem("/contact")}
              onMouseLeave={() => setHoveredMenuItem("")}
            >
              <span className="relative z-10">Contact</span>
              <span
                className={`${
                  hoveredMenuItem === "/contact" ? "w-full" : "w-0"
                } transition-all duration-500 absolute z-0 left-0 right-0 bg-gold`}
                style={{ bottom: "calc(50% - 1px)", height: "2px" }}
              ></span>
            </a>
          </Link>
        </nav>

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
            <meta name="theme-color" content="#967738" />
            <link rel="preconnect" href="https://player.vimeo.com" />
            <link rel="preconnect" href="https://i.vimeocdn.com" />
            <link rel="preconnect" href="https://f.vimeocdn.com" />

            <meta
              data-react-helmet="true"
              name="description"
              content={description}
            />
            <meta
              data-react-helmet="true"
              property="og:title"
              content={title}
            />
            <meta
              data-react-helmet="true"
              property="og:image"
              content="/og-image.jpg"
            />
            <meta
              data-react-helmet="true"
              property="og:description"
              content={description}
            />
            <meta
              data-react-helmet="true"
              property="og:type"
              content="website"
            />
            <meta data-react-helmet="true" name="author" content="RAVENS" />

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#967738"
            />
            <meta name="msapplication-TileColor" content="#967738" />
          </Head>
          {loadVideo && heroVideoUrl && (
            <div className="bpd-hero-foreground absolute z-0 h-full w-full inset-0">
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
                onPlay={() => {
                  setTimeout(() => {
                    setVideoPlaying(true);
                  }, 200);
                }}
                title="Ravens Film Works"
                url={heroVideoUrl}
                width={`100%`}
              />
            </div>
          )}

          {heroImage && (
            <div
              className={`absolute z-0 h-full w-full inset-0 ${
                videoPlaying ? `opacity-0` : `opacity-100`
              }`}
            >
              <img
                alt={title}
                className="h-full w-full object-cover"
                src={heroImage}
                style={{
                  pointerEvents: "none",
                }}
              />
            </div>
          )}
          <header className="flex items-center relative z-10 lg:container mx-4 lg:mx-auto justify-between py-8 lg:py-12 overflow-visible">
            <Link href="/">
              <a className="w-1/3 lg:w-64 pt-2">
                <Image
                  width="270"
                  height="90"
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
                  aria-label="Open menu"
                >
                  <span
                    className={`${!menuOpen ? "opacity-100" : "opacity-0"} ${
                      !menuVisible ? "absolute" : "hidden"
                    } top-0 right-0 w-12 h-8 transform transition-all ease-in duration-300`}
                  >
                    <Image
                      alt="Open menu"
                      className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                      src={`/images/menu.svg`}
                      layout="fill"
                    />
                  </span>
                </button>
              </div>
            </div>
          </header>

          {heroContent}
        </div>
        <div className={`relative z-10 px-4`}>
          <ToastContainer />
          <main>{children}</main>
        </div>
      </div>
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
            <Image
              alt="JmillsENT"
              height="274"
              src="/images/jme_logo_box.png"
              width="433"
            />
          </a>
        </div>

        <nav className="flex flex-wrap justify-center max-w-3xl mx-auto pt-4">
          {navLinks.map((navLink) => {
            return (
              <Link key={navLink.path} href={navLink.path}>
                <a
                  className={`${
                    router.pathname === navLink.path ? `text-gold ` : ``
                  } px-6 outline-none transform pt-6 uppercase text-bold`}
                >
                  {navLink.title}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 max-w-5xl mx-auto text-center text-gray-300">
          <p className="py-8">
            &copy; RAVENS FILM WORKS {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
};
export default Layout;
