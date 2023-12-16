import { useFormik } from "formik";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { contactValidationSchema } from "./schema/validationSchema";

const ContactUs = () => {
  const notify = () => toast("Wow so easy!");

  const formik = useFormik({
    initialValues: {
      customerName: "",
      email: "",
      phoneNo: "",
      message: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      notify();
    },
  });

  return (
    <article className="bg-light py-5">
      <section className="container px-5 my-5 px-5">
        <hgroup className="text-center mb-5">
          <div className="feature bg-success bg-gradient text-white rounded-3 mb-3">
            <i className="bi bi-envelope" />
          </div>
          <h2 className="fw-bolder">Get in touch</h2>
          <p className="lead mb-0">We'd love to hear from you</p>
        </hgroup>
        <main className="row gx-5 justify-content-center">
          <div className="col-lg-6">
            <form onSubmit={formik.handleSubmit}>
              <section className="form-floating mb-3">
                <input
                  className={`form-control ${
                    formik.touched.customerName && formik.errors.customerName
                      ? "is-invalid"
                      : ""
                  }`}
                  id="customerName"
                  type="text"
                  placeholder="Enter your name..."
                  name="customerName"
                  value={formik.values.customerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="name">Full name</label>
                <div className="invalid-feedback">
                  {formik.touched.customerName && formik.errors.customerName}
                </div>
              </section>

              <section className="form-floating mb-3">
                <input
                  className={`form-control ${
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  type="text"
                  placeholder="name@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="email">Email address</label>
                <div className="invalid-feedback">
                  {formik.touched.email && formik.errors.email}
                </div>
              </section>

              <section className="form-floating mb-3">
                <input
                  className={`form-control ${
                    formik.touched.phoneNo && formik.errors.phoneNo
                      ? "is-invalid"
                      : ""
                  }`}
                  id="phoneNo"
                  type="number"
                  placeholder="(123) 456-7890"
                  name="phoneNo"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="phone">Phone number</label>
                <div className="invalid-feedback">
                  {formik.touched.phoneNo && formik.errors.phoneNo}
                </div>
              </section>

              <section className="form-floating mb-3">
                <textarea
                  className={`form-control ${
                    formik.touched.message && formik.errors.message
                      ? "is-invalid"
                      : ""
                  }`}
                  id="message"
                  type="text"
                  placeholder="Enter your message here..."
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  cols={20}
                  rows={3}
                />
                <label htmlFor="message">Message</label>
                <div className="invalid-feedback">
                  {formik.touched.message && formik.errors.message}
                </div>
              </section>

              <div className="d-grid">
                <button
                  className="btn btn-success btn-lg"
                  type="submit"
                >
                  Submit
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </main>
      </section>
    </article>
  );
};

export default ContactUs;
