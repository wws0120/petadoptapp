import { useMutation, useQuery } from '@tanstack/react-query';
import { uploadFile, uploadFiles } from '../../utils/cloundinary';

export function useUploadFile() {
  return useMutation({
    mutationFn: async (payload: any) =>
      uploadFile(payload.timestamp, payload.signature, payload.uploadImage),
    onSuccess: (data) => {},
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useUploadFiles() {
  return useMutation({
    mutationFn: async (payload: any) =>
      uploadFiles(payload.timestamp, payload.signature, payload.uploadImages),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
