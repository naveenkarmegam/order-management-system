import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNo: Yup.string().required('Mobile number is required'),
  street: Yup.string().required('Street is required'),
  town: Yup.string().required('Town/Village is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  zipcode: Yup.string().required('Zipcode is required'),
  // Add other fields and their validations as needed
});

export default profileValidationSchema;
