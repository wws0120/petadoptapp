import { Icon } from '@iconify/react';

interface Props {
  item: any;
}

const TestimonialCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="aspect-auto border border-gray-100 bg-white rounded-3xl my-10 shadow-2xl shadow-gray-600/10 p-8 sm:p-6 md:p-8 transition duration-300 ease-in-out w-[92%] md:w-[96.5%] lg:w-full mx-auto md:mx-0">
      <div className="w-[100px]">
        <img
          src={item.image}
          alt={item.adopter}
          className="rounded-full border-[5px] border-white shadow-avatar"
        />
      </div>
      <div className="text-lg font-bold text-gray-700 md:text-xl lg:text-2xl  xl:leading-10  2xl:text-2xl mt-7">
        {item.adopter}
      </div>

      <div className="text-base font-semibold text-slate-600 2xl:leading-[1.625rem] mt-7  sm:leading-6 leading-7">
        <Icon
          icon="icomoon-free:quotes-left"
          className="text-slate-200 text-2xl mb-4"
        />
        {item.content}
      </div>
    </div>
  );
};

export default TestimonialCard;
