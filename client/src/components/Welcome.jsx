import React, { useCallback, useState } from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import { connectWallet, sendTransaction } from "../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { fillFormData, resetForm } from "../redux/transactionsSlice";
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const TextInput = ({ placeholder, value, name, type, handleChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    step="0.0001"
    value={value}
    required
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-sm white-glassmorphism "
  />
);

const Welcome = () => {
  const handleChange = (e, name) => {};
  const { currentAccount, masterData,isFetching } = useSelector(
    (state) => state.transaction
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    sendTransaction(dispatch, { masterData, currentAccount });
    dispatch(resetForm());
  };
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fillForm = useCallback(
    (key, value) => {
      dispatch(fillFormData({ [key]: value }));
    },
    [dispatch]
  );

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }
  return (
    <div className="flex w-full justify-center  items-center ">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 ">
        <div className="flex flex-1 justify-start flex-col mf:mr-10  ">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 ">
            Send Crypto <br /> across the World{" "}
          </h1>
          <p className="text-left mt-5 text-white font-light md:w9/12 w-11/12 text-base  ">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={() => connectWallet(dispatch)}
              className="flex flex-row justify-center items-center my-5 bg-[#0c083b] p-3 rounded-xl cursor-pointer hover:bg-[#050b22] text-white font-semibold transition hover:scale-95 "
            >
              Connect Wallet
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10  ">
            <div className={`rounded-tl-2xl  ${commonStyles} `}>
              Reliability
            </div>
            <div className={`${commonStyles}  `}>Security</div>
            <div className={`sm:rounded-tr-2xl  ${commonStyles} `}>
              Etherium
            </div>
            <div className={`sm:rounded-bl-2xl  ${commonStyles} `}>Web 3.0</div>
            <div className={`${commonStyles}  `}>Low fees</div>
            <div className={`rounded-br-2xl  ${commonStyles} `}>
              Block Chain
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-start w-full mf:mt-0 mt-10  ">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism  ">
            <div
              className="flex justify-between  flex-col w-full h-full
             "
            >
              <div className="flex justify-between items-start ">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div className="">
                <p
                  className="text-white text-sm font-light
                 "
                >
                  {currentAccount
                    ? shortenAddress(currentAccount)
                    : "Wallet not connected"}
                </p>
                <p
                  className="text-white text-lg mt-1 font-semibold 
                 "
                >
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism "
          >
            <TextInput
              placeholder="Address To"
              name="addressTo"
              type="text"
              value={masterData.addressTo || ""}
              handleChange={(e) => fillForm("addressTo", e.target.value)}
            />
            <TextInput
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              value={masterData.amount || ""}
              handleChange={(e) => fillForm("amount", e.target.value)}
            />
            <TextInput
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              value={masterData.keyword || ""}
              handleChange={(e) => fillForm("keyword", e.target.value)}
            />
            <TextInput
              placeholder="Enter Message"
              name="message"
              type="text"
              value={masterData.message || ""}
              handleChange={(e) => fillForm("message", e.target.value)}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2 " />
            {isFetching ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer "
              >
                Send Now
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
