import { Icon } from '@iconify/react';

export default function FavoriteButton({ animalId, handleAddFavorite }) {
  const inWishlist = true;
  return (
    <button
      onClick={() => {
        handleAddFavorite(animalId);
      }}
      type="button"
      className="mt-0.5 flex h-10 w-10 mr-1 bg-white shrink-0 items-center justify-center rounded-full border  transition-colors"
    >
      {inWishlist ? (
        <Icon icon="ph:heart-fill" className="h-5 w-5 text-pink-600" />
      ) : (
        <Icon icon="ph:heart-light" className="h-5 w-5 text-red-600" />
      )}
    </button>
  );
}
