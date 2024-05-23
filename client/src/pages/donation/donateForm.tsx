import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import PageHeader from '../../components/shared/pageHeader';
import bgImg from '../../assets/donationback.webp';
import { createCheckoutSession } from '../../services/stripeServices';
import SubscriptionPlan from '../../components/donation/subscriptionPlan';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import img001 from '../../assets/donation001.webp';
import img002 from '../../assets/donation002.webp';
import img003 from '../../assets/donation003.webp';

function DonateForm() {
  const [donateAmount, setDonateAmount] = useState(0);
  const [donationType, setDonationType] = useState('once');
  const navigate = useNavigate();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function initializeStripe() {
      const stripeInstance = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY
      );
      setStripe(stripeInstance);
    }
    initializeStripe();
  }, []);

  useEffect(() => {
    setDonationType(searchParams.get('type') || 'once');
  }, [searchParams]);

  const { mutate: triggerPayment } = useMutation(
    (buildPaymentData) => createCheckoutSession(buildPaymentData),
    {
      onMutate: () => {
        setIsPaymentProcessing(true);
      },
      onSuccess: async (res) => {
        // Other processing remains the same
        if (res.statusCode === 500) return;

        stripe.redirectToCheckout({ sessionId: res.data });

        toast('Redirect to payment gateway...');

        stripe.redirectToCheckout({ sessionId: res.data });
      },
      onError: (error) => {
        // Handle error state
        console.error(error);
        setIsPaymentProcessing(false); // Reset loading state in case of an error
      },
      // Define onError and onSettled as needed
    }
  );

  const handlePayment = (amount) => {
    const paymentData = {
      amount: amount,
      paymentType: donationType,
    };
    triggerPayment(paymentData);
  };

  return (
    <section>
      <div className=" mx-auto w-full  bg-orange-50">
        <PageHeader
          pageHeader="Support Us"
          pageSubHeader="Every Contribution Makes a Difference in Their World."
          background={bgImg}
        />
        <div className="max-container">
          <div className="w-full section-padding mx-auto mr-auto ">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1">
                <div className="mb-5 w-10/12">
                  <h1 className="font-bold uppercase text-5xl mb-2">
                    Support Our Work
                  </h1>
                  <p className="text-slate-700 mb-2">
                    Your generous donation directly supports our animals,
                    providing crucial shelter and care. You're not just giving;
                    you're marking a substantial change in their lives.
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 w-3/4  text-center overflow-hidden">
                    <Link
                      to="/donation?type=once"
                      className={`rounded-t-2xl p-3 text-lg font-bold col col-span-1 ${
                        donationType !== 'monthly' ? 'bg-white' : ''
                      }`}
                    >
                      One-off
                    </Link>
                    <Link
                      to="/donation?type=monthly"
                      className={`rounded-t-2xl p-3 text-lg font-bold col col-span-1 ${
                        donationType === 'monthly' ? 'bg-white' : ''
                      }`}
                    >
                      Monthly
                    </Link>
                  </div>
                  <div className="bg-white pb-5 rounded-2xl rounded-tl-none ">
                    <div className="px-6">
                      <div className="mt-10 text-2xl font-semibold">
                        {donationType === 'once'
                          ? 'Make a One-Time Donation'
                          : donationType === 'monthly'
                          ? 'Set Up a Monthly Donation'
                          : 'Make a One-Time Donation'}
                      </div>
                      {donationType === 'once' ? (
                        <>
                          <div className="  grid grid-cols-1 gap-5 md:grid-cols-2 mt-6">
                            <div className="flex flex-row">
                              <span className="flex items-center rounded rounded-r-none pr-6 font-bold ">
                                HKD$
                              </span>
                              <input
                                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                onChange={(e) => {
                                  setDonateAmount(e.target.value);
                                }}
                                type="number"
                                value={donateAmount}
                                placeholder="Amount"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 mb-16 gap-5 md:grid-cols-4 mt-8">
                            <button
                              onClick={() => {
                                setDonateAmount(20);
                              }}
                              className="uppercase text-base font-bold tracking-widest bg-gray-800 text-slate-200 font-mono p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline hover:bg-slate-700"
                            >
                              $20
                            </button>
                            <button
                              onClick={() => {
                                setDonateAmount(40);
                              }}
                              className="uppercase text-base font-bold tracking-widest bg-gray-800 text-slate-200 font-mono p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline hover:bg-slate-700"
                            >
                              $40
                            </button>
                            <button
                              onClick={() => {
                                setDonateAmount(60);
                              }}
                              className="uppercase text-base font-bold tracking-widest bg-gray-800 text-slate-200 font-mono p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline hover:bg-slate-700"
                            >
                              $60
                            </button>
                            <button
                              onClick={() => {
                                setDonateAmount(80);
                              }}
                              className="uppercase text-base font-bold tracking-widest bg-gray-800 text-slate-200 font-mono p-3 rounded-lg w-full 
                focus:outline-none focus:shadow-outline hover:bg-slate-700"
                            >
                              $80
                            </button>
                          </div>
                          <div className="my-2 w-1/2 ">
                            <button
                              disabled={isPaymentProcessing}
                              onClick={() => {
                                if (!isPaymentProcessing) {
                                  setIsPaymentProcessing(true);
                                  handlePayment(donateAmount);
                                }
                              }}
                              className="button-base button-primary"
                            >
                              Confirm Donation
                            </button>
                          </div>
                        </>
                      ) : (
                        <SubscriptionPlan
                          handlePayment={handlePayment}
                          setDonateAmount={setDonateAmount}
                        />
                      )}
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 mt-auto mb-auto">
                <div className="flex p-2 justify-center items-center">
                  <div className="flex-1 m-1 object-cover">
                    <img className="h-full w-full rounded-lg" src={img001} />
                  </div>
                  <div className="flex-1 m-1 object-cover">
                    <img
                      className="h-full w-full mb-2 rounded-lg"
                      src={img002}
                    />
                    <img className="h-full w-full rounded-lg" src={img003} />
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonateForm;
