import React from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { useAddFavoriteMutation } from '../../../hooks/querys/favorite';
import { useRemoveFavoriteMutation } from '../../../hooks/querys/favorite';

function FavoriteButton({ animalId, petList, userIsLogin }) {
  const isAnimalSaved = (id, petList) => {
    return petList?.includes(id) ?? false;
  };

  const { mutateAsync: addFavoriteMutation } = useAddFavoriteMutation();
  const { mutateAsync: removeFavoriteMutation } = useRemoveFavoriteMutation();

  const inWishlist = isAnimalSaved(animalId, petList);

  const handleAddFavorite = (animalId, isInFavourite) => {
    if (!userIsLogin) {
      toast('Please Login to perform this action');
      return;
    }
    if (isInFavourite) {
      removeFavoriteMutation(animalId);
    } else {
      addFavoriteMutation(animalId);
    }
  };

  return (
    <button
      onClick={() => {
        handleAddFavorite(animalId, inWishlist);
      }}
      type="button"
      className="mt-0.5 flex h-10 w-10 mr-1 bg-white shrink-0 items-center justify-center rounded-full border  transition-colors"
    >
      {inWishlist ? (
        <Icon icon="ph:heart-fill" className="h-5 w-5 text-pink-600" />
      ) : (
        <Icon icon="ph:heart" className="h-5 w-5 text-slate-600 font-bold" />
      )}
    </button>
  );
}

export default FavoriteButton;
