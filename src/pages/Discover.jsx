import { Error, Loader, SongCard } from "../components/index";
import { genres } from "../assets/constants";
import { useContext } from "react";
import { SongsContext } from "../context/SongsProvider";
import { useState } from "react";

const Discover = () => {
  const { state, dispatch } = useContext(SongsContext);
  const [genereTitle, setGenreTitle] = useState("POP");
  if (state.isLoading) {
    return <Loader title="Loading Songs" />;
  }
  if (state.isError) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      <div className="w-full m-auto flex justify-between max-w-[800px] items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genereTitle}
        </h2>
        <select
          onChange={(e) => {
            dispatch({
              type: "CHANGE_GENRE",
              payload: {
                gen: e.target.value,
              },
            });
            setGenreTitle(e.target.value);
          }}
          value={genereTitle}
          className=" bg-black rounded-lg cursor-pointer text-gray-300 p-3 text-sm roundend-lg outline-none sm:mt-0 mt-5 "
        >
          {genres.map((g, index) => {
            return (
              <option value={g.value} key={index}>
                {g.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-center justify-center gap-8">
        {state.currentSongs &&
          state?.currentSongs.map((song, i) => {
            return (
              <SongCard
                key={song.key}
                song={song}
                isPlaying={song.isPlaying}
                activeSong={song.activeSong}
                i={i}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Discover;
