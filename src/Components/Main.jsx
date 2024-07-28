import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faClose,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import articles from "../data.json";
import Modal from "./Modal";

const Main = () => {
  const [articleStates, setArticleStates] = useState(
    articles.map(() => ({ amount: 1, isSelected: false }))
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMinus = (index) => {
    setArticleStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index && state.amount > 1
          ? { ...state, amount: state.amount - 1 }
          : state
      )
    );
  };

  const handlePlus = (index) => {
    setArticleStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, amount: state.amount + 1 } : state
      )
    );
  };

  const handleSelect = (index) => {
    setArticleStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, isSelected: !state.isSelected } : state
      )
    );
  };

  const handleRemove = (index) => {
    setArticleStates((prevStates) =>
      prevStates.map((state, i) =>
        i === index ? { ...state, amount: 1, isSelected: false } : state
      )
    );
  };

  const totalOrderPrice = articleStates.reduce(
    (acc, state, i) => acc + state.amount * articles[i].price,
    0
  );

  const handleConfirmOrder = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-16 w-full h-full grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="w-full md:col-span-2 flex flex-col gap-6 text-left">
        <h1 className="text-3xl md:text-4xl text-black font-bold">Desserts</h1>
        <div translate="no" className="grid md:grid-cols-3 gap-10">
          {articles.map((article, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-center gap-0"
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img
                  src={isDesktop ? article.image.desktop : article.image.mobile}
                  alt={article.name}
                  className={`w-full h-auto bg-cover bg-center bg-no-repeat rounded-lg ${
                    articleStates[index].isSelected
                      ? "border-4 border-red-500"
                      : ""
                  }`}
                />
                {articleStates[index].isSelected ? (
                  <div className="absolute top-[58%] md:top-[60%] w-44 h-10 md:w-32 md:h-4 px-2 py-6 md:py-4 flex items-center justify-between bg-red-500 rounded-full">
                    <span
                      onClick={() => handleMinus(index)}
                      className="w-2 h-2 p-2 flex items-center justify-center border-2 border-white text-white text-base rounded-full cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </span>
                    <span
                      translate="no"
                      className="text-white text-base md:text-lg font-medium mx-2"
                    >
                      {articleStates[index].amount}
                    </span>
                    <span
                      onClick={() => handlePlus(index)}
                      className="w-2 h-2 p-2 flex items-center justify-center border-2 border-white text-white text-base rounded-full cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                  </div>
                ) : (
                  <div
                    translate="no"
                    onClick={() => handleSelect(index)}
                    className="absolute left-100 right-100 top-[58%] md:top-[60%] w-44 h-10 md:w-32 md:h-4 px-2 py-6 md:py-4 flex items-center justify-center gap-2 border border-black text-lg md:text-sm text-black font-semibold bg-white rounded-full cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      className="text-lg md-text-sm text-red-500"
                    />
                    Add to Cart
                  </div>
                )}
              </div>
              <span className="mt-10 text-base md:text-sm font-medium text-gray-600">
                {article.category}
              </span>
              <p className="text-lg md:text-lg text-gray-900 font-bold">
                {article.name}
              </p>
              <span
                translate="no"
                className="text-lg font-semibold text-red-600"
              >
                {`${"$"}${article.price}`}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 w-full h-max flex flex-col items-start gap-6 bg-white rounded-lg">
        <h1 className="text-2xl text-red-500 font-bold">Your Cart</h1>
        {articleStates.filter((state) => state.isSelected).length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center mx-auto gap-6">
            <img
              src="./assets/images/illustration-empty-cart.svg"
              alt="Empty Cart Icon"
              className="w-1/2 h-auto "
            />
            <p className="text-base text-Rose-400 font-semibold ">
              Your added items will appear here
            </p>
          </div>
        ) : (
          articleStates
            .filter((state) => state.isSelected)
            .map((state, i) => (
              <div
                key={i}
                className="w-full flex items-center justify-between border-b border-b-rose-300 pb-3"
              >
                <div className="flex flex-col items-start justify-between">
                  <h3 className="text-black text-lg font-semibold">
                    {articles[i].name}
                  </h3>
                  <div className="flex items-center justify-start gap-4">
                    <span className="text-sm text-red-500 font-medium">
                      {state.amount}
                    </span>
                    <span className="text-sm text-Rose-300 font-medium">
                      @ ${articles[i].price}
                    </span>
                    <span className="text-sm text-Rose-900 font-semibold">
                      ${state.amount * articles[i].price}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleRemove(i)}>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="w-2 h-2 p-1 border border-black rounded-full cursor-pointer"
                  />
                </button>
              </div>
            ))
        )}
        {articleStates.filter((state) => state.isSelected).length > 0 ? (
          <div className="w-full flex items-center justify-between">
            <p className="text-rose-500 text-lg font-semibold">Order Total</p>
            <span className="text-black text-xl font-bold">
              ${totalOrderPrice}
            </span>
          </div>
        ) : (
          ""
        )}
        <button
          onClick={handleConfirmOrder}
          className={
            articleStates.filter((state) => state.isSelected).length
              ? "w-full h-16 md:h-14 p-4 flex items-center justify-center bg-red-500 text-lg md:text-base text-white font-bold rounded-full"
              : "hidden"
          }
        >
          Confirm Order
        </button>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        {/* Contenu de la popup */}
        <p className="text-sm text-Rose-500 font-normal">
          We hope you enjoy your food!
        </p>
        <div className="w-full p-2 rounded-lg bg-Rose-50">
          {articleStates
            .filter((state) => state.isSelected)
            .map((state, i) => (
              <div
                key={i}
                className="w-full flex items-center justify-between border-b border-b-rose-300 pb-3"
              >
                <div className="flex flex-col items-start justify-between">
                  <h3 className="text-black text-lg font-semibold">
                    {articles[i].name}
                  </h3>
                  <div className="flex items-center justify-start gap-4">
                    <span className="text-sm text-red-500 font-medium">
                      {state.amount}
                    </span>
                    <span className="text-sm text-Rose-300 font-medium">
                      @ ${articles[i].price}
                    </span>
                    <span className="text-sm text-Rose-900 font-semibold">
                      ${state.amount * articles[i].price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={handleCloseModal}
          className="mt-4 w-full  py-3 bg-red-500 text-base font-bold text-white rounded-full"
        >
          Start New Oder
        </button>
      </Modal>
    </div>
  );
};

export default Main;
