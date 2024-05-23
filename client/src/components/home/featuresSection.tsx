import React from 'react';
import { Icon } from '@iconify/react';

function FeaturesSection() {
  return (
    <section>
      <div className="max-container">
        <div className="section-padding text-gray-500">
          <div className="relative">
            <div className="mx-auto mb-5 text-center md:mb-8 md:max-w-xl lg:mb-12 lg:max-w-3xl xl:max-w-[1000px]">
              <span className="text-blue-500 mb-2 block text-lg font-semibold">
                Our Core
              </span>
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
                Rescue, Love, Adopt
              </h2>
              <p className="font-light text-gray-500  sm:text-xl">
                Discover our uniqueness in transforming stray pet lives. Through
                compassion and commitment, we redefine life after rescue.
              </p>
            </div>
            <div className="relative grid gap-3 grid-cols-6">
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-violet-100 border border-gray-200 ">
                <div>
                  <div className="text-center relative space-y-2">
                    <Icon
                      className="inline-block text-gray-900  h-12 w-12 mb-2"
                      icon="uil:heart"
                    />
                    <h2 className="mb-6 text-2xl font-semibold leading-[1.33] text-black">
                      Lives Saved
                    </h2>
                    <p className=" text-gray-500 ">
                      Over 300 stray pets provided a safe, loving environment
                      annually. Your adoption can increase this number.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-amber-100 border border-gray-200 ">
                <div className="text-center relative z-10 space-y-2">
                  <Icon
                    className="inline-block text-gray-900  h-12 w-12 mb-2"
                    icon="uil:medical-square"
                  />
                  <h2 className="mb-6 text-2xl font-semibold leading-[1.33] text-black">
                    Medical Assistance
                  </h2>
                  <p className=" text-gray-500 ">
                    All our rescues receive a full health check-up, timely
                    vaccinations, and necessary treatments.
                  </p>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3 lg:col-span-2 overflow-hidden relative p-8 rounded-xl bg-lime-100 border border-gray-200 ">
                <div>
                  <div className="text-center relative space-y-2">
                    <Icon
                      className="inline-block text-gray-900  h-12 w-12 mb-2"
                      icon="lucide:paw-print"
                    />
                    <h2 className="mb-6 text-2xl font-semibold leading-[1.33] text-black">
                      Behavioural Training
                    </h2>
                    <p className=" text-gray-500 ">
                      Our expert team works on behavioral improvement, helping
                      your pet adjust swiftly to a new home.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-3  overflow-hidden relative p-8 rounded-xl bg-sky-100 border border-gray-200 ">
                <div className=" text-center relative space-y-2">
                  <Icon
                    className="inline-block text-gray-900 h-12 w-12 mb-2"
                    icon="mdi:partnership-outline"
                  />

                  <h2 className="mb-65 text-2xl font-semibold leading-[1.33] text-black">
                    Volunteer Program
                  </h2>
                  <p className="text-gray-500 ">
                    An active volunteer program where anyone passionate about
                    animal welfare can contribute.
                  </p>
                </div>
              </div>
              <div className="col-span-full lg:col-span-3 overflow-hidden relative p-8 rounded-xl bg-red-100 border border-gray-200 text-center">
                <div className="text-center relative space-y-2">
                  <Icon
                    className="inline-block text-gray-900  h-12 w-12 mb-2"
                    icon="bi:house-heart"
                  />
                  <h2 className="mb-6 text-2xl font-semibold leading-[1.33] text-black">
                    Strong Adoption Network
                  </h2>
                  <p className="text-gray-500 ">
                    A robust network of committed adopters that help us ensure
                    each pet finds the right forever home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
