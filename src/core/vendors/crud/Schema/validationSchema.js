import * as Yup from "yup";
export const EditvalidationSchema = Yup.object().shape({
    orderId: Yup.string().required("Order ID is required"),
    orderNumber: Yup.string().required("Order Number is required"),
    status: Yup.string().required("Status is required"),
    item: Yup.string().required("Item is required"),
    customerName: Yup.string().required("Customer Name is required")
    .matches(/^[A-Za-z ]+$/, 'A customer name must be in letters'),
    shippingService: Yup.string().required("Shipping Service is required"),
    trackingCode: Yup.string().required("Tracking Code is required"),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      town: Yup.string().required("Town is required")
      .matches(/^[A-Za-z ]+$/, 'A town must be in letters'),
      city: Yup.string().required("City is required")
      .matches(/^[A-Za-z]+$/, 'A city must be in letters'),
      country: Yup.string().required("Country is required")
      .matches(/^[A-Za-z]+$/, 'A country must be in letters'),
      zipcode: Yup.number().required("Zipcode is required"),
    }),
  })
  
  export const newFormValidationSchema = Yup.object({
    customerName: Yup.string().required("Customer Name is required")
    .matches(/^[A-Za-z ]+$/, 'A customer name must be in letters'),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      town: Yup.string().required("Town is required")
      .matches(/^[A-Za-z ]+$/, 'A town must be in letters'),
      city: Yup.string().required("City is required")
      .matches(/^[A-Za-z]+$/, 'A city must be in letters'),
      country: Yup.string().required("Country is required")
      .matches(/^[A-Za-z]+$/, 'A country must be in letters'),
      zipcode: Yup.number().required("Zipcode is required"),
    }),
    status: Yup.string().required("Status is required"),
    shippingService: Yup.string().required("Shipping Service is required"),
  });;