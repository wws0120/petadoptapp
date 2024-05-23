import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/edu001.webp';

function EduSection() {
  return (
    <section
      style={{ backgroundImage: `url(${background})` }}
      className="section-padding w-full table relative bg-center bg-cover"
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="max-container mx-auto relative">
        <div className="my-12 mx-4 grid grid-cols-1  text-center">
          <h3 className="mb-8  text-3xl lg:text-4xl text-white font-semibold">
            Education Activities
          </h3>

          <p className=" text-slate-100 text-lg opacity-80 max-w-3xl mx-auto">
            Welcome to our educational event section! We firmly believe in the
            power of education to cultivate respect for life and nurture a love
            for animals. That's why we are thrilled to present our upcoming
            Education Talks, designed to enlighten participants about the needs
            and emotions of animals while raising public awareness on crucial
            animal welfare issues.
          </p>

          <div className="relative mt-10">
            <Link
              to="/events?category=education_day"
              className="button-base button-primary"
            >
              Know More !
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EduSection;
