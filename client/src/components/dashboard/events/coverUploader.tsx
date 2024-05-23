import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/reducers/loadingSlice';
import { getSignatureForUpload, uploadFile } from '../../../utils/cloundinary';
import { toast } from 'react-toastify';

const CoverUploader = ({
  uploadImage,
  setUploadImage,
  previewImage,
  setPreviewImage,
  setImageUrl,
  closeModal,
}) => {
  const dispatch = useDispatch();

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const onUpload = async () => {
    dispatch(showLoading());
    const { timestamp: imgTimestamp, signature: imgSignature } =
      await getSignatureForUpload();

    const resUrl = await uploadFile(imgTimestamp, imgSignature, uploadImage);
    //setValue('imageUrl', resUrl);
    setImageUrl('coverImage', resUrl);
    if (resUrl) {
      toast('Image uploaded successfully');
      closeModal();
    }
    dispatch(hideLoading());
  };

  return (
    <>
      <div className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-700 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-200 file:text-sky-800 hover:file:bg-gray-300"
        />
      </div>
      <div>
        <section className="mt-10">
          {uploadImage && (
            <>
              <div className="">
                <h2 className="title text-3xl font-semibold">Preview</h2>
              </div>

              <div className="my-6">
                <div
                  key={uploadImage.name}
                  className=" h-72 rounded-md shadow-lg"
                >
                  <img
                    src={previewImage}
                    alt={uploadImage.name}
                    className="h-full  object-contain rounded-md"
                  />
                </div>
                <div>
                  <p className="mt-2 mb-4 text-neutral-500 text-[12px] font-medium">
                    {uploadImage.name}
                  </p>
                </div>

                <div>
                  <button
                    onClick={onUpload}
                    className="button-base bg-purple-600 text-slate-100 rounded-md"
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
export default CoverUploader;
