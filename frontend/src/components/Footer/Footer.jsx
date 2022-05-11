import React from "react";

import "./Footer.css";

/**
 * Not using <Footer> because reactbootstrap doesn't have a component for that idk why xD
 */

const Footer = () => {
  const pages = [
    { page: "Mint", link: "/mint" },
    { page: "Collection", link: "/#collection" },
    { page: "Roadmap", link: "/#roadmap" },
    { page: "Staff", link: "/#staff" },
    { page: "FAQ", link: "/#faq" },
    // { page: "Posts", link: "/posts" },
    {
      page: "OpenSea",
      link: "https://testnets.opensea.io/collection/slimygang",
    },
  ];

  return (
    <>
      <footer className="footer page-footer font-small blue pt-4 text-light">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-md-7 mt-md-0 mt-3">
              <h5 className="text-uppercase">Slimy NFT Art</h5>
              <p>
                The best collection nowadays! We have a collection of 10k
                Generative Art.
              </p>
            </div>

            <div className="footer-copyright col-md-1 mb-md-0">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                {pages.map((pages) => (
                  <li key="">
                    <a href={pages.link}>{pages.page}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} All rights reserved to{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://pap.andresousa.pt"
          >
            pap.andresousa.pt
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
