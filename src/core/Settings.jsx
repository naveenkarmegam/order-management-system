import React, { useEffect} from "react";

import Layout from "./layout/Layout";
import { useFormik } from "formik";
import { setUser } from "../features/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { ClipLoader, HashLoader } from "react-spinners";
import profileValidationSchema from "./vendors/schema/validationSchema";
import axios from "axios";
import { config } from "../config/config";
import { setProfileEditMode } from "../features/FunctionalReducer";
const Settings = () => {
  const { user, loading } = useSelector(state => state.users_info);
  const {profileEditMode} = useSelector(state=>state.funactionality)

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobileNo: '',
      street: '',
      town: '',
      city: '',
      country: '',
      zipcode: '',
    },
    validationSchema: profileValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`${config.usersApi}/registered-users/${user.id}`, values);
        localStorage.setItem("user-info", JSON.stringify(values));
        dispatch(setUser(values));
        dispatch(setProfileEditMode(false))
      } catch (error) {

      }
    }
  })


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user-info"));
    dispatch(setUser(data));
    formik.setValues(data)
  }, [dispatch]);
  const handleEditClick = () => {
    dispatch(setProfileEditMode(true))
  };
  return (
    <Layout>
      <article className="row justify-content-center">
        <section className="col-lg-12">
          <header className="card shadow mb-4 ">
            <div className="card-header py-3 text-center">
              <h4 className="m-0 font-weight-bold text-orange">Profile</h4>
            </div>
            <main className="card-body">
              <article className="row">
                <section className="col-lg-3 border-end">
                  <figure className="d-flex flex-column align-items-center justify-content-center">
                    {user && user.firstname ? (
                      <React.Fragment>
                        <Avatar sx={{ bgcolor: deepOrange[500], width: 200, height: 200, fontSize: '10em' }}>
                          {user.firstname.split("")[0]}
                        </Avatar>
                        <figcaption className="h4 text-center mt-2">
                          {user.firstname}
                        </figcaption>
                      </React.Fragment>
                    ) : (

                      <ClipLoader size={20} />
                    )}
                  </figure>
                </section>
                <section className="col-lg-9 py-2 px-lg-5 px-sm-0">
                  {
                    profileEditMode ? (

                      <form className="" onSubmit={formik.handleSubmit}>
                        <fieldset className="form-group card shadow border">
                          <legend className="text-center card-header m-0 bg-orange text-white p-0">Personal Information</legend>
                          <div className="card-body d-flex flex-wrap">
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="firstname" className="form-label ml-2">
                                First Name
                              </label>
                              <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.firstname && formik.errors.firstname
                                  ? 'is-invalid'
                                  : ''
                                  }`}
                                placeholder="first name"
                              />
                              {formik.touched.firstname && formik.errors.firstname && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.firstname}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="lastname" className="form-label ml-2">
                                Last Name
                              </label>
                              <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.lastname && formik.errors.lastname
                                  ? 'is-invalid'
                                  : ''
                                  }`}
                                placeholder="last name"
                              />
                              {formik.touched.lastname && formik.errors.lastname && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.lastname}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="email" className="form-label ml-2">
                                Email
                              </label>
                              <input
                                type="text"
                                name="email"
                                id="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                                  }`}
                                placeholder="e-mail"
                              />
                              {formik.touched.email && formik.errors.email && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.email}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="mobileNo" className="form-label ml-2">
                                Mobile
                              </label>
                              <input
                                type="text"
                                name="mobileNo"
                                id="mobileNo"
                                value={formik.values.mobileNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.mobileNo && formik.errors.mobileNo
                                  ? 'is-invalid'
                                  : ''
                                  }`}
                                placeholder="mobile number"
                              />
                              {formik.touched.mobileNo && formik.errors.mobileNo && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.mobileNo}
                                </span>
                              )}
                            </div>
                          </div>
                        </fieldset>
                        <fieldset className="form-group card shadow ">
                          <legend className="card-header text-center m-0 bg-orange text-white p-0">Address</legend>
                          <div className="card-body d-flex flex-wrap">
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="street" className="form-label ml-2">
                                Street/D.No
                              </label>
                              <input
                                type="text"
                                name="street"
                                id="street"
                                value={formik.values.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.street && formik.errors.street ? 'is-invalid' : ''
                                  }`}
                                placeholder="street"
                              />
                              {formik.touched.street && formik.errors.street && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.street}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="town" className="form-label ml-2">
                                Town/Village
                              </label>
                              <input
                                type="text"
                                name="town"
                                id="town"
                                value={formik.values.town}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.town && formik.errors.town ? 'is-invalid' : ''
                                  }`}
                                placeholder="town"
                              />
                              {formik.touched.town && formik.errors.town && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.town}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="city" className="form-label ml-2">
                                City
                              </label>
                              <input
                                type="text"
                                name="city"
                                id="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''
                                  }`}
                                placeholder="city"
                              />
                              {formik.touched.city && formik.errors.city && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.city}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="country" className="form-label ml-2">
                                Country
                              </label>
                              <input
                                type="text"
                                name="country"
                                id="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.country && formik.errors.country
                                  ? 'is-invalid'
                                  : ''
                                  }`}
                                placeholder="country"
                              />
                              {formik.touched.country && formik.errors.country && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.country}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label htmlFor="zipcode" className="form-label ml-2">
                                Pincode
                              </label>
                              <input
                                type="text"
                                name="zipcode"
                                id="zipcode"
                                value={formik.values.zipcode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`form-control form-control-profile px-3 py-4 ${formik.touched.zipcode && formik.errors.zipcode
                                  ? 'is-invalid'
                                  : ''
                                  }`}
                                placeholder="zipcode"
                              />
                              {formik.touched.zipcode && formik.errors.zipcode && (
                                <span className="d-block ms-3 text-danger small invalid-feedback">
                                  {formik.errors.zipcode}
                                </span>
                              )}
                            </div>
                          </div>
                        </fieldset>
                        <div className="d-grid gap-2 col-lg-4 mx-auto mt-4">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                        </div>
                      </form>

                    ) : (
                      <div>
                        {loading ? (

                          <HashLoader />
                        ) : (
                          user && (<div className="table-responsive ">
                            <table className="table table-bordered table-striped">
                              <tbody>
                                <tr>
                                  <th className="text-end">First Name</th>
                                  <td className="">{user.firstname}</td>
                                </tr>
                                <tr>
                                  <th className="text-end">Last Name</th>
                                  <td>{user.lastname}</td>
                                </tr>
                                <tr>
                                  <th className="text-end">Email</th>
                                  <td>{user.email}</td>
                                </tr>
                                <tr>
                                  <th className="text-end">Mobile No</th>
                                  <td>{user.mobileNo}</td>
                                </tr>

                                <tr>
                                  <th className="text-end">Address</th>
                                  <td> <div>{`${user.street}, ${user.town}`}</div>
                                    <span>{`${user.city}, ${user.country}, ${user.zipcode}`}</span></td>

                                </tr>


                              </tbody>
                            </table>
                          </div>)
                        )}
                        <div className="text-center">
                          <button className="btn bg-orange border-0 text-white col-lg-4" onClick={handleEditClick}>Edit</button>
                        </div>
                      </div>
                    )
                  }
                </section>
              </article>
            </main>
          </header>
        </section>
      </article>
    </Layout>
  );
};

export default Settings;
