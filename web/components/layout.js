/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Obfuscate from "react-obfuscate";
import ReactPlayer from "react-player/lazy";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Work", path: "/work" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
];

const Layout = ({
  children,
  title,
  heroImage,
  heroContent,
  heroVideoUrl,
  description = "RAVENS Film Works creates specialty film work, from aerials to pursuit tracking and high speed photography.",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState(null);
  const router = useRouter();
  const hasHero = Boolean(heroContent || heroImage || heroVideoUrl);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.asPath]);

  return (
    <div className="site-shell">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f0f0e" />
        <link
          rel="canonical"
          href={`https://ravensfilmworks.com${router.asPath}`}
        />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="author" content="RAVENS" />
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
      </Head>

      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/">
            <a className="site-logo" aria-label="RAVENS Film Works homepage">
              <img
                src="/images/ravens-logo-white.svg"
                alt="RAVENS Film Works"
              />
            </a>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map(({ title: label, path }) => (
              <Link href={path} key={path}>
                <a aria-current={router.pathname === path ? "page" : undefined}>
                  {label}
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <a className="nav-contact">Get in touch</a>
            </Link>
          </nav>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
            <span aria-hidden="true">{menuOpen ? "×" : "+"}</span>
          </button>
        </div>
        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            {[...navLinks, { title: "Contact", path: "/contact" }].map(
              ({ title: label, path }) => (
                <Link href={path} key={path}>
                  <a
                    aria-current={router.pathname === path ? "page" : undefined}
                  >
                    {label}
                  </a>
                </Link>
              )
            )}
          </nav>
        )}
      </header>

      {hasHero && (
        <section className="site-hero" aria-label="Page introduction">
          {heroImage && (
            <img
              className={`site-hero-image${
                videoPlaying && videoAspectRatio ? " is-hidden" : ""
              }`}
              src={heroImage}
              alt=""
            />
          )}
          {heroVideoUrl && (
            <div
              className="site-hero-video"
              aria-hidden="true"
              style={{
                "--hero-video-aspect": videoAspectRatio || 16 / 9,
                "--hero-video-inverse-aspect": videoAspectRatio
                  ? 1 / videoAspectRatio
                  : 9 / 16,
              }}
            >
              <ReactPlayer
                url={heroVideoUrl}
                width="100%"
                height="100%"
                muted
                playing
                loop
                playsinline
                controls={false}
                onReady={(player) => {
                  const vimeoPlayer = player.getInternalPlayer();
                  Promise.all([
                    vimeoPlayer.getVideoWidth(),
                    vimeoPlayer.getVideoHeight(),
                  ])
                    .then(([width, height]) => {
                      setVideoAspectRatio(width / height);
                    })
                    .catch(() => setVideoAspectRatio(16 / 9));
                }}
                onPlay={() => setVideoPlaying(true)}
              />
            </div>
          )}
          <div className="site-hero-shade" />
          <div className="site-hero-inner">{heroContent}</div>
        </section>
      )}

      <ToastContainer />
      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div className="footer-brand">
            <Link href="/">
              <a aria-label="RAVENS Film Works homepage">
                <img
                  src="/images/ravens-logo-white.svg"
                  alt="RAVENS Film Works"
                />
              </a>
            </Link>
            <p>Special film tactics for productions that move.</p>
            <Link href="/contact">
              <a className="text-link">
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </Link>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <p className="section-kicker">Explore</p>
            {[...navLinks, { title: "Contact", path: "/contact" }].map(
              ({ title: label, path }) => (
                <Link href={path} key={path}>
                  <a>{label}</a>
                </Link>
              )
            )}
          </nav>
          <div className="footer-contact">
            <p className="section-kicker">Find us</p>
            <a href="https://goo.gl/maps/cBx6BL7eAkibPu9X9">
              1589 W 2225 S<br />
              Woods Cross, UT 84087
            </a>
            <p>
              Kauai office
              <br />
              7000 Olohena Road
              <br />
              Kapa’a, HI 96746
            </p>
            <Obfuscate tel="801-971-4683" />
            <Obfuscate email="info@ravens.works" />
            <a href="https://www.instagram.com/ravensfilmworks/">Instagram ↗</a>
          </div>
        </div>
        <div className="site-container footer-bottom">
          <p>© {new Date().getFullYear()} RAVENS Film Works</p>
          <p>
            Affiliate studio{" "}
            <a href="https://www.jmillsent.com/">Jmills Entertainment ↗</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
