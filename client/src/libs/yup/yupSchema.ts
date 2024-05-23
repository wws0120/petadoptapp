import * as yup from 'yup';

const emailValidation = yup
  .string()
  .email('Please enter a valid email address.')
  .required('Email is required.');

const passwordValidation = yup.string().required('Password is required.');

const confirmPasswordValidation = yup
  .string()
  .required('Confirmation Password is required.')
  .oneOf([yup.ref('password'), null], 'Passwords must match.');

export const loginFormSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const signupFormSchema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required('Confirmation Password is required.'),
});

export const schema = yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});
