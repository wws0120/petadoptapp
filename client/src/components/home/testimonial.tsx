import TestimonialCard from './testimonialCard';
import TestimonialCarousel from './testimonialCarousel';
import { SwiperSlide } from 'swiper/react';
import img001 from '../../assets/testimonials001.webp';
import img002 from '../../assets/testimonials002.webp';
import img003 from '../../assets/testimonials003.webp';
import img004 from '../../assets/testimonials004.webp';
import img005 from '../../assets/testimonials005.webp';
import img006 from '../../assets/testimonials006.webp';
import img007 from '../../assets/testimonials007.webp';
import img008 from '../../assets/testimonials008.webp';

const testimonials = [
  {
    id: '001',
    adopter: 'Tom and Sarah',
    pet: 'Buddy',
    content:
      "Buddy has been an amazing addition to our family. We can't imagine our lives without him.",
    image: img001,
  },

  {
    id: '002',
    adopter: 'John and Mary',
    pet: 'Max',
    content:
      "Adopting Max was the best decision we've ever made. He's brought so much joy into our lives.",
    image: img002,
  },

  {
    id: '003',
    adopter: 'Mark',
    pet: 'Whiskers',
    content:
      'Adopting Whiskers was the greatest choice. He keeps me company and cheers me up all the time.',
    image: img003,
  },
  {
    id: '004',
    adopter: 'Robert',
    pet: 'Rex',
    content: "Rex is loyal and playful. Couldn't ask for a better companion.",
    image: img004,
  },
  {
    id: '005',
    adopter: 'Jennifer',
    pet: 'Fluffy',
    content:
      'Fluffy is so charming and makes my day better. Adopting her was a joy.',
    image: img005,
  },
  {
    id: '006',
    adopter: 'Austin',
    pet: 'Shadow',
    content:
      'Shadow is the perfect feline friend. She has definitely enriched my life.',
    image: img006,
  },
  {
    id: '007',
    adopter: 'Megan',
    pet: 'Bella',
    content:
      'Bella is my best friend. She’s so sweet and I’m thrilled to have her.',
    image: img007,
  },
  {
    id: '008',
    adopter: 'The Smith Family',
    pet: 'Misty',
    content:
      'Misty is the gem of our family. Our little girl is so happy to have her.',
    image: img008,
  },
];

const breakpoints = {
  '1720': {
    slidesPerView: 4,
    spaceBetween: 30,
  },
  '1366': {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  '1024': {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  '768': {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 30,
  },
};

const Testimonial = ({}) => {
  return (
    <div
      id="testimonial"
      className="relative max-container overflow-hidden after:content-[''] after:absolute after:inset-0 after:ml-[20rem] after:w-[50rem] after:h-[50rem] after:bg-gradient-to-tl after:to-amber-400/30  after:from-orange-600/30  after:blur-[240px] after:rounded-full after:-z-1 mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0 -mx-4 sm:mx-0"
    >
      <div className="mx-auto section-padding text-center ">
        <span className="text-blue-500 mb-2 block text-lg font-semibold">
          Testimonial
        </span>
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
          Adoption Success Stories
        </h2>
        <p className="font-light text-gray-500  sm:text-xl">
          Explore stories from our community who found their perfect companions
          through adoption.
        </p>
      </div>

      <TestimonialCarousel
        autoplay={false}
        breakpoints={breakpoints}
        className="testimonial-carousel"
        scrollbar={{ draggable: true, hide: false }}
      >
        {testimonials?.map((testimonial) => (
          <SwiperSlide key={`testimonial-${testimonial.id}`}>
            <TestimonialCard item={testimonial} />
          </SwiperSlide>
        ))}
      </TestimonialCarousel>
    </div>
  );
};

export default Testimonial;
