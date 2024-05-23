import React from 'react';
import { Icon } from '@iconify/react';

function AdoptionDialog({ setDialogShow, confirmAdoption }) {
  return (
    <div className="fixed min-h-screen top-0 left-0 w-full bg-gradient-to-b from-amber-100/60 to-orange-300/60 flex justify-center items-center  z-40">
      <div className="bg-white border-l-4 md:border-l-8 border-amber-600 p-1 md:p-6 opacity-100 rounded-lg">
        <div className="w-96  rounded-lg flex">
          <div className="w-1/3 pt-6 flex justify-center">
            <div className="flexCenter w-14 h-14 bg-amber-600 text-white p-2 rounded-full">
              <Icon className="w-10 h-10" icon="mingcute:love-line" />
            </div>
          </div>
          <div className="w-full pt-9 pr-4">
            <h3 className="font-bold text-sm md:text-lg text-amber-700">
              Thank you for your interest in adoption!
            </h3>
            <p className="py-4 text-sm text-gray-400">
              Adoption processing takes 2-3 working days. Click 'Confirm' to
              acknowledge and proceed. Thank you for your patience!
            </p>
          </div>
        </div>
        <div className="p-4 flex space-x-4">
          <button
            onClick={() => {
              setDialogShow(false);
            }}
            className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={confirmAdoption}
            className="w-1/2 px-4 py-3 text-center text-pink-100 bg-amber-600 rounded-lg hover:bg-amber-700 hover:text-white font-bold text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdoptionDialog;
