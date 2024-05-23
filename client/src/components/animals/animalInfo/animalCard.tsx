import Image from '../../../components/shared/ui/Image';
import { Toast } from 'react-toastify/dist/components';
import FavoriteButton from '../shared/favoriteButton';
import { clsx } from 'clsx';

import { Link } from 'react-router-dom';

import { Icon } from '@iconify/react';

type AnimalProps = {
  animal: any;
  className?: string;
};

const AnimalCard: React.FC<AnimalProps> = ({
  animal,
  className,
  userIsLogin,
  petList,
}) => {
  const {
    id,
    name,
    gallery,
    category,
    species,
    breed,
    sex,
    status,
    dateOfBirth,
  } = animal ?? {};

  return (
    <Link
      to={`/animalInfo/${id}`}
      className={clsx(
        'h-full overflow-hidden rounded border border-border-200 bg-white transition-shadow duration-200 hover:shadow-sm',
        className
      )}
    >
      <div className="relative flex  w-auto items-center justify-center ">
        <span className="sr-only">animal-image</span>

        <div className="5">
          <img
            src={gallery[0]}
            className="aspect-[34/25] object-fit"
            alt="pet"
          />
        </div>

        <div className="absolute top-3 rounded-full bg-amber-100 text-yellow-600 px-1.5 text-xs font-semibold leading-6 text-light right-3  sm:px-2 md:top-4 md:px-2.5 md:right-4 ">
          {category}
        </div>
      </div>

      <header className="relative p-2 md:p-3 md:px-5">
        <h3 className="mb-0.5 text-sm md:text-xl font-bold">{name}</h3>
        <p className="text-base text-slate-600 text-muted">{sex}</p>

        <div className="relative mt-1 flex min-h-6 items-center justify-between md:mt-2">
          <>
            <div>
              <span className="text-sm font-semibold text-slate-500 md:text-[15px]">
                {breed}
              </span>
              <span> - </span>
              <span className="text-sm font-semibold text-slate-500 md:text-[15px]">
                {species}
              </span>
            </div>

            {userIsLogin && (
              <FavoriteButton
                animalId={id}
                userIsLogin={userIsLogin}
                petList={petList}
              />
            )}
          </>
        </div>
      </header>
    </Link>
  );
};

export default AnimalCard;
