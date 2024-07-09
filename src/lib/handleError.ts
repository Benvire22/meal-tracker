import {toast} from 'react-toastify';

const handleError = (err: Error, message: string) => {
  console.error(err.message);
  toast.error(message);
};

export default handleError;