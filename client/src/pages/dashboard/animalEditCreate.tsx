import AnimalForm from '../../components/dashboard/animals/animalForm';
import { useGetAnimalDetail } from '../../hooks/querys/animal';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function AnimalEditCreate() {
  const { id } = useParams();

  const animalDetailQuery = useGetAnimalDetail(id);
  const animalData = animalDetailQuery.data
    ? animalDetailQuery.data.data
    : {
        id: null,
        name: null,
        gallery: [],
        category: null,
        species: null,
        breed: null,
        sex: null,
        dateOfBirth: null,
        weight: null,
        status: null,
        description: null,
      };

  return (
    <div className="p-4">
      <h4 className="font-bold text-2xl">
        {id ? 'Edit Animal' : 'Add Animal'}
      </h4>
      <AnimalForm animal={animalData} />
    </div>
  );
}
