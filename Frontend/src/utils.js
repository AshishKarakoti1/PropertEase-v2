import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 5000, // Optional: Duration to show the toast
        hideProgressBar: false, // Optional: Show or hide the progress bar
        closeOnClick: true, // Optional: Close on click
        pauseOnHover: true, // Optional: Pause on hover
        draggable: true, // Optional: Allow dragging
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        position: "top-right",
        autoClose: 5000, // Optional: Duration to show the toast
        hideProgressBar: false, // Optional: Show or hide the progress bar
        closeOnClick: true, // Optional: Close on click
        pauseOnHover: true, // Optional: Pause on hover
        draggable: true, // Optional: Allow dragging
    });
};
