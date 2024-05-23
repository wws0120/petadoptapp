import axios from 'axios';
import { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import { getCloudinarySign } from '../../../services/cloudinaryServices';

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const getSignatureForUpload = async (folder) => {
    try {
      const res = await getCloudinarySign(folder);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const onUpload = async () => {
    const { timestamp: imgTimestamp, signature: imgSignature } =
      await getSignatureForUpload();

    const resUrl = await uploadFile(imgTimestamp, imgSignature, uploadImage);
    //setValue('imageUrl', resUrl);
    setImageUrl('coverImage', resUrl);
    if (resUrl) {
      toast('Image uploaded successfully');
      closeModal();
    }
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      onChange((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
  });

  const [photoLink, setPhotoLink] = useState('');
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    onChange([...addedPhotos.filter((photo) => photo !== filename)]);
  }
  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
  }

  const removeFile = (name) => {
    onChange((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    onChange([]);
    setRejected([]);
  };

  return (
    <>
      <label
        htmlFor="photos"
        className="block text-2xl mt-4 font-medium text-gray-900 "
      >
        Photos
      </label>
      <div className="mt-2 grid gap-2 max-w-xl ">
        <div
          {...getRootProps({})}
          className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
        >
          <input
            name="file_upload"
            multiple
            className="hidden"
            {...getInputProps()}
          />
          <span class="flex items-center space-x-2">
            <Icon
              className="h-6 w-6 text-gray-600"
              icon="mdi:file-image-plus"
            />
            {isDragActive ? (
              <p className="text-gray-500">Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </span>
        </div>
      </div>
      <div>
        {/* Preview */}
        <section className="mt-10">
          <div className="flex gap-4">
            <h2 className="title text-3xl font-semibold">Preview</h2>
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
            >
              Remove all files
            </button>
            <button
              type="submit"
              className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
            >
              Upload to Cloudinary
            </button>
          </div>

          {/* Accepted files */}
          <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
            Accepted Files
          </h3>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
            {addedPhotos.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                />
                <button
                  type="button"
                  className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  <Icon
                    className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors"
                    icon="ph:x-bold"
                  />
                </button>
                <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>

          {/* Rejected Files */}
          <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
            Rejected Files
          </h3>
          <ul className="mt-6 flex flex-col">
            {rejected.map(({ file, errors }) => (
              <li key={file.name} className="flex items-start justify-between">
                <div>
                  <p className="mt-2 text-neutral-500 text-sm font-medium">
                    {file.name}
                  </p>
                  <ul className="text-[12px] text-red-400">
                    {errors.map((error) => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                  onClick={() => removeRejected(file.name)}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
