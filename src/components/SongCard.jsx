import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { SongsContext } from "../context/SongsProvider";
import { useContext } from "react";
const SongCard = ({ song, activeSong }) => {
  const { state } = useContext(SongsContext);


  return (
    <div className=" flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group ">
        <div
          className={`absolute inset-0  items-center justify-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong === song.title ? "flex bg-black bg-opacity-70" : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={state.isPlaying}
            activeSong={state.activeSong}
            song={song}
          />
        </div>
        <img src={song.images?.coverart} alt="song img" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semigold text-lg text-white truncate">
          <Link to={`songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : `/top-artists`
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
