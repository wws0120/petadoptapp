import PhotosUploader from '../../dashboard/animals/photosUploader';
import CoverUploadModal from '../../dashboard/events/coverUploadModal';
import EventDatePicker from '../../dashboard/events/eventDatePicker';
import { getCloudinarySign } from '../../../services/cloudinaryServices';
import {
  useCreateEventMutation,
  useUpdateEventMutation,
  useGetEventContent,
} from '../../../hooks/querys/event';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

function EventForm({ event }) {
  const navigate = useNavigate();

  const [uploadModal, setUploadModal] = useState(false);

  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const { mutateAsync: createEventMutation } = useCreateEventMutation();
  const { mutateAsync: updateEventMutation } = useUpdateEventMutation();

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
      title: event.title,
      coverImage: event.coverImage,
      category: event.category,
      content: event.content,
      eventDate: event.eventDate,
      startTime: event.startTime,
      endTime: event.endTime,
      status: event.status,
    },
  });
  const uploadedUrl = getValues('coverImage');

  useEffect(() => {
    const defaultValues = {
      title: event.title,
      coverImage: event.coverImage,
      category: event.category,
      content: event.content,
      eventDate: event.eventDate,
      startTime: event.startTime,
      endTime: event.endTime,
      status: event.status,
    };

    reset(defaultValues);
  }, [event, reset]);

  function inputHeader(text) {
    return (
      <h2 className="pointer-events-none font-mono block text-xl mt-4 font-medium text-gray-900">
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
    if (!event.id) {
      createEventMutation(payload);
    } else {
      updateEventMutation(event.id, payload);
    }

    navigate('/dashboard/eventlist');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <div className="flex gap-4">
            <h2 className="pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900">
              Clover Image
            </h2>

            <button
              type="button"
              onClick={() => {
                setUploadModal(true);
              }}
              className="ml-8 mt-1 text-[15px] font-bold  border  rounded-md px-3 bg-purple-400 text-white hover:text-neutral-400 hover:bg-white hover:border-purple-400 transition-colors"
            >
              Upload Clover Image
            </button>
          </div>
          {uploadedUrl && (
            <>
              <div>Preview</div>
              <div className="h-32">
                <img className="object-contain h-full" src={uploadedUrl} />
              </div>
            </>
          )}
        </div>
        {preInput(
          'Title',
          'Title for the event. should be short and catchy as in advertisement'
        )}
        <input
          type="text"
          {...register('title')}
          placeholder="title, for example: My lovely apt"
        />
        <EventDatePicker control={control} Controller={Controller} />
        <div>
          <label
            htmlFor="time"
            className="pointer-events-none font-mono block text-xl mt-4 font-medium text-gray-900"
          >
            Time
          </label>

          <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
            <div>
              <label
                htmlFor="time"
                className="text-gray-dark duration-300 xl:text-base 3xl:text-lg "
              >
                From
              </label>
              <input
                type="time"
                id="startTime"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
                {...register('startTime')}
              ></input>
            </div>
            <div>
              <label
                htmlFor="time"
                className="text-gray-dark duration-300 xl:text-base 3xl:text-lg "
              >
                To
              </label>
              <input
                type="time"
                id="endTime"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
                {...register('endTime')}
              ></input>
            </div>
          </div>
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
              {...register('category')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
            >
              <option value="ADOPTION_EVENT">Adoption Event</option>
              <option value="FUNDRAISING_EVENT">Fundraising Event</option>
              <option value="EDUCATION_DAY">Education Day</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="pointer-events-none font-mono block text-xl mt-4 font-medium text-gray-900"
            >
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full "
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {preInput('Content', 'content of the event')}
        <textarea {...register('content')} />

        <button type="submit" className="button-base button-primary my-4">
          Save
        </button>
      </form>
      {uploadModal && (
        <CoverUploadModal
          closeModal={() => setUploadModal(false)}
          setValue={setValue}
        />
      )}
    </>
  );
}

export default EventForm;
