import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/reducers/loadingSlice';
import { getSignatureForUpload, uploadFiles } from '../../../utils/cloundinary';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';

const ImgUploader = ({
  uploadImages,
  setUploadImages,
  formGallery,
  previewImages,
  setPreviewImages,
  setImageUrls,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const onSelectFile = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;
    setUploadImages([...uploadImages, ...files]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setPreviewImages([...previewImages, URL.createObjectURL(file)]);
    }
  };

  const onUpload = async () => {
    dispatch(showLoading());
    const { timestamp: imgTimestamp, signature: imgSignature } =
      await getSignatureForUpload();
    const resUrls = await uploadFiles(imgTimestamp, imgSignature, uploadImages);

    if (resUrls && resUrls.length > 0) {
      setImageUrls('gallery', [...formGallery, ...resUrls]);
      toast('Images uploaded successfully');
      closeModal();
    }
    dispatch(hideLoading());
  };

  const removeAll = () => {
    setUploadImages([]), setPreviewImages([]);
  };

  const removeFile = (filename) => {
    setUploadImages(
      uploadImages.filter((file) => {
        return file.name != filename;
      })
    );
  };

  return (
    <>
      <div className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-700 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-200 file:text-sky-800 hover:file:bg-gray-300"
        />
      </div>
      <div>
        <section className="mt-10">
          {uploadImages && (
            <>
              <div className="my-6">
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
                    </div>

                    {/* Accepted files */}
                    <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                      Accepted Files
                    </h3>
                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                      {uploadImages.map((file) => (
                        <li key={file.name}>
                          <div className="relative h-32 rounded-md shadow-lg">
                            <img
                              src={URL.createObjectURL(file)}
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
                          </div>
                          <div>
                            <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                              {file.name}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div>
                  <button
                    onClick={() => {
                      onUpload();
                    }}
                    className="button-base mt-4 bg-purple-600 text-slate-100 rounded-md"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  );
};
export default ImgUploader;
