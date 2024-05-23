import React from 'react';
import img01 from '../../assets/dogheart.png';
import img02 from '../../assets/month.png';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function DonationSection() {
  return (
    <section id="supportus" className=" bg-stone-100">
      <div className="max-container section-padding">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-6 max-w-lg text-center ">
              <span className="text-blue-500 mb-2 block text-lg font-semibold">
                Support Our Work
              </span>
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
                Donation
              </h2>
              <p className="font-light text-gray-500  sm:text-xl">
                Help us champion animal welfare. Your generous donation fuels
                our mission and makes a difference.
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="  space-y-6   ">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-black p-6 rounded shadow sm:p-8">
              <div>
                <div className="space-y-2">
                  <h4 className="text-xl md:text-2xl font-bold">
                    One-time Donation
                  </h4>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    Make a Difference Today
                  </span>
                </div>
                <div className="w-64 mt-6 md:w-3/6 mx-auto md:mx-0 aspect-square">
                  <img className="object-cover" src={img01} />
                </div>
              </div>

              <div className="w-full mx-auto px-2 py-8 md:py-16 md:px-8">
                <p className="mt-3 mb-10 font-serif text-lg md:text-2xl">
                  Provide instantaneous aid to an animal in need with your
                  one-time donation.
                </p>
                <ul className="flex-1 mb-8">
                  <li className="flex mb-2 space-x-2">
                    <Icon
                      className="w-6 h-6 text-amber-500"
                      icon="lets-icons:check-fill"
                    />
                    <span>Immediate Impact</span>
                  </li>
                  <li className="flex mb-2 space-x-2">
                    <Icon
                      className="w-6 h-6 text-amber-500"
                      icon="lets-icons:check-fill"
                    />
                    <span>Direct Contribution</span>
                  </li>
                  <li className="flex mb-2 space-x-2">
                    <Icon
                      className="w-6 h-6 text-amber-500"
                      icon="lets-icons:check-fill"
                    />
                    <span>Flexible Support</span>
                  </li>
                </ul>
                <Link
                  to={'/donation?type=once'}
                  className="inline-block w-full md:w-auto px-5 py-3 font-bold  text-center rounded bg-black text-white hover:bg-slate-800/80"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center justify-between bg-white border border-black p-6 rounded shadow sm:p-8">
              <div>
                <div className="space-y-2">
                  <h4 className="text-xl md:text-2xl font-bold">
                    Monthly Donation
                  </h4>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    Become a Lifesaver
                  </span>
                </div>
                <div className="w-64 mt-6 md:w-3/6 mx-auto md:mx-0 aspect-square">
                  <img className="object-cover" src={img02} />
                </div>
              </div>

              <div className="w-full mx-auto px-2 py-8 md:py-16 md:px-8">
                <p className="mt-3 mb-10 font-serif text-lg md:text-2xl">
                  Regular donations can bring about continuous improvements in
                  an animal's life.
                </p>
                <ul className="flex-1 mb-8">
                  <li className="flex mb-2 space-x-2">
                    <Icon
                      className="w-6 h-6 text-amber-500"
                      icon="lets-icons:check-fill"
                    />
                    <span>Continual Impact</span>
                  </li>
                  <li className="flex mb-2 space-x-2">
                    <Icon
                      className="w-6 h-6 text-amber-500"
                      icon="lets-icons:check-fill"
                    />
                    <span>Sustained Support</span>
                  </li>
                  <li className="flex mb-2 space-x-2">
                    <Icon
                      className="w-6 h-6 text-amber-500"
                      icon="lets-icons:check-fill"
                    />
                    <span>Consistent Betterment</span>
                  </li>
                  <li className="flex mb-2 space-x-2">
                    <Icon
                      className="w-6 h-6 text-amber-500"
                      icon="lets-icons:check-fill"
                    />
                    <span>Enduring Change</span>
                  </li>
                </ul>

                <Link
                  to={'/donation?type=monthly'}
                  className="inline-block  w-full md:w-auto px-5 py-3 font-bold tracki text-center rounded bg-black text-white hover:bg-slate-800/80"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DonationSection;
