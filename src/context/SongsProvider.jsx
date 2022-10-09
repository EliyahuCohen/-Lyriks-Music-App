import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";

//const fs = require("fs");

export const SongsContext = createContext();

export const getInfo = async (word) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "27a7cd28demsh5088e9fb916981dp140de0jsn1f37c98485a7",
      "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
    },
  };
  let json = [];
  const data = await fetch(
    `https://shazam-core.p.rapidapi.com/v1/charts/genre-world?genre_code=${word}`,
    options
  );
  const response = await data.json();
  json = response;

  if (!data.ok) {
    //added backend deployed on heroku
    const info = await fetch(
      `https://shrouded-stream-06343.herokuapp.com/songs/${word}`
    );
    const js = await info.json();
    return js.songs;
  }

  return json;
};

const SongsReducer = (state, action) => {
  switch (action.type) {
    case "GET_SONGS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        currentSongs: action.payload,
      };
    case "PLAY_SONG":
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
        activeSong: action.payload.activeSong,
      };
    case "SET_ACTIVE_SONG":
      return {
        ...state,
        activeSong: action.payload.activeSong,
      };
    case "CHANGE_GENRE":
      return {
        ...state,
        genere: action.payload.gen,
      };
    default:
      return state;
  }
};

export const GlobalSongsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SongsReducer, {
    currentSongs: [],
    currentIndex: 0,
    isActive: false,
    isPlaying: false,
    activeSong: {},
    genreListId: "",
    isLoading: true,
    isError: false,
    genere: "POP",
  });
  useEffect(() => {
    const gettingInfo = async () => {
      const info = await getInfo(state.genere);
      dispatch({
        type: "GET_SONGS",
        payload: info,
      });
    };
    gettingInfo();
  }, [state.genere]);

  return (
    <SongsContext.Provider value={{ state, dispatch }}>
      {children}
    </SongsContext.Provider>
  );
};
