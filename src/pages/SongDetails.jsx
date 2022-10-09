import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { SongsContext } from "../context/SongsProvider";
import { DetailsHeader, RelatedSongs } from "../components";
import { Loader } from "../components";

const SongDetails = () => {
  const { songid } = useParams();
  const { state, dispatch } = useContext(SongsContext);
  const [song, setSong] = useState({});
  const [songData, setSongsData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (state.currentSongs.length > 0) {
      const some = state.currentSongs.filter((one) => one.key == songid)[0];
      setSong(some);
    }
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eecff1fbe0msh67d89e195487108p1beb7ejsn98eb68674b5d",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(
      `https://shazam-core.p.rapidapi.com/v1/tracks/details?track_id=${songid}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setSongsData(response);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [songid]);
  if (loading) {
    return <Loader title="Loading Song Details..." />;
  } else if (loading == false && songData != {} && song != {}) {
    return (
      <div className="flex flex-col px-10 mt-11">
        <div className="flex flex-row items-center mb-10">
          (
          <img
            className="h-[100px] w-[100px] rounded-lg object-contain"
            src={song?.images?.background}
            alt=""
          />
          )
          <div className="ml-2">
            <h1 className="text-white truncate font-bold text-2xl">
              {song?.title}
            </h1>
            <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
              <p className="text-gray-300 truncate">{song?.subtitle}</p>
            </Link>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="text-white text-2xl font-bold">Lyrics:</h2>
          <div className="mt-5">
            {songData?.sections[1].type === "LYRICS" ? (
              songData?.sections[1].text.map((line, i) => {
                return (
                  <p className="text-gray-400 text-base my-1" key={i}>
                    {line}
                  </p>
                );
              })
            ) : (
              <p className="text-gray-400 text-base ">
                Sorry , no lyrics found
              </p>
            )}
          </div>
        </div>
        {console.log(song)}
        <RelatedSongs artistID={song?.key} />
      </div>
    );
  }
};

export default SongDetails;
