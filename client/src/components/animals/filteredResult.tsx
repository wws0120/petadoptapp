import { useInView } from 'react-intersection-observer';
import { useGetFilteredAnimals } from '../../hooks/querys/animal';
import { useGetCurrentUser } from '../../hooks/querys/member';
import { useSearchParams } from 'react-router-dom';
import { loginChecker } from '../../utils/authUtils';
import ListingCard from './listingCard';

export default function FilteredResult({ data }) {
  const getUserQuery = useGetCurrentUser();
  const petList = getUserQuery ? getUserQuery.data?.data.savedPetIds : [];
  const isLogin = loginChecker();
  const queryContent = data?.pages.map((page) => {
    return page.data.data.map((data, i) => {
      return (
        <ListingCard
          key={`animal-${i}`}
          id={data.id}
          image={data.gallery[0]}
          name={data.name}
          breed={data.breed}
          species={data.species}
          dateOfBirth={data.dateOfBirth}
          sex={data.sex}
          userIsLogin={isLogin}
          petList={petList}
        />
      );
    });
  });
  return (
    <div className="mt-1 mb-6 grid grid-cols-1 gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 3xl:gap-y-10 4xl:grid-cols-4">
      {queryContent}
    </div>
  );
}
