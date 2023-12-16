import React from "react";
import Sidebar from "./Sidebar";
import TobBar from "./TobBar";
import './styles/core.css'
const Layout = ({ children }) => (
  <main id="page-top" >
    <header id="wrapper" className="overflow-hidden" >
      <Sidebar />
      <article id="content-wrapper" className="d-flex flex-column overflow-hidden " >
        <section id="content">
          <TobBar />
          <div className="container-fluid mt-4">{children}</div>
        </section>
      </article>
    </header>
  </main>
);

export default Layout;
