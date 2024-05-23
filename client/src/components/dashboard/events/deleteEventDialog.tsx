import React from 'react';
import { Icon } from '@iconify/react';

function DeleteAnimalDialog({ setDialogShow, confirmDeletion }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-100/60 to-orange-300/60 z-40">
      <div className="bg-white border-l-4 md:border-l-8 border-red-600 p-1 md:p-6 opacity-100 rounded-lg">
        <div className="w-96  rounded-lg flex">
          <div className="w-1/3 pt-6 flex justify-center">
            <div className="flexCenter w-14 h-14 bg-red-600 text-white p-2 rounded-full">
              <Icon className="w-10 h-10" icon="mingcute:alert-line" />
            </div>
          </div>
          <div className="w-full pt-9 pr-4">
            <h3 className="font-bold text-sm md:text-lg text-red-700">
              Confirm Deletion
            </h3>
            <p className="py-4 text-sm text-gray-400">
              Are you sure you want to delete this event from the records?
              Please note that this action cannot be undone. Once the data is
              removed, it will not be possible to recover.
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
            onClick={confirmDeletion}
            className="w-1/2 px-4 py-3 text-center text-pink-100 bg-red-600 rounded-lg hover:bg-red-700 hover:text-white font-bold text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAnimalDialog;
