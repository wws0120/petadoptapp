import clsx from 'clsx';

import AnimalCard from './animalCard';

interface Props {
  animals: any;
  currentAnimalId: any;
  gridClassName?: string;
}

const RelatedAnimals = ({
  animals,
  currentAnimalId,
  petList,
  gridClassName,
  userIsLogin,
}: Props) => {
  return (
    <>
      <h2 className="text-lg text-heading tracking-tight font-semibold mb-6">
        Related Animals
      </h2>
      <div
        className={clsx(
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4',
          gridClassName
        )}
      >
        {animals?.map((item: any, i: number) => {
          if (currentAnimalId === item.id) {
            return null;
          }
          return (
            <AnimalCard
              animal={item}
              petList={petList}
              userIsLogin={userIsLogin}
              key={i}
            />
          );
        })}
      </div>
    </>
  );
};

export default RelatedAnimals;
