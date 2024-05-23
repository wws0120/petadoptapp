import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from '../libs/yup/yupSchema';
import useYupValidationResolver from '../libs/yup/yupResolver';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '../hooks/querys/auth';

import logo from '../assets/logo.svg';
import bgimg from '../assets/back001.webp';

interface ILoginFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  const { mutateAsync: loginMutation } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({ resolver: yupResolver(loginFormSchema) });

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  const onSubmit = (data) => {
    loginMutation(data);
  };

  return (
    <section className="w-full bg-gradient-to-bl from-indigo-50 via-pink-50 to-teal-50">
      <div className="flex flex-col items-center  px-6 py-20 mx-auto md:h-screen ">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Login
        </div>
        <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900  "
                >
                  Your email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
                <p className="text-red-500 text-sm">
                  {errors.password?.message}
                </p>
              </div>

              <button
                type="submit"
                className="w-full text-gray-100 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
