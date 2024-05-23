import { useState, useEffect, useRef } from 'react';
import {
  useGetCurrentUser,
  useGetMyProfile,
  useUpdateProfileMutation,
} from '../../hooks/querys/member';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BirthdayPicker from '../../components/account/profile/birthdayPicker';
import AvatarUploadModal from '../../components/account/profile/avatarUploadModal';
import { useForm, Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

function MyProfile() {
  const [modalOpen, setModalOpen] = useState(false);
  const { mutateAsync: updateProfileMutation } = useUpdateProfileMutation();
  const currentUserQuery = useGetCurrentUser();
  const currentUser = currentUserQuery.data?.data;
  const avatarUrl = currentUser?.imageUrl;
  const userProfileQuery = useGetMyProfile();
  const userProfile = userProfileQuery.data?.data;

  const {
    control,
    register,
    reset,
    setValue,
    getValues,
    setError,
    formState,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: userProfile?.data?.user?.name ?? null,
      email: userProfile?.data?.user?.email ?? null,
      biography: userProfile?.data?.userProfile?.email ?? null,
      phone: userProfile?.data?.userProfile?.phone ?? null,
      whatsapp: userProfile?.data?.userProfile?.whatsapp ?? null,
      dateOfBirth: userProfile?.data?.userProfile?.dateOfBirth ?? null,
      firstName: userProfile?.data?.userProfile?.firstName ?? null,
      lastName: userProfile?.data?.userProfile?.lastName ?? null,
      region: userProfile?.data?.address?.region ?? null,
      district: userProfile?.data?.address?.district ?? null,
      street: userProfile?.data?.address?.street ?? null,
      estate: userProfile?.data?.address?.estate ?? null,
      flat: userProfile?.data?.address?.flat ?? null,
      floor: userProfile?.data?.address?.floor ?? null,
      block: userProfile?.data?.address?.block ?? null,
    },
  });

  useEffect(() => {
    if (userProfile) {
      const defaultValues = {
        name: userProfile?.data?.user?.name ?? null,
        email: userProfile?.data?.user?.email ?? null,
        phone: userProfile?.data?.userProfile?.phone ?? null,
        whatsapp: userProfile?.data?.userProfile?.whatsapp ?? null,
        dateOfBirth: userProfile?.data?.userProfile?.dateOfBirth ?? null,
        firstName: userProfile?.data?.userProfile?.firstName ?? null,
        lastName: userProfile?.data?.userProfile?.lastName ?? null,
        biography: userProfile?.data?.userProfile?.biography ?? null,
        region: userProfile?.data?.address?.region ?? null,
        district: userProfile?.data?.address?.district ?? null,
        street: userProfile?.data?.address?.street ?? null,
        estate: userProfile?.data?.address?.estate ?? null,
        flat: userProfile?.data?.address?.flat ?? null,
        floor: userProfile?.data?.address?.floor ?? null,
        block: userProfile?.data?.address?.block ?? null,
      };
      reset(defaultValues);
    }
  }, [userProfile, reset]);

  function onSubmit(payload) {
    const payloadObject = {
      user: {
        name: payload.name ?? null,
      },
      userProfile: {
        whatsapp: payload.whatsapp ?? null,
        phone: payload.phone ?? null,
        dateOfBirth: payload.dateOfBirth ?? null,
        firstName: payload.firstName ?? null,
        lastName: payload.lastName ?? null,
        biography: payload.lastName ?? null,
      },
      address: {
        region: payload.region ?? null,
        district: payload.district ?? null,
        street: payload.street ?? null,
        estate: payload.estate ?? null,
        flat: payload.flat ?? null,
        floor: payload.floor ?? null,
        block: payload.block ?? null,
      },
    };
    updateProfileMutation(payloadObject);
  }

  return (
    currentUserQuery.isSuccess && (
      <div className="p-4 rounded-md w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-[#ebedf2] rounded-md px-2 py-6 md:px-8 mb-5 bg-white "
        >
          <div className="flex flex-col space-x-4 md:space-x-8 sm:flex-row">
            <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] rounded-full mb-5 relative">
              {currentUser.imageUrl ? (
                <img
                  src={currentUser.imageUrl}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="w-full h-full flex justify-center items-center bg-slate-100 rounded-full">
                  <Icon
                    className="h-10 w-10 text-gray-500"
                    icon="material-symbols:frame-person"
                  />
                </span>
              )}
              <Link
                onClick={() => setModalOpen(true)}
                to="#"
                className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
              >
                <Icon icon="ph:note-pencil" />
              </Link>
            </div>
            <div className="flex-1">
              <div className="mb-10">
                <h6 className="text-xl font-extrabold mb-5">
                  General Information
                </h6>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block font-semibold font-mono"
                    >
                      Email
                    </label>
                    <input
                      disabled
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="Email"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="displayname"
                      className="mb-1 block font-semibold font-mono"
                    >
                      Display Name
                    </label>
                    <input
                      id="displayname"
                      type="text"
                      {...register('name')}
                      placeholder="Name to display"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="firstname"
                      className="mb-1 block font-semibold font-mono"
                    >
                      First Name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      {...register('firstName')}
                      placeholder="First Name"
                      className="form-input"
                    />
                  </div>{' '}
                  <div>
                    <label
                      htmlFor="lastname"
                      className="mb-1 block font-semibold font-mono"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      {...register('lastName')}
                      placeholder="Last Name"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="mb-1 block font-semibold font-mono"
                    >
                      Date of Birth
                    </label>
                    <BirthdayPicker Controller={Controller} control={control} />
                  </div>
                  <div>
                    <label
                      htmlFor="biography"
                      className="mb-1 block font-semibold font-mono"
                    >
                      Biography
                    </label>
                    <textarea
                      id="biography"
                      {...register('biography')}
                      placeholder="Short Description"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h6 className="text-xl font-extrabold  mb-5">
                  Contact Information
                </h6>
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="mb-1 block font-semibold font-mono"
                      >
                        Whatsapp
                      </label>
                      <input
                        id="whatsapp"
                        type="text"
                        {...register('whatsapp')}
                        placeholder="Your Whatsapp"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1 block font-semibold font-mono"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="text"
                        {...register('phone')}
                        placeholder="Your contact number"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="region"
                        className="mb-1 block font-semibold font-mono"
                      >
                        Region
                      </label>
                      <select
                        defaultValue="Hong Kong Island"
                        id="region"
                        {...register('region')}
                        className="form-select text-white-dark"
                      >
                        <option value="All Countries">Select Region</option>
                        <option value="Hong Kong Island">
                          Hong Kong Island
                        </option>
                        <option value="Kowloon">Kowloon</option>
                        <option value="New Territories">New Territories</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="district"
                        className="mb-1 block font-semibold font-mono"
                      >
                        District
                      </label>
                      <input
                        id="district"
                        type="text"
                        {...register('district')}
                        placeholder="Enter District"
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="estate"
                        className="mb-1 block font-semibold font-mono"
                      >
                        Estate
                      </label>
                      <input
                        id="estate"
                        type="text"
                        {...register('estate')}
                        placeholder="Enter Estate"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="street"
                        className="mb-1 block font-semibold font-mono"
                      >
                        Street
                      </label>
                      <input
                        id="street"
                        type="text"
                        {...register('street')}
                        placeholder="Enter Street"
                        className="form-input"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="flat"
                          className="mb-1 block font-semibold font-mono"
                        >
                          Flat
                        </label>
                        <input
                          id="flat"
                          type="text"
                          {...register('flat')}
                          placeholder="Enter Flat"
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="floor"
                          className="mb-1 block font-semibold font-mono"
                        >
                          Floor
                        </label>
                        <input
                          id="floor"
                          type="text"
                          {...register('floor')}
                          placeholder="Enter Floor"
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="block"
                          className="mb-1 block font-semibold font-mono"
                        >
                          Block
                        </label>
                        <input
                          id="block"
                          type="text"
                          {...register('block')}
                          placeholder="Enter Block"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 mt-3">
                    <button
                      type="submit"
                      className="button-base button-primary"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {modalOpen && (
          <AvatarUploadModal closeModal={() => setModalOpen(false)} />
        )}
      </div>
    )
  );
}

export default MyProfile;
