import { ethers } from "ethers";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  addGiftUrl,
  addTransaction,
  addTransactions,
  connectUserWallet,
  transactionEnd,
  transactionStart,
} from "../redux/transactionsSlice";

import { contractABI, contractAddress } from "../utils/constants";
import { notification } from "../utils/NotificationToast";

const { ethereum } = window;

export const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log(provider, signer, transactionContract);
  return transactionContract;
};
export const getUserTransactions = async (dispatch) => {
  try {
    if (!ethereum)
      return notification({
        type: "error",
        text: "Please install Metamask extension",
      });
    const transactionContract = getEthereumContract();

    const avaibleTransactions = await transactionContract.getAllTransactions();
    const structuredTransactions = avaibleTransactions.map((item) => ({
      addressTo: item.sender,
      addressFrom: item.sender,
      timestamp: new Date(item.timestamps.toNumber() * 1000).toLocaleString(),
      message: item.message,
      keyword: item.keyword,
      amount: parseInt(item.amount._hex) / 10 ** 18,
    }));
    dispatch(addTransactions(structuredTransactions));
  } catch (err) {
    console.log(err);
    notification({ type: "error", text: err.message });
  }
};

export const checkIfWalletIsConnected = async () => {
  if (!ethereum)
    return notification({
      type: "error",
      text: "Please install Metamask extension",
    });
  const accounts = await ethereum.request({ method: "eth_accounts" });
};

export const connectWallet = async (dispatch) => {
  dispatch(transactionStart());
  try {
    if (!ethereum)
      return notification({
        type: "error",
        text: "Please install Metamask extension",
      });
    const account = await ethereum.request({
      method: "eth_requestAccounts",
    });
    if (account[0].length) {
      notification({ type: "success", text: "Connect to wallet success" });
      getUserTransactions(dispatch);

      dispatch(connectUserWallet(account[0]));
    } else {
      notification({ type: "error", text: "No Accounts Founded" });
      dispatch(transactionEnd("No Accounts Founded"));
    }
  } catch (err) {
    console.log(err);
    notification({ type: "error", text: "Something went wrong" });
    dispatch(transactionEnd(err.message));
  }
};

export const sendTransaction = async (
  dispatch,
  { masterData, currentAccount }
) => {
  const { addressTo, amount, keyword, message } = masterData;
  const parsedAmount = ethers.utils.parseEther(amount);
  try {
    if (!ethereum)
      return notification({
        type: "error",
        text: "Please install Metamask extension",
      });

    const transactionContract = getEthereumContract();
    console.log("Transaction Contract->", transactionContract);
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: currentAccount,
          to: addressTo,
          gas: "0x5208",
          value: parsedAmount._hex,
        },
      ],
    });

    const transactionHash = await transactionContract.addToBlockChain(
      addressTo,
      parsedAmount,
      message,
      keyword
    );
    dispatch(transactionStart());
    await transactionHash.wait();
    dispatch(transactionEnd());

    const transactionCount = await transactionContract.getTransactionsCount();

    dispatch(addTransaction(transactionCount.toNumber()));
    notification({
      type: "success",
      text: "Sending Eth to receiver is Success",
    });
  } catch (err) {
    console.log(err);

    notification({ type: "error", text: "Something went wrong" });
  }
};

export const checkIfTransactionsExist = async () => {
  try {
    const transactionContract = getEthereumContract();
    const transactionCount = await transactionContract.getTransactionsCount();
    localStorage.setItem("transactionCount", JSON.stringify(transactionCount));
  } catch (err) {
    console.log(err);
    notification({ type: "error", text: "Something went wrong" });
  }
};

export const fetchGifs = async (dispatch, { API_KEY, keyword }) => {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
        .split(" ")
        .join("")}&limit=1`
    );
    dispatch(addGiftUrl(response.data.data[0]?.images?.downsized_medium?.url));
  } catch (err) {
    console.log(err);

    dispatch(
      addGiftUrl(
        "https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif"
      )
    );
  }
};
