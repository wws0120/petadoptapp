import { useRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation, Autoplay, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { Icon } from '@iconify/react';

type CarouselPropsType = {
  breakpoints?: {} | any;
  navigation?: {} | any;
  scrollbar?: {} | any;
  autoplay?: {} | any;
};

const TestimonialCarousel: React.FunctionComponent<CarouselPropsType> = ({
  children,
  breakpoints,
  autoplay = {
    delay: 4000,
  },
  ...props
}) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="px-6 py-2 w-11/12 mx-auto relative">
      <Swiper
        modules={[Navigation, Autoplay, Scrollbar]}
        loop={true}
        autoplay={autoplay}
        breakpoints={breakpoints}
        navigation={{
          prevEl: prevRef.current, //? prevRef.current : undefined,
          nextEl: nextRef.current, //? nextRef.current : undefined,
        }}
        onBeforeInit={(swiper): void => {
          const navigation = swiper.params.navigation;
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.update();
        }}
        {...props}
      >
        {children}
      </Swiper>

      <button
        ref={prevRef}
        aria-label="prev-button"
        className="hidden w-7 h-7 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl text-black sm:flex items-center justify-center rounded-full  bg-white absolute transition duration-250 hover:bg-gray-500/40 hover:text-white focus:outline-none left-0 top-2/4 z-10"
      >
        <Icon icon="fluent:ios-arrow-24-filled" />
      </button>
      <button
        ref={nextRef}
        aria-label="next-button"
        className="hidden w-7 h-7 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl text-black sm:flex items-center justify-center rounded-full  bg-white absolute transition duration-250 hover:bg-gray-500/40 hover:text-white focus:outline-none right-0 top-2/4 z-10 "
      >
        <Icon icon="fluent:ios-arrow-rtl-24-filled" />
      </button>
    </div>
  );
};

export default TestimonialCarousel;
