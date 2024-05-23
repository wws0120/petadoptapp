import { useState } from 'react';

function SubscriptionPlan({ handlePayment, setDonateAmount }) {
  return (
    <div className="grid sm:grid-cols-2 px-8 gap-10 text-zinc-800 mt-10">
      <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 via-orange-50 to-purple-100 p-8 rounded-lg shadow-lg relative border-4 border-black max-w-sm">
        <p className="text-sm absolute -top-4 bg-gradient-to-tr from-pink-500 to-red-400 text-white py-0.5 px-2 font-bold tracking-wider rounded">
          PLAN A
        </p>
        <div>
          <p className="opacity-60 text-center"></p>
          <div className="flex gap-4 my-1 justify-center">
            <div className="flex flex-col items-center my-4">
              <p className="font-extrabold text-4xl">$89</p>
              <p className="text-sm opacity-60">/month</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                handlePayment(89);
              }}
              className="button-base button-primary"
            >
              Subscript
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 via-orange-50 to-purple-100 p-8 rounded-lg shadow-lg relative border-4 border-black max-w-sm">
        <p className="text-sm absolute -top-4 bg-gradient-to-tr from-pink-500 to-red-400 text-white py-0.5 px-2 font-bold tracking-wider rounded">
          PLAN B
        </p>
        <div>
          <p className="opacity-60 text-center"></p>
          <div className="flex gap-4 justify-center">
            <div className="flex flex-col items-center my-4">
              <p className="font-extrabold text-4xl">$189</p>
              <p className="text-sm opacity-60">/month</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                handlePayment(189);
              }}
              className="button-base button-primary"
            >
              Subscript
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
