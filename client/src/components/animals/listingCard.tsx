import { Link } from 'react-router-dom';
import { calculateAge } from '../../utils/helper';
import FavoriteButton from './shared/favoriteButton';

export default function ListingCard({
  id,
  image,
  name,
  breed,
  species,
  dateOfBirth,
  sex,
  userIsLogin,
  petList,
}) {
  return (
    <>
      <div className=" bg-white overflow-hidden rounded-xl group/item relative inline-flex w-full flex-col hover:shadow-lg hover:-translate-y-2 ">
        <div className="relative w-full  ">
          {userIsLogin && (
            <div className="absolute top-4 right-3 z-10 inline-block">
              <FavoriteButton
                animalId={id}
                userIsLogin={userIsLogin}
                petList={petList}
              />
            </div>
          )}
          <Link to={`/animalinfo/${id}`}>
            <div className=" after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-1/4 after:w-full after:bg-gradient-to-t after:from-black/25">
              <img
                src={image}
                className="aspect-[34/25]  bg-gray-lighter "
                alt="pet"
              />
            </div>
          </Link>
        </div>
        <Link to={`/animalinfo/${id}`}>
          <div className="content p-3 ">
            <div className=" flex items-center gap-5">
              <span className="relative flex items-center text-xl font-bold text-slate-700 before:absolute before:-right-3 before:block before:h-1 before:w-1 before:rounded-full before:bg-gray-dark">
                {name}
              </span>
            </div>
            <p className="text-ellipsis text-sm font-bold text-orange-700 mb-1.5">
              <span>{breed}, </span>
              <span>{species}</span>
            </p>
            <p className=" text-sm text-gray-600 capitalize ">
              <span>{sex}, </span>
              <span>{calculateAge(dateOfBirth)}</span>
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
