import { registerValidationSchema } from "./schema/validationSchema";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Icons/Logo";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../../config/config";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Register = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = [
    { label: 'Personal Information', fields: ['firstname', 'lastname', 'email','mobileNo'] },
    { label: 'Address Information', fields: ['street', 'town', 'city', 'country', 'zipcode'] },
    { label: 'Account Information', fields: ['password', 'cpassword'] }
  ];

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = () => {
    const currentStepFields = steps[activeStep].fields;
    const areFieldsValid = currentStepFields.every(
      (field) => !formik.errors[field] && formik.touched[field]
    );
    if (areFieldsValid) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      console.error("Fields are not valid. Please fill in all required fields.");
    }
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobileNo:'',
      password: "",
      cpassword: "",
        street: "",
        town: "",
        city: "",
        country: "",
        zipcode: "",
      
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${config.usersApi}/registered-users`,
          values
        );
        if (response.status === 201) {
          toast.success("Registration Successfully done 😃!");
        }
        navigate('/login')
        formik.resetForm();
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Error during registration. Please try again.", {
          position: "top-center",
        });
      }
    },
  });

  return (
    <article className="container kvnkjabvav " style={{ backgroundColor: 'white' }}>
      <section className="card o-hidden border-0 shadow-lg my-5">
        <main className="card-body p-0">
          <section className="row">
            <figure className="col-lg-5 d-none m-0 d-lg-block bg-register-image">
            </figure>
            <section className="col-lg-7 p-5">

              <hgroup className="d-flex justify-content-center user-heading">
                <Logo width={60} height={60} className="me-3 fill-orange" />
                <h1 className="text-center text-orange h1">ADUDU</h1>
              </hgroup>
              <header className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
              </header>
              <form className="user" onSubmit={formik.handleSubmit}>
              <Box sx={{ width: '100%' }}>
                <Stepper className="my-4" activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Congrats! You Successfully completed all these step.
                      Register
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <button
                        className="btn btn-primary btn-user btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment> 
                      {steps[activeStep].fields.map((field) => (
                        <section className="form-group" key={field}>
                          <input
                            type={(field === 'password' || field === 'cpassword') ? 'password' :(field === 'mobileNo' || field === 'zipcode') ? 'number' : 'text'}
                            className={`form-control form-control-user ${formik.touched[field] && formik.errors[field]
                                ? "is-invalid"
                                : ""
                              }`}
                            id={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            name={field}
                            value={formik.values[field]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched[field] && formik.errors[field] && (
                            <span className="d-block ms-3 text-danger small invalid-feedback">
                              {formik.errors[field]}
                            </span>
                          )}
                        </section>
                      ))}
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button onClick={handleNext}>
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </Box>
                  </React.Fragment>
                )}
              </Box>
              </form>
              <hr />
              <div className="text-center">
                <Link className="small" to={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
              <div className="text-center">
                <Link className="small" to={"/login"}>
                  Already have an account? Login!
                </Link>
              </div>

            </section>
          </section>
        </main>
      </section>
    </article>
  );
};

export default Register;
