import ImageCropper from './imageCropper';
import { Icon } from '@iconify/react';

const AvatarUploadModal = ({ closeModal }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="crop-image-dialog"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-100 text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-gray-500 hover:bg-slate-200 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                <Icon className="h-4 w-4" icon="tabler:x" />
              </button>
              <ImageCropper closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvatarUploadModal;
