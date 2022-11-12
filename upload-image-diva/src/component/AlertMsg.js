import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AlertMsg = () => {
  return (
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      autoClose= "1000"
      closeOnClick= {true}
    //   pauseOnHover
    />
  );
};

export default AlertMsg;