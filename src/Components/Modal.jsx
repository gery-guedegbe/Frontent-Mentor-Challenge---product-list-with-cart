import React from "react";

const Modal = ({ show, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center md:justify-center justify-evenly z-50">
      <div className=" bg-white w-full overflow-hidden rounded-tr-2xl rounded-tl-2xl md:rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 py-3 border-b border-gray-200 flex flex-col items-start justify-between gap-4">
          <img
            src="../assets/images/icon-order-confirmed.svg"
            alt="Order Confirmed Icon"
            className="w-8 h-8"
          />
          <h2 className="text-2xl md:text-xl text-Rose-900 font-bold">
            Order Confirmed
          </h2>
        </div>
        <div className="px-4 py-5 w-full flex flex-col items-start justify-between gap-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
