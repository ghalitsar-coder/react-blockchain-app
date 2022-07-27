import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifs } from "../../api/apiCalls";

export const useFetch = (keyword) => {
  const API_KEY = import.meta.env.VITE_GIPHY;
  const { gifUrl } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();
  useEffect(() => {
    if (keyword) fetchGifs(dispatch, { API_KEY, keyword });
  }, [keyword]);
  return gifUrl;
};
