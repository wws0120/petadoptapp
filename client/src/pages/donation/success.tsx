import { useEffect } from 'react';
import axiosInstance from '../../libs/axios/axiosUtils';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import thankImg from '../../assets/thankyou001.webp';

const Success = () => {
  let { sessionId } = useParams();
  useEffect(() => {
    axiosInstance
      .post('/stripe/payment-success', { sessionId })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }, [sessionId]);

  return (
    <section className="flex items-center h-full p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <div className="mb-8 flex justify-center">
            <img className="max-w-64 max-h-64" src={thankImg} />
          </div>
          <p className="text-2xl font-semibold md:text-3xl">
            Thank You For Donation!
          </p>
          <p className="mt-4 mb-8 ">
            Your gracious donation has been successfully received. We appreciate
            your generosity!
          </p>
          <Link to="/" className="button-base button-primary">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;
