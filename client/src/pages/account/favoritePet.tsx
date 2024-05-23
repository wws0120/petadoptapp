import React from 'react';
import { useGetCurrentUser } from '../../hooks/querys/member';
import { useGetFavoriteAnimals } from '../../hooks/querys/favorite';
import FavoriteList from '../../components/account/favorite/favoriteList';
import { useSelector } from 'react-redux';

function FavoritePet() {
  const currentUserQuery = useGetCurrentUser();
  const currentUser = currentUserQuery.data?.data;
  const favoriteAnimalsQuery = useGetFavoriteAnimals(currentUser?.id);
  const savedPets = favoriteAnimalsQuery.data?.data;

  return (
    <>
      <div className="grid  px-2 py-6 md:px-8   mb-4">
        <div className="relative z-10  flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-900  sm:text-sm">
            {savedPets ? savedPets.length : '0'} animals
          </span>
        </div>
        {savedPets && <FavoriteList petList={savedPets} />}
      </div>
    </>
  );
}

export default FavoritePet;
