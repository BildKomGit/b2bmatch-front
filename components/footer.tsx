import React from "react";

const Footer = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      ></link>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      ></link>
      <footer className="relative bg-secondary  ">
        <ul className="list-unstyled flex w-full pt-2 gap-5 justify-center items-center text-center">
          <li>
            <a
              className="text-foreground hover:text-blueGray-800 font-semibold block text-sm"
              href="/about"
            >
              Über uns
            </a>
          </li>
          <li>
            <a
              className="text-foreground hover:text-blueGray-800 font-semibold block text-sm"
              href="imprint"
            >
              Impressum
            </a>
          </li>

          <li>
            <a
              className="text-foreground hover:text-blueGray-800 font-semibold block text-sm"
              href="/data"
            >
              Datenschutz
            </a>
          </li>
          <li>
            <a
              className="text-foreground hover:text-blueGray-800 font-semibold block text-sm"
              href="tc"
            >
              AGB
            </a>
          </li>
          <li>
            <a
              className="text-foreground hover:text-blueGray-800 font-semibold block text-sm"
              href="/contact"
            >
              Kontakt
            </a>
          </li>
        </ul>
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <a
                href="/"
                className="text-blueGray-500 hover:text-gray-800"
                target=""
              >
                {" "}
                Gestaltung{" "}
              </a>
              <a
                href="/"
                className="text-blueGray-500 hover:text-blueGray-800"
              >
                B2bmatch.ch
              </a>
              
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
