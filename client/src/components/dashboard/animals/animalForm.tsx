import PhotosUploader from '../../dashboard/animals/photosUploader';
import ImgUploadModal from '../../dashboard/animals/imgUploadModal';
import AnimalBirthPicker from '../../dashboard/animals/animalBirthPicker';
import { getCloudinarySign } from '../../../services/cloudinaryServices';
import {
  useAddAnimalMutation,
  useUpdateAnimalMutation,
  useGetAnimalDetail,
} from '../../../hooks/querys/animal';

import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

function AnimalForm({ animal }) {
  const navigate = useNavigate();

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const { mutateAsync: addAnimalMutation } = useAddAnimalMutation();
  const { mutateAsync: updateAnimalMutation } = useUpdateAnimalMutation();

  const {
    control,
    register,
    reset,
    watch,
    setValue,
    getValues,
    setError,
    formState,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: animal.name,
      gallery: animal.gallery,
      category: animal.category,
      species: animal.species,
      breed: animal.breed,
      sex: animal.sex,
      dateOfBirth: animal.dateOfBirth,
      weight: animal.weight,
      status: animal.status,
      description: animal.description,
    },
  });

  const uploadedUrls = getValues('gallery');

  useEffect(() => {
    const defaultValues = {
      name: animal.name,
      gallery: animal.gallery,
      category: animal.category,
      species: animal.species,
      breed: animal.breed,
      sex: animal.sex,
      dateOfBirth: animal.dateOfBirth,
      weight: animal.weight,
      status: animal.status,
      description: animal.description,
    };

    reset(defaultValues);
  }, [animal, reset]);

  function inputHeader(text) {
    return (
      <h2 className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900">
        {text}
      </h2>
    );
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const onSubmit = (payload) => {
    if (!animal.id) {
      addAnimalMutation(payload);
    } else {
      updateAnimalMutation({ id: animal.id, payload });
    }

    navigate('/dashboard/animallist');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="name"
              className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              {...register('name')}
              placeholder="Input name of the animal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <AnimalBirthPicker control={control} Controller={Controller} />
        </div>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
          <div>
            <label
              htmlFor="category"
              className="pointer-events-none font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
              {...register('category')}
            >
              <option value="DOG">Dog</option>
              <option value="CAT">Cat</option>
              <option value="SMALL_MAMMAL">Small Mammal</option>
              <option value="BIRD">Bird</option>
              <option value="REPTILE">Reptile</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="species"
              className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Species
            </label>
            <input
              type="text"
              id="species"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ex. dog, cat, rabbit"
              {...register('species')}
            />
          </div>
          <div>
            <label
              htmlFor="weight"
              className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Pet Weight (kg)
            </label>
            <input
              type="number"
              step=".1"
              id="weight"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              defaultValue={1}
              placeholder="Ex. 12"
              {...register('weight', { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
          <div>
            <label
              htmlFor="breed"
              className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Breed
            </label>
            <input
              type="text"
              id="breed"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ex. Domestic Shorthair, Labrador Retriever"
              {...register('breed')}
            />
          </div>
          <div>
            <label
              htmlFor="sex"
              className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Sex
            </label>
            <select
              id="sex"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
              {...register('sex')}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="adoption-status"
              className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Adoption Status
            </label>
            <select
              id="adoption-status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
              {...register('status')}
            >
              <option value="AVAILABLE">Available</option>
              <option value="ADOPTIONAPPROVED">Adoption Approved</option>
            </select>
          </div>
        </div>
        <div className="mt-6  mb-6">
          <div className="flex gap-4">
            <h2 className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900">
              Animal Photos
            </h2>

            <button
              type="button"
              onClick={() => {
                setUploadModal(true);
              }}
              className="ml-8 mt-1 text-[15px] font-bold  border  rounded-md px-3 bg-purple-400 text-white hover:text-neutral-400 hover:bg-white hover:border-purple-400 transition-colors"
            >
              Upload Photos
            </button>
          </div>

          {watch('gallery') && watch('gallery').length > 0 && (
            <>
              <div>Preview</div>
              <div className="flex gap-1 flex-wrap ">
                {watch('gallery').map((url) => {
                  return (
                    <div className="h-32 w-46">
                      <img className="object-contain h-full" src={url} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {preInput('Description', 'Short description of the animal')}
        <textarea {...register('description')} />

        <button className="button-base button-primary my-4">Save</button>
      </form>
      {uploadModal && (
        <ImgUploadModal
          closeModal={() => setUploadModal(false)}
          setValue={setValue}
          watch={watch}
        />
      )}
    </>
  );
}

export default AnimalForm;
