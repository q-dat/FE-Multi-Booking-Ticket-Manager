import { toast, ToastOptions } from 'react-toastify';

export const Toastify = (
  message: string | Record<string, string>,
  statusCode: number
) => {
  const toastOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  };

  const showToast = (message: string) => {
    if (statusCode >= 200 && statusCode < 300) {
      toast.success(message, toastOptions);
    } else if (statusCode >= 300 && statusCode < 400) {
      toast.warning(message, toastOptions);
    } else if (statusCode >= 400) {
      toast.error(message, toastOptions);
    } else {
      toast.info(message, toastOptions);
    }
  };

  if (typeof message === 'string') {
    showToast(message);
  } else {
    Object.values(message).forEach(showToast);
  }
};
