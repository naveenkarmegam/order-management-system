import React from "react";

const Footer = () => {
    const currentDate = new Date()
  return (
    <footer className="py-5 bg-orange">
      <section className="container px-5">
        <p className="m-0 text-center text-white">
          Copyright © Your Website {currentDate.getFullYear()}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
