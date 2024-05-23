import { useState } from 'react';
import { Icon } from '@iconify/react';
import CoverUploader from './coverUploader';
import { getCloudinarySign } from '../../../services/cloudinaryServices';
import { useNavigate } from 'react-router-dom';

const CoverUploadModal = ({ closeModal, setValue }) => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [Loading, setLoading] = useState(false);

  return (
    <div>
      <div className="fixed inset-0 bg-gray-100 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-100 text-slate-800 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center bg-slate-100 text-gray-700 hover:bg-gray-200 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <Icon className="h-4 w-4" icon="tabler:x" />
              </button>
              <div>Select image for upload</div>
              <CoverUploader
                uploadImage={uploadImage}
                setUploadImage={setUploadImage}
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
                setImageUrl={setValue}
                closeModal={closeModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoverUploadModal;
