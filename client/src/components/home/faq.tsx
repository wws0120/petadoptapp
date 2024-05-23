import { useState } from 'react';
import pic001 from '../../assets/pic001.webp';
import pic002 from '../../assets/pic002.webp';
import pic003 from '../../assets/pic003.webp';
import pad001 from '../../assets/pad001.png';
import Accordion from './accordion';
function Faq() {
  const [openedAccordion, setOpenedAccordion] = useState(null);
  const handleOpenAccordion = (index) => {
    setOpenedAccordion(index);
  };

  const accordions = [
    {
      id: 1,
      question: 'What is the adoption process like?',
      answer:
        'Our adoption process is designed to find the best match for both the pet and potential owner. It initially involves filling out an application, followed by a conversation with our team. If approved, the final step is the arrangement of the adoption meet-and-greet.',
    },

    {
      id: 2,
      question: 'Are the pets vaccinated and neutered/spayed before adoption?',
      answer:
        'Yes, all pets are given necessary vaccinations and are spayed or neutered prior to adoption as part of our commitment to the welfare of the animals.',
    },
    {
      id: 3,
      question: "Can I return the pet if it's not a good fit for my household?",
      answer:
        "Our goal is to find a forever home for each pet. We encourage you to give the pet a reasonable duration of time for adjustment. However, if it becomes clear that the situation isn't working out, we are committed to taking the pet back.",
    },
    {
      id: 4,
      question: 'What is included in the adoption fee?',
      answer:
        'The adoption fee includes the cost of spay/neuter surgery, vaccinations, microchip, de-worming, and an initial veterinary examination.',
    },
  ];

  return (
    <section className="max-container section-padding">
      <div className="flex items-center justify-center">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 items-center">
          <div className="px-2 md:px-6">
            <h2 className="text-4xl font-bold text-gray-950 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-base font-semibold text-gray-500">
              Lorem ipsum dolor sit amet, consect adipis elit. Suspend varius
              enim in eros element tristique.
            </p>
            {/* FAQ */}
            <div className="max-w-2xl mx-auto mt-10">
              <div className="hs-accordion-group space-y-4">
                {accordions.map((accordion, index) => {
                  return (
                    <Accordion
                      key={index}
                      answer={accordion.answer}
                      question={accordion.question}
                      index={index}
                      openedAccordion={openedAccordion}
                      setOpenedAccordion={setOpenedAccordion}
                    />
                  );
                })}
              </div>
            </div>
            {/* End FAQ */}
          </div>
          <div className="">
            <div className="relative grid sm:grid-cols-2 grid-cols-1 gap-5 items-center">
              <div className="space-y-6">
                <img src={pic001} className="rounded-xl" alt="" />
                <img src={pic002} className="rounded-xl" alt="" />
              </div>
              <img src={pic003} className="rounded-xl" alt="" />
              <div
                style={{ backgroundImage: `url(${pad001})` }}
                className="absolute  start-6  h-[600px] w-[600px] aspect-square bg-cover -z-10 md:block hidden"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;
