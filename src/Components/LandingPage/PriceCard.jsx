// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

const PriceCard = ({ details }) => {
  return (
    <article className="col-lg-6 col-xl-4">
      <section className="card mb-5 mb-xl-0">
        <main className="card-body p-5">
          <div className="small text-uppercase fw-bold text-muted">
            {details.title}
          </div>
          <div className="mb-3">
            <span className="display-4 fw-bold">${details.pack}</span>
            <span className="text-muted">/mo</span>
          </div>
          <ul className="list-unstyled mb-4">
            {details.features.map((list, index) => {
              return (
                <li className="mb-3" key={index}>
                  <i
                    className={`bi ${
                      list.value ? "bi-check text-primary" : "bi-x text-muted"
                    }`}
                  />
                  <strong className={`${list.value ? "" : "text-muted"}`}>
                    {list.access}
                  </strong>
                </li>
              );
            })}
          </ul>
          <div className="d-grid">
            <Link className="btn btn-success" to={"/login"}>
              Choose plan
            </Link>
          </div>
        </main>
      </section>
    </article>
  );
};

export default PriceCard;
