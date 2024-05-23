import React, { useState, useEffect } from 'react';
import { calculateAge } from '../../utils/helper';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetAnimalDetail,
  useGetRelatedAnimals,
} from '../../hooks/querys/animal';

import { useAdoptionRequestMutation } from '../../hooks/querys/adoption';

import { useGetCurrentUser } from '../../hooks/querys/member';
import { loginChecker } from '../../utils/authUtils';

import FavoriteButton from '../../components/animals/shared/favoriteButton';
import ThumbsCarousel from '../../components/animals/animalInfo/thumbsCarousel';
import CategoryBadges from '../../components/animals/animalInfo/categoryBadges';
import RelatedAnimals from '../../components/animals/animalInfo/relatedAnimals';
import AdoptionDialog from '../../components/animals/animalInfo/adoptionDialog';

export default function AnimalInfo() {
  const [dialogShow, setDialogShow] = useState(false);
  const { id: animalId } = useParams();
  const animalInfoQuery = useGetAnimalDetail(animalId);
  const currentUserQuery = useGetCurrentUser();
  const isLogin = loginChecker();

  const { mutateAsync: adoptionRequestMutation } = useAdoptionRequestMutation();

  const relatedAnimalsQuery = useGetRelatedAnimals(
    animalInfoQuery?.data?.data?.category
  );

  const relatedAnimals = relatedAnimalsQuery.data?.data;
  const currentUserInfo = currentUserQuery.data?.data;

  function convertStatusText(status) {
    switch (status) {
      case 'AVAILABLE':
        return 'Available for Adoption';
      case 'ADOPTED':
        return 'Already Adopted';
      case 'UNAVAILABLE':
        return 'Currently Unavailable';
      case 'RESERVED':
        return 'Reserved for Adoption';
      case 'PASSED':
        return 'Sadly Passed Away';
      default:
        return 'Unknown Status';
    }
  }

  const confirmAdoption = () => {
    if (!isLogin) {
      toast('Please Login to perform this action');
      return;
    }

    adoptionRequestMutation(animalInfoQuery.data?.data?.id);
  };

  const handleAdoptionClick = () => {
    setDialogShow(true);
  };

  return (
    <>
      {animalInfoQuery.data?.data && (
        <div className="rounded-lg bg-orange-50  px-2 md:px-5 py-4 ">
          <div className="flex flex-col border-b border-border-200 border-opacity-70 md:flex-row">
            <div className="p-2 md:w-1/2 ">
              <div className=" h-full">
                <ThumbsCarousel
                  gallery={animalInfoQuery.data?.data?.gallery}
                  hideThumbs={animalInfoQuery.data?.data?.gallery.length <= 1}
                />
              </div>
            </div>

            <div className="flex flex-col items-start px-2 pt-10 md:w-1/2 lg:px-14 xl:px-16">
              <div className="w-full">
                <div className="flex w-full items-start justify-between space-x-8">
                  <h1 className="text-xl font-bold tracking-tight text-amber-600 md:text-3xl xl:text-4xl ">
                    {animalInfoQuery.data?.data?.name}
                  </h1>

                  <span>
                    <FavoriteButton
                      animalId={animalInfoQuery.data?.data?.id}
                      petList={currentUserInfo?.savedPetIds}
                      userIsLogin={isLogin}
                    />
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="block px-3 py-1 bg-green-100 rounded-lg text-emerald-500 text-sm font-bold capitalize">
                    {convertStatusText(animalInfoQuery.data?.data?.status)}
                  </span>
                </div>

                {animalInfoQuery.data?.data?.description && (
                  <div className="mt-3 text-sm leading-7 text-body md:mt-4">
                    {animalInfoQuery.data?.data?.description}
                  </div>
                )}
                <div className="my-5  md:my-10">
                  <span className=" flex items-center">
                    <ins className="text-lg text-slate-900 font-semibold no-underline md:text-xl mb-1">
                      Animal Info
                    </ins>
                  </span>
                  <span className=" flex items-center">
                    <ins className="text-base text-slate-500 font-normal  no-underline md:text-lg mb-0.5">
                      Sex: {animalInfoQuery.data?.data?.sex}
                    </ins>
                  </span>
                  <span className="flex items-center ">
                    <ins className="text-base text-slate-500 font-normal  no-underline md:text-lg mb-0.5">
                      Age:{' '}
                      {calculateAge(animalInfoQuery.data?.data?.dateOfBirth)}
                    </ins>
                  </span>
                  <span className=" flex items-center ">
                    <ins className="text-base text-slate-500 font-normal  no-underline md:text-lg mb-0.5">
                      Breed: {animalInfoQuery.data?.data?.breed}
                    </ins>
                  </span>
                </div>
              </div>

              {!!animalInfoQuery.data?.data?.categories?.length && (
                <CategoryBadges
                  categories={animalInfoQuery.data?.data?.categories}
                />
              )}

              {animalInfoQuery.data?.data?.status === 'AVAILABLE' && (
                <div className="mt-2 flex items-center">
                  <button
                    onClick={handleAdoptionClick}
                    className="px-8 py-3 text-lg tracking-wider bg-[#3B0764] font-bold text-white rounded-xl transition hover:text-accent-hover hover:no-underline"
                  >
                    APPLY ADOPTION
                  </button>
                </div>
              )}
            </div>
          </div>
          {dialogShow && (
            <AdoptionDialog
              setDialogShow={setDialogShow}
              confirmAdoption={confirmAdoption}
            />
          )}
          <div className="border-b border-border-200 border-opacity-70 px-5 py-4  lg:py-14">
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-heading md:mb-6">
              details
            </h2>
            <p className="text-sm text-body">
              {animalInfoQuery.data?.data?.description}
            </p>
          </div>
          {relatedAnimals?.length! > 1 && (
            <div className="md:pb-10 px-5 py-4  lg:py-14">
              <RelatedAnimals
                animals={relatedAnimals}
                currentAnimalId={animalId}
                userIsLogin={isLogin}
                petList={currentUserInfo?.savedPetIds}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
