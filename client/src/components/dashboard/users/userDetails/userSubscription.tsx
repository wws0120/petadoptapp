import { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import subscritImg from '../../../../assets/subscript001.webp';
import dayjs from 'dayjs';

const CurrentSubscription = ({ subsrciption }) => {
  const [subscribed, setSubscribed] = useState(true);

  const data = [
    {
      text: 'Assigned date',
      value: '24 June 2023',
    },
    {
      text: 'Due Date',
      value: '09 Dec 2023',
    },
    {
      text: 'Amount',
      value: '$ 189',
    },
    {
      text: 'Subscription Duration',
      value: '7 months',
    },
  ];

  const unsubscribe = useCallback(() => {
    setSubscribed(false);
  }, []);

  const subscribe = useCallback(() => {
    setSubscribed(true);
  }, []);

  return (
    <>
      <div className="border rounded-lg px-6 py-4">
        <div className="flex-row items-center flex  space-y-1.5 px-4 py-4 mb-6  border-b border-border ">
          <div className="text-xl font-semibold text-slate-900">
            {' '}
            User Subscription{' '}
          </div>
        </div>
        <div className="py-6  border-b border-default-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-none">
              <div className="h-[148px] w-[148px] rounded">
                <img
                  src={subscritImg}
                  alt="dashtail"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="text-xl font-medium text-default-950 truncate">
                  {' '}
                  Monthly Subscription
                </div>
                <div className="space-x-3 ">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-blue-100 text-blue-700 bg-opacity-80">
                    {' '}
                    Canceled{' '}
                  </div>
                </div>
              </div>
              <div className="text-sm text-default-600 w-full  mt-1">
                Details of user's subscription plan
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 lg:gap-6">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="border border-dashed border-slate-300 rounded py-2.5 px-3 min-w-fit lg:min-w-[148px]"
                  >
                    <div className="text-sm font-xl text-slate-500 capitalize">
                      {item.text}
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentSubscription;
