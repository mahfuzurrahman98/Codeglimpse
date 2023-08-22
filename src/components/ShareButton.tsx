import toast, { Toaster } from 'react-hot-toast';
import ShareIcon from '../assets/share.svg';

const ShareButton = ({ uid }: { uid: string }) => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
        }}
      />

      <button
        className="rounded-md py-1 bg-white flex gap-x-1 items-center px-1"
        onClick={() => {
          navigator.clipboard.writeText(
            'https://snippeter.vercel.app/p/' + uid
          );
          toast.success('Share link copied to clipboard!');
        }}
      >
        <img src={ShareIcon} alt="copy" width={20} className="text-white" />
      </button>
    </>
  );
};

export default ShareButton;
