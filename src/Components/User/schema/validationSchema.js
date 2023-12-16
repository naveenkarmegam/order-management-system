import * as Yup from "yup";


export const registerValidationSchema = Yup.object().shape({
  firstname: Yup.string().required('* Required')
    .matches(/^[A-Za-z]+$/, 'A first name must be in letters'),

  lastname: Yup.string().required('* Required')
  .matches(/^[A-Za-z]+$/, 'A last name must be in letters'),
  email: Yup.string().required('* required').matches(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
    'Invalid email format, e.g., example@email.co'
  ),
  mobileNo: Yup.string().required('A mobile No is required'),
  street: Yup.string().required("Street is required"),
  town: Yup.string().required("Town is required")
  .matches(/^[A-Za-z]+$/, 'A town must be in letters'),
  
  city: Yup.string().required("City is required")
  .matches(/^[A-Za-z]+$/, 'A city must be in letters'),
  
  country: Yup.string().required("Country is required")
  .matches(/^[A-Za-z]+$/, 'A country must be in letters'),
  zipcode: Yup.string().required("Zipcode is required")
  .min(6, 'Zip code should be at least 6 characters')
  .max(9, 'Zip code should be at most 9 characters')
  .matches(/^\d+$/, 'Zip code should only contain numbers'),

  password: Yup.string()
    .min(3, 'Password should be at least 3 characters')
    .max(12, 'Password should be at most 8 characters')
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must contain at least one special character')
    .required('* Required'),
  cpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('* Required'),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required('* required').matches(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
    'Invalid email format, e.g., example@email.co'
  ),
  password: Yup.string()
    .min(3, 'Password should be at least 3 characters')
    .max(12, 'Password should be at most 8 characters')
    .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Password must contain at least one special character')
    .required('* Required'),
});