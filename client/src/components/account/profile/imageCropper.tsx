import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop';
import setCanvasPreview from '../../../utils/setCanvasPreview';
import { getSignatureForUpload } from '../../../utils/cloundinary';
import { useUploadFile } from '../../../hooks/querys/cloudinary';
import { toast } from 'react-toastify';
import { useUpdateMyImageMutation } from '../../../hooks/querys/member';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropper = ({ closeModal }) => {
  const dispatch = useDispatch();

  const { mutateAsync: updateMyImageMutation } = useUpdateMyImageMutation();
  const { mutateAsync: uploadFileMutate } = useUploadFile();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [error, setError] = useState('');
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || '';
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', (e) => {
        if (error) setError('');
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError('Image must be at least 150 x 150 pixels.');
          return setImgSrc('');
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleCropSubmit = async () => {
    try {
      setCanvasPreview(
        imgRef.current, // HTMLImageElement
        previewCanvasRef.current, // HTMLCanvasElement
        convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
      );
      const dataUrl = previewCanvasRef.current.toDataURL();
      const file = new File([dataUrl], 'file.extension', {
        type: dataUrl.type,
      });

      const { timestamp: imgTimestamp, signature: imgSignature } =
        await getSignatureForUpload();
      const payload = {
        timestamp: imgTimestamp,
        signature: imgSignature,
        uploadImage: file,
      };

      const resUrl: string = await uploadFileMutate(payload);

      if (resUrl) {
        toast('Image uploaded successfully');
        updateMyImageMutation(resUrl);
      } else {
        toast('Image uploaded failed');
      }
    } catch (error) {
      toast('An error occurred during image upload');
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <div className="block mb-3 w-fit">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-2xl file:border-0 file:text-xs file:bg-slate-200 file:text-sky-900 hover:file:bg-gray-300 hover:file:text-sky-800"
        />
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center ">
          <ReactCrop
            className="testcomponent"
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: '70vh' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <button
            className="button-base text-white font-bold text-xs py-2 px-4 rounded-lg mt-4 bg-green-500 hover:bg-green-400"
            onClick={() => {
              handleCropSubmit();
            }}
          >
            Crop & Upload Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};
export default ImageCropper;
