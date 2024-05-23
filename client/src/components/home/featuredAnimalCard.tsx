import clsx from 'clsx';

import type { FC } from 'react';
import image001 from '../../assets/category001.webp';
import { Link } from 'react-router-dom';

interface AnimalProps {
  animal: any;
  className?: string;
}

const FeaturedAnimalCard: FC<AnimalProps> = ({
  animal,
  className = '',
  imgWidth = 340,
  imgHeight = 440,
}) => {
  const {
    id,
    name,
    gallery,
    category,
    species,
    breed,
    sex,
    description,
    status,
    dateOfBirth,
  } = animal ?? {};

  return (
    <Link
      to={`/animalInfo/${id}`}
      className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 md:pb-1 flex-col items-start bg-white"
      role="button"
      title={name}
    >
      <div className="flex overflow-hidden rounded-md mb-0.5 md:mb-1 pb-0">
        <img
          src={gallery[0]}
          width={imgWidth}
          height={imgHeight}
          alt={name || 'Animal Image'}
          className="bg-gray-300 object-cover rounded-s-md w-full aspect-[4/3] rounded-md transition duration-150 ease-linear transform group-hover:scale-105"
        />
      </div>
      <div className="p-2 w-full">
        <div className="flex justify-between w-full mx-auto items-center ">
          <h2 className=" capitalize font-semibold text-xl  space-s-2 lg:text-lg">
            {name}
          </h2>

          <div className="space-x-1">
            <span className="bg-amber-400/10 text-amber-600 text-[12px] font-semibold overflow-hidden whitespace-pre max-md:text-sm px-2.5 py-0.5 rounded h-5">
              {category}
            </span>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className=" font-semibold text-gray-500   lg:mt-1 text-base sm:text-sm">
            <span className="inline-block">
              {breed}, {sex}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedAnimalCard;
