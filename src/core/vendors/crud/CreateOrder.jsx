import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { newFormValidationSchema } from "./Schema/validationSchema";
import { useDispatch } from "react-redux";

import axios from "axios";
import { createOrder } from "../../../features/OrderReducer";
import { config } from "../../../config/config";


import NewForm from "./lib/NewForm";
import Layout from "../../layout/Layout";

const CreateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      status: "",
      customerName: "",
      shippingService: "",
      
      address:{
        street: "",
        town: "",
        city: "",
        country: "",
        zipcode: "",
       }
    },
    validationSchema: newFormValidationSchema,
    onSubmit: async (values) => { 
      console.log(values)
      try {
        const response = await axios.post(`${config.ordersApi}/orders`, values);
        dispatch(createOrder(response.data));

        navigate("/order");
      } catch (error) {
        console.error(error);
      }
      formik.resetForm();
    },
  });
  return (
    <Layout>
      <hgroup className="d-sm-flex align-items-center justify-content-between mb-4 mx-lg-5">
        <h1 className="h3 mb-0 text-gray-800">Orders</h1>
        <Link
          to={"/order"}
          className="d-none d-sm-inline-block btn btn-sm bg-orange text-white shadow-sm"
        >
          <i class="bi bi-arrow-left mr-2"></i>Back To Table
        </Link>
      </hgroup>
      <NewForm formik={formik} title="New Order" buttonText="Submit"/>
    </Layout>
  );
};

export default CreateOrder;
