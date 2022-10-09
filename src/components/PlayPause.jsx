import { useContext } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { SongsContext } from "../context/SongsProvider";

const PlayPause = ({ activeSong, song }) => {
  const { dispatch, state } = useContext(SongsContext);
  const handlePauseClick = () => {
    dispatch({
      type: "PLAY_SONG",
      payload: {
        activeSong: song,
        isPlaying: !state.isPlaying,
      },
    });
    window.scrollTo(0, 0);
  };
  const handlePlayClick = () => {
    dispatch({
      type: "PLAY_SONG",
      payload: {
        activeSong: song,
        isPlaying: !state.isPlaying,
      },
    });
    console.log(state.isPlaying);
  };
  return (
    <div className="flex justify-center items-center">
      {state.isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle
          size={35}
          className="text-gray-300"
          onClick={() => handlePauseClick()}
        />
      ) : (
        <FaPlayCircle
          size={35}
          className="text-gray-300"
          onClick={() => handlePlayClick()}
        />
      )}
    </div>
  );
};

export default PlayPause;
