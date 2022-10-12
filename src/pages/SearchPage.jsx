import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, SongCard } from "../components";
import { SongsContext } from "../context/SongsProvider";
const SearchPage = () => {
  const [songsPerSearch, setSongsPerSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchId } = useParams();

  const searchForSong = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "16fce8fabdmsh82fc5d10bfa6592p1ffb4fjsnfb3b40a2b97b",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    const data = await fetch(
      `https://shazam-core.p.rapidapi.com/v1/search/multi?query=${searchId}&search_type=SONGS_ARTISTS`,
      options
    );
    const response = await data.json();
    setSongsPerSearch(response);
    setLoading(false);
  };

  useEffect(() => {
    searchForSong();
    scrollTo(0, 0);
  }, [searchId]);
  if (songsPerSearch.length == 0 && loading) {
    return <Loader title="Searching for your favorite song..." />;
  }
  const { state } = useContext(SongsContext);
  return (
    <div className="w-full flex-1 flex-col">
      <h1 className="text-white font-bold text-2xl ml-7 mb-10">
        {searchId} Songs:
      </h1>
      <div className="flex flex-row justify-center w-full flex-wrap gap-7">
        {songsPerSearch?.tracks?.hits?.map((song) => {
          return (
            <SongCard
              song={song.track}
              activeSong={state.activeSong}
              key={song?.track?.key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
