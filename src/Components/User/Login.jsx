import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Icons/Logo";
import { useFormik } from "formik";
import { isAuthenticated, login } from "./Auth/authService";
import { loginValidationSchema } from "./schema/validationSchema";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import './style/user.css'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, reset) => {
      try {
        await login(values.email, values.password);
        reset.resetForm();
        navigate("/dashboard");       
      } catch (error) {
        console.error("Login failed:", error);
        formik.setErrors({ general:error});
      }
    },
  });
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <main className="kvnkjabvav ">
      <article className="container ">
        <hgroup className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <section className="card o-hidden border-0 shadow-lg my-5">
              <main className="card-body p-0">
                <section className="row">
                  <figure className="col-lg-6 m-0 d-none d-lg-block bg-login-image">

                  </figure>
                  <section className="col-lg-6 p-5">

                    <hgroup className="d-flex justify-content-center user-heading">
                      <Logo
                        width={60}
                        height={60}
                        className="me-3 fill-orange"
                      />
                      <h1 className="text-center  h1">ADUDU</h1>
                    </hgroup>

                    <header className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Come Back!</h1>
                    </header>
                    <form className="user" onSubmit={formik.handleSubmit}>
                      {formik.errors.general && (
                        <section className="alert alert-danger" role="alert">
                          {formik.errors.general.message}
                        </section>
                      )}
                      <section className="form-group">
                        <input
                          className={`form-control form-control-user ${formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                            }`}
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <span className="d-block ms-3 text-danger small invalid-feedback">
                            {formik.errors.email}
                          </span>
                        )}
                      </section>
                      <section className="form-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control form-control-user ${formik.touched.password && formik.errors.password
                            ? "is-invalid"
                            : ""
                            }`}
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <div>
                        {formik.touched.password &&
                          formik.errors.password && (
                            <span className="d-block ms-3 text-danger small invalid-feedback">
                              {formik.errors.password}
                            </span>
                          )}
                        </div>
                        <div className="showPass">
                          {
                            showPassword ? <EyeSlashFill
                              className="showPassIcon"
                              onClick={() => setShowPassword(!showPassword)}
                            /> :
                              <EyeFill
                                className="showPassIcon"
                                onClick={() => setShowPassword(!showPassword)}
                              />
                          }
                        </div>
                      </section>
                      <section className="form-group">
                        <section className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </section>
                      </section>
                      <button
                        className="btn btn-primary btn-user btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                      <a
                        href="..."
                        className="btn btn-google btn-user btn-block"
                      >
                        <i className="fab fa-google fa-fw"></i> Login with
                        Google
                      </a>
                      <a
                        href="..."
                        className="btn btn-facebook btn-user btn-block"
                      >
                        <i className="fab fa-facebook-f fa-fw"></i> Login with
                        Facebook
                      </a>
                      <hr />
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to={"/forgot-password"}>
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to={"/register"}>
                        Create an Account!
                      </Link>
                    </div>

                  </section>
                </section>
              </main>
            </section>
          </div>
        </hgroup>
      </article>
    </main>
  );
};

export default Login;
