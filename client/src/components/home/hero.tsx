import React from 'react';
import heroimg from '../../assets/heroimg001.webp';

const Hero = () => {
  return (
    <div className="relative ">
      <div className="absolute z-0 w-full h-full flex ">
        <img src={heroimg} alt="" className="object-cover w-full  h-full" />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-30 section-padding text-white flex flex-col items-center justify-center h-[33rem]">
        <h1 className="font-bold text-[48px] xs:text-[60px] md:text-[72px]  text-center ">
          Find your new best friend
        </h1>

        <h3 className="font-sm  text-[18px] sm:text-[22px]  text-center">
          Sharing your world with a loyal furry friend is undeniably rewarding.
        </h3>
        <h3 className="font-sm  text-[18px] sm:text-[22px] text-center -mt-1">
          Get welcomed into a special fellowship brimming with love and
          happiness.
        </h3>
      </div>
    </div>
  );
};

export default Hero;
