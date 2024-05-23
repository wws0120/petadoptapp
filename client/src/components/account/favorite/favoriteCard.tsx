import { Link } from 'react-router-dom';

type PetProps = {
  id: string;
  image: string;
  name: string;
  species: string;
  breed: string;
  sex: string;
  dateOfBirth: Date;
  status: string;
};

export default function FavoriteCard({
  id,
  image,
  name,
  species,
  breed,
  sex,
  dateOfBirth,
  status,
}) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-lg hover:scale-105">
      <Link to={`/animalinfo/${id}`}>
        <div className="relative block w-full">
          <img
            src={image}
            alt=""
            className="w-full object-cover aspect-[3/2]"
          />
        </div>

        <div className="p-4 ">
          <div className="text-lg font-bold text-gray-900  ">{name}</div>
          <div className="flex">
            <div className="inline-flex items-center text-base font-medium text-gray-500 ">
              {species} , {breed}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
