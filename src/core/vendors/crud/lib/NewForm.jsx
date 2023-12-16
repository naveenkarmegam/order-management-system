import React from "react";

const NewForm = ({ formik, title, buttonText }) => {
  return (
    <article className="card">
      <header className="card-header">
        <h4 className="text-center text-orange fw-semibold">{title}</h4>
      </header>
      <main className="card-body">
        <form action="" onSubmit={formik.handleSubmit}>
          <fieldset>
            <main className="row">
            <section className="col-lg-4 mb-3">
                <label htmlFor="customerName" className="form-label">
                  Customer Name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.customerName && formik.errors.customerName
                      ? "is-invalid"
                      : ""
                  }`}
                  name="customerName"
                  id="customerName"
                  value={formik.values.customerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.customerName && formik.errors.customerName && (
                  <span className="invalid-feedback">
                    {formik.errors.customerName}
                  </span>
                )}
              </section>
              <section className="col-lg-4 mb-3">
                <label htmlFor="street" className="form-label">
                 D.No/ Street
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.address?.street && formik.errors.address?.street
                      ? "is-invalid"
                      : ""
                  }`}
                  name="address.street"
                  id="address.street"
                  value={formik.values.address?.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.street && formik.errors.address?.street && (
                  <span className="invalid-feedback">
                    {formik.errors.address?.street}
                  </span>
                )}
              </section>
              <section className="col-lg-4 mb-3">
                <label htmlFor="town" className="form-label">
                  Town / Village
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.address?.town && formik.errors.address?.town
                      ? "is-invalid"
                      : ""
                  }`}
                  name="address.town"
                  id="address.town"
                  value={formik.values.address?.town}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.town && formik.errors.address?.town && (
                  <span className="invalid-feedback">
                    {formik.errors.address?.town}
                  </span>
                )}
              </section>
              <section className="col-lg-4 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.address?.city && formik.errors.address?.city
                      ? "is-invalid"
                      : ""
                  }`}
                  name="address.city"
                  id="address.city"
                  value={formik.values.address?.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.city && formik.errors.address?.city && (
                  <span className="invalid-feedback">{formik.errors.address?.city}</span>
                )}
              </section>
              <section className="col-lg-4 mb-3">
                <label htmlFor="city" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.address?.country && formik.errors.address?.country
                      ? "is-invalid"
                      : ""
                  }`}
                  name="address.country"
                  id="address.country"
                  value={formik.values.address?.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.country && formik.errors.address?.country && (
                  <span className="invalid-feedback">{formik.errors.address?.country}</span>
                )}
              </section>
              <section className="col-lg-4 mb-3">
                <label htmlFor="zipcode" className="form-label">
                  Zip-code
                </label>
                <input
                  type="number"
                  className={`form-control ${
                    formik.touched.address?.zipcode && formik.errors.address?.zipcode
                      ? "is-invalid"
                      : ""
                  }`}
                  name="address.zipcode"
                  id="address.zipcode"
                  value={formik.values.address?.zipcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.zipcode && formik.errors.address?.zipcode && (
                  <span className="invalid-feedback">
                    {formik.errors.address?.zipcode}
                  </span>
                )}
              </section>

              <section className="col-lg-4 mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className={`form-select ${
                    formik.touched.status && formik.errors.status
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="status"
                  id="status"
                >
                  <optgroup label="status">
                    <option value="">choose</option>
                    <option value="order">order</option>
                    {/* <option value="production">production</option>
                    <option value="cancelled">cancelled</option>
                    <option value="delivered">delivered</option>
                    <option value="Return">Return</option> */}
                  </optgroup>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <span className="invalid-feedback">
                    {formik.errors.status}
                  </span>
                )}
              </section>



              <section className="col-lg-4 mb-3">
                <label htmlFor="shippingService" className="form-label">
                  Shipping Service
                </label>
                <select
                  className={`form-select ${
                    formik.touched.shippingService &&
                    formik.errors.shippingService
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formik.values.shippingService}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="shippingService"
                  id="shippingService"
                >
                  <optgroup label="service">
                    <option value="">choose</option>
                    <option value="standard">standard</option>
                    <option value="priority">priority</option>
                    <option value="express">express</option>
                  </optgroup>
                </select>
                {formik.touched.shippingService &&
                  formik.errors.shippingService && (
                    <span className="invalid-feedback">
                      {formik.errors.shippingService}
                    </span>
                  )}
              </section>

            </main>
            <section className="col-lg-12 text-center mt-4">
              <input
                type="submit"
                className="btn btn-primary px-5 col-lg-3 py-2"
                value={buttonText}
              />
            </section>
          </fieldset>
        </form>
      </main>
    </article>
  );
};

export default NewForm;
