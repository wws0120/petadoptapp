import FavoriteCard from './favoriteCard';

export default function FavoriteList({ petList }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-5 -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 ">
      {petList.map((pet) => (
        <FavoriteCard
          key={pet.id}
          id={pet.id}
          name={pet.name}
          image={pet.gallery[0]}
          species={pet.species}
          breed={pet.breed}
          sex={pet.sex}
          dateOfBirth={pet.dateOfBirth}
          status={pet.status}
        />
      ))}
    </div>
  );
}
