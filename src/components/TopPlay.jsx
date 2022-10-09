import { useContext } from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { SongsContext } from "../context/SongsProvider";
import PlayPause from "./PlayPause";

const TopChartCard = ({ song, index }) => {
  const { state, dispatch } = useContext(SongsContext);

  return (
    <div className=" flex flex-row items-center w-full hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2 topSongs">
      <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song.artists[0].adamid}`}>
            <p className="text-ase text-gray-300 mt-1">{song?.title}</p>
          </Link>
        </div>
        <PlayPause activeSong={state.activeSong} song={song} />
      </div>
    </div>
  );
};

const TopPlay = () => {
  const { state, dispatch } = useContext(SongsContext);
  const { activeSong, isPlaying, currentSongs } = state;
  const divRef = useRef(null);
  const topPlays = currentSongs?.slice(0, 5);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-8 flex-1 mt-10 xl:max-w-[500px] max-w-full flex flex-col "
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, index) => {
            return <TopChartCard key={song.key} song={song} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default TopPlay;
