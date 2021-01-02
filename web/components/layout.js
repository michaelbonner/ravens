import React from "react";
import Head from "next/head";
import Image from "next/image";
import Obfuscate from "react-obfuscate";

const Layout = ({ children, title, heroImage, heroContent = "" }) => {
  return (
    <>
      {heroImage && (
        <div className="fixed h-screen w-screen overflow-hidden z-0">
          <Image src={`${heroImage}`} layout="fill" />
        </div>
      )}
      <div className="relative container mx-auto z-10">
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="flex justify-between items-center py-12">
          <a
            className="w-64"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width="2578"
              height="1052"
              src="/ravens-logo-white.png"
              alt="Ravens Logo"
            />
          </a>
          <div className="flex justify-end items-center">
            <a
              className="rounded-full uppercase tracking-wider border-2 border-white py-2 px-8"
              href="/"
            >
              Get in Touch
            </a>
            <button className="w-16 ml-8 focus:outline-black">
              <svg
                className="w-16 fill-current text-white stroke-2 stroke-current"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 120 74.7"
                style={{ enableBackground: "new 0 0 120 74.7" }}
              >
                <g>
                  <rect class="st0" width="120" height="3.3" />
                  <rect y="35.7" class="st0" width="120" height="3.3" />
                  <rect y="71.4" class="st0" width="120" height="3.3" />
                </g>
              </svg>
            </button>
          </div>
        </header>

        {heroContent}
      </div>
      <div className="bg-black relative z-10 px-4">
        <main className="container mx-auto">{children}</main>
        <footer className="text-center lg:text-left pt-12">
          <h2 className="font-bold text-3xl text-center my-12 uppercase">
            Contact Us
          </h2>
          <div className="lg:flex justify-center">
            <div className="lg:pr-8 lg:border-r-2 border-gold leading-7 tracking-wider lg:text-right">
              <p>
                RAVENS FILM WORKS
                <br />
                <a href="https://goo.gl/maps/cBx6BL7eAkibPu9X9">
                  1569 W 2225 S<br />
                  Woods Cross, UT 84087
                </a>
              </p>
            </div>
            <div className="lg:pl-8 pt-12 lg:pt-0 leading-7 tracking-wider">
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
          <div className="prose lg:mt-24 max-w-5xl mx-auto">
            <p className="py-12">
              &copy; RAVENS FILM WORKS {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Layout;
