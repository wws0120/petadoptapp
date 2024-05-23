import axiosInstance from '../libs/axios/axiosUtils';
import axios from 'axios';

export const uploadFile = async (timestamp, signature, uploadImage) => {
  const data = new FormData();
  data.append('file', uploadImage);
  data.append('timestamp', timestamp);
  data.append('signature', signature);
  data.append('api_key', import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY);
  data.append('folder', 'petadoptapp');

  try {
    let cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_NAME;
    let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (error) {
    console.error(error);
  }
};
export const uploadFiles = async (timestamp, signature, uploadImages) => {
  const data = new FormData();
  let secure_urls = [];

  if (uploadImages && uploadImages.length > 0) {
    for (const uploadImage of uploadImages) {
      data.append('file', uploadImage);
      data.append('timestamp', timestamp);
      data.append('signature', signature);
      data.append('api_key', import.meta.env.VITE_REACT_APP_CLOUDINARY_API_KEY);
      data.append('folder', 'petadoptapp');

      try {
        let cloudName = import.meta.env.VITE_REACT_APP_CLOUDINARY_NAME;
        let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        secure_urls.push(res.data.secure_url);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return secure_urls;
};

export const getSignatureForUpload = async () => {
  try {
    const res = await axiosInstance.post(
      `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/cloudinary/signupload`,
      { folder: import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_FOLDER }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
