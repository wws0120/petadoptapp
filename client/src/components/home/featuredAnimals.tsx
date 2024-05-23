import FeaturedAnimalCard from './featuredAnimalCard';
import { useGetFeaturedAnimals } from '../../hooks/querys/animal';
import { Link } from 'react-router-dom';

const FeaturedAnimals = () => {
  const featuredAnimalsQuery = useGetFeaturedAnimals();
  const animals = featuredAnimalsQuery?.data?.data;

  return (
    <div className="max-container section-padding">
      <div className="border border-gray-300 rounded-md pt-5 md:pt-6 lg:pt-7 pb-5 lg:pb-7 px-4 md:px-5 lg:px-7">
        <div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
          <div className="flex items-center justify-between w-full -mt-2 lg:-mt-2.5">
            <h1 className="text-lg md:text-xl xl:text-3xl font-bold ">
              Featured Animals
            </h1>

            <Link
              to={'/animals'}
              className="bg-gray-400/50 text-white rounded-xl px-4 py-2"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-4 lg:gap-y-5 xl:lg:gap-y-6 2xl:gap-y-8">
          {animals && animals.length > 0 ? (
            animals?.map((animal: any) => (
              <FeaturedAnimalCard
                key={`key-${animal.id}`}
                animal={animal}
                imgWidth={324}
                imgHeight={324}
              />
            ))
          ) : (
            <h2 className="mt-2 font-semibold text-xl">No Related Content</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedAnimals;
