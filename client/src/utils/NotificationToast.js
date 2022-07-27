import { toast, Slide } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  transition: Slide,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const notification = ({ type, text, delay = 2000 }) => {
  if (type === "success") {
    toast.success(text, toastOptions);
  }
  if (type === "error") {
    toast.error(text, toastOptions);
  }
  if (type === "warning") {
    toast.warning(text, toastOptions);
  }
  if (type === "info") {
    toast.info(text, toastOptions);
  }
};
