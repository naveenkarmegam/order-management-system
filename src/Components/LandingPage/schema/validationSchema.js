import * as Yup from 'yup';

export const contactValidationSchema = Yup.object({
    customerName: Yup.string().required('* required'),
    email: Yup.string().required('* required').matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
        'Invalid email format, e.g., example@email.co'
    ),
    phoneNo: Yup.string().required('* required').matches(
        /^\d+$/,
        'Phone number must contain only numbers'
    ),
    message: Yup.string().required('* required'),
});
