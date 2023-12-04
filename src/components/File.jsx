import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

const FileUploader = () => {
 
  const token = localStorage.getItem('token')
  
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0]; // Assuming only one file is dropped

      if (!file) {
        throw new Error('No file selected');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://www.globalpayng.com/new-admin/v1/users',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },


          // Additional headers if needed
        }
      );
      console.log('POST API Response:', response);
      // Check the response and handle success
      if (response.status === 200) {
        // Show a success toast with a custom duration (e.g., 3000 milliseconds)
        toast.success('Upload successful!', {
          position: 'bottom-center',
          duration: 5000, // Set the duration in milliseconds
        });
      } else {
        throw new Error('Upload failed');
      }

    } catch (error) {
      console.error('Error uploading file:', error);
      // Show an error toast with a custom duration (e.g., 5000 milliseconds)
      toast.error('Error uploading file', {
        position: 'bottom-center',
        duration: 5000, // Set the duration in milliseconds
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.xlsx, .xls', // Specify the allowed file types (Excel files in this case)
  });

  return (
    <div className="p-4">
      <div
        {...getRootProps()}
        className="border-dashed border-2 h-[150px] border-gray-300 p-4 rounded-md lg:h-[200px] text-center"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 my-auto relative mt-[30px] lg:mt-[50px] mx-auto">
          Drag and drop your Excel file
        </p>
      </div>



      {/* Use Toaster component to render the toasts */}
      <Toaster position="top-right" />
    </div>
  );
};

export default FileUploader;
