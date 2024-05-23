import React from 'react';
import { Icon } from '@iconify/react';

function Accordion({
  question,
  answer,
  index,
  openedAccordion,
  setOpenedAccordion,
}) {
  return (
    <div className="border border-gray-200  bg-white rounded-lg overflow-hidden">
      <div
        className={`capitalize px-6 py-4 inline-flex items-center justify-between outline-none border-none gap-x-3 w-full text-left  transition-all ${
          index === openedAccordion ? 'text-amber-500' : 'text-gray-950'
        }`}
      >
        <h5 className="text-xl font-bold w-10/12">{question}</h5>
        <div>
          <Icon
            className={`w-8 h-8 transition-all duration-500 ${
              index === openedAccordion ? '' : '-rotate-180'
            }`}
            onClick={() => {
              if (openedAccordion === index) {
                setOpenedAccordion(null);
              } else {
                setOpenedAccordion(index);
              }
            }}
            icon="mingcute:down-line"
          />
        </div>
      </div>
      <div
        className={`w-full overflow-hidden transition-all duration-300 ${
          index === openedAccordion ? 'min-h-32 opacity-100' : 'h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 pt-2">
          <p className="text-gray-500 text-base font-semibold">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
