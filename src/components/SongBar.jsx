import { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import { FaPlay, FaPauseCircle } from "react-icons/fa";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { SongsContext } from "../context/SongsProvider";
function SongBar({ song }) {
  const { state, dispatch } = useContext(SongsContext);

  const [audio, setAudio] = useState("");
  const { currentSongs } = state;
  const [songVolume, setSongVolume] = useState(1);
  const audioRef = useRef();

  useEffect(() => {
    if (state.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [state.isPlaying]);
  const pausePlaySong = () => {
    dispatch({
      type: "PLAY_SONG",
      payload: {
        activeSong: song,
        isPlaying: !state.isPlaying,
      },
    });
    setAudio(state.activeSong.url);

    if (state.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  const goNextSong = () => {
    if (currentSongs.indexOf(song) == currentSongs.length - 1) {
      dispatch({
        type: "SET_ACTIVE_SONG",
        payload: {
          activeSong: currentSongs[0],
        },
      });
    } else {
      dispatch({
        type: "SET_ACTIVE_SONG",
        payload: {
          activeSong: currentSongs[currentSongs.indexOf(song) + 1],
        },
      });
    }
  };
  const goPrevSong = () => {
    if (currentSongs.indexOf(song) > 0) {
      dispatch({
        type: "SET_ACTIVE_SONG",
        payload: {
          activeSong: currentSongs[currentSongs.indexOf(song) - 1],
        },
      });
    }
  };

  return (
    <div className="relative p-6 w-full flex justify-between items-center">
      <div className="flex items-center justify-center">
        <img
          className="rounded-full object-contain h-14 w-14"
          src={song?.images?.coverart}
          alt={song?.title}
        />
        <div className="flex flex-col  ml-5">
          <h4 className="cursor-pointer text-white mb-1 font-bold">
            {song?.title}
          </h4>
          <p className="cursor-pointer text-gray-400">{song?.subtitle}</p>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <TbPlayerTrackPrev
          size={20}
          className="text-white mr-5 cursor-pointer"
          onClick={() => goPrevSong()}
        />
        {state.isPlaying ? (
          <FaPauseCircle
            className="text-white cursor-pointer h-7 w-7"
            onClick={() => pausePlaySong()}
          />
        ) : (
          <FaPlay
            className="text-white cursor-pointer h-6 w-6"
            onClick={() => pausePlaySong()}
          />
        )}
        <TbPlayerTrackNext
          size={20}
          className="text-white ml-5 cursor-pointer"
          onClick={() => goNextSong()}
        />
      </div>
      <div className="text-white hidden sm:flex">
        <input
          //the styles for this will be in the global styleing of the application
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={songVolume}
          onChange={(e) => {
            setSongVolume(e.target.value);
            audioRef.current.volume = e.target.value;
          }}
        />
      </div>
      {/* maybe this thing is going to be transfore to a diffrent component */}
      {state.activeSong ? (
        <>
          <audio
            className="hidden"
            controls
            loop
            autoPlay
            src={state.activeSong?.hub?.actions[1]?.uri}
            ref={audioRef}
          ></audio>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default SongBar;
