import React from 'react';
import img01 from '../../assets/image001.webp';
import img02 from '../../assets/image002.webp';
import img03 from '../../assets/image003.webp';

function PromoSection() {
  return (
    <section>
      {/* Section Spacer */}
      <div className="max-container bg-gradient-to-t from-lime-50 to-orange-50">
        {/* Section Container */}
        <div className="section-padding">
          {/* Section Content Block */}
          <div className="mx-auto mb-5 text-center md:mb-8 md:max-w-xl lg:mb-12 lg:max-w-3xl xl:max-w-[1000px]">
            <span className="text-blue-500 mb-2 block text-lg font-semibold">
              Our Goal
            </span>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
              Discover, adopt, and love.
            </h2>
            <p className="font-light text-gray-500  sm:text-xl">
              Find your perfect furry companion with our pet adoption app.
              Browse profiles, connect with caregivers, and schedule
              meet-and-greets. Access educational resources for seamless
              integration.
            </p>
          </div>
          {/* Section Content Block */}
          {/* Promo List */}
          <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Promo Item */}
            <li className="text-center md:text-left">
              <div className="mx-auto mb-4 inline-flex w-full h-auto justify-center md:justify-normal xxl:h-[60px]">
                <img
                  src={img01}
                  alt="promoimage-1"
                  className="h-full w-auto rounded-md"
                />
              </div>
              <div className="mb-5 font-raleway text-2xl font-bold leading-[1.33] text-black">
                Saving Lives One Paw at a Time
              </div>
              <p className="text-lg leading-[1.42] xl:text-[18px] text-slate-800">
                Join our dedicated team of volunteer as we tirelessly rescue and
                provide second chances to deserving furry friends.
              </p>
            </li>
            {/* Promo Item */}
            {/* Promo Item */}
            <li className="text-center md:text-left">
              <div className="mx-auto mb-4 inline-flex w-full h-auto justify-center md:justify-normal xxl:h-[60px]">
                <img
                  src={img02}
                  alt="promoimage-2"
                  className="h-full w-auto rounded-md"
                />
              </div>
              <div className="mb-5 font-raleway text-2xl font-bold leading-[1.33] text-black">
                Finding Forever Homes Together
              </div>
              <p className="text-lg leading-[1.42] xl:text-[18px] text-slate-800">
                Experience exclusive adoption promotions and special events that
                make finding your perfect furry companion even more rewarding.
              </p>
            </li>
            {/* Promo Item */}
            {/* Promo Item */}
            <li className="text-center md:text-left">
              <div className="mx-auto mb-4 inline-flex w-full h-auto justify-center md:justify-normal xxl:h-[60px]">
                <img
                  src={img03}
                  alt="promoimage-3"
                  className="h-full w-auto rounded-md"
                />
              </div>
              <div className="mb-5 font-raleway text-2xl font-bold leading-[1.33] text-black">
                Empowering Pet Parents for a Lifetime
              </div>
              <p className="text-lg leading-[1.42] xl:text-[18px] text-slate-800">
                Gain valuable knowledge and resources through our comprehensive
                life education program, ensuring a happy and healthy life for
                your furry family member.
              </p>
            </li>
            {/* Promo Item */}
          </ul>
          {/* Promo List */}
        </div>
        {/* Section Container */}
      </div>
      {/* Section Spacer */}
    </section>
  );
}

export default PromoSection;
