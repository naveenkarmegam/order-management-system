import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editOrder } from "../../../features/OrderReducer";
import { EditvalidationSchema } from "./Schema/validationSchema";

import axios from "axios";
import { config } from "../../../config/config";
import OrderForm from "./lib/OrderForm";
import Layout from "../../layout/Layout";

const EditOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // const setOrder = useSelector((state) => state.order_list);


  const formik = useFormik({
    initialValues: {
      orderId: "",
      orderNumber: "",
      status: "",
      item: "",
      customerName: "",
      shippingService: "",
      trackingCode: "",
      address:{
        street: "",
        town: "",
        city: "",
        country: "",
        zipcode: "",
       }
    },
    validationSchema: EditvalidationSchema,
    onSubmit: async (values) => {
      try {
        const updatedData = await axios.put(
          `${config.ordersApi}/orders/${params.id}`,
          values
        );
        dispatch(editOrder(updatedData.data));
        navigate("/order");
      } catch (error) {
        console.error(error);
      }
    },
  });
  useEffect(() => {
    const getData = async () => {
      try {
        if (!params.id) {
          console.error("Error in edit order 45");
          return;
        }
        const dataList = await axios.get(
          `${config.ordersApi}/orders/${params.id}`
        );
        dispatch(editOrder(dataList.data));
        formik.setValues(dataList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [params.id, dispatch]);

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
      <OrderForm formik={formik} title="Edit Order" buttonText="Update" />
    </Layout>
  );
};

export default EditOrder; 
