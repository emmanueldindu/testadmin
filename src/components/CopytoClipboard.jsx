import React, { useState } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';
import clipboardCopy from 'clipboard-copy';
import { toast } from 'react-toastify';


const CopyToClipboard = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await clipboardCopy(textToCopy);
      setIsCopied(true);
      toast.success('Copied to clipboard!', {
        position: 'top-right',
        autoClose: 1500, // Close the toast after 1.5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      // Optionally, you can reset the "isCopied" state after a delay
      setTimeout(() => setIsCopied(false), 1500);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className='text-xl lg:text-xl '>
      <button className='text-xl' onClick={handleCopyToClipboard}>
        {isCopied ? 'copied!' : ''}
        <RiFileCopyLine />
      </button>
    </div>
  );
};

export default CopyToClipboard;
