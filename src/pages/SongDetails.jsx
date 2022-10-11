import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { SongsContext } from "../context/SongsProvider";
import { RelatedSongs } from "../components";
import { Loader } from "../components";
import PlayPause from "../components/PlayPause";

const SongDetails = () => {
  const { songid } = useParams();
  const { state } = useContext(SongsContext);
  const [songData, setSongsData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "def25a9515mshef63d93954f85c8p1ef419jsn69d6085cdc9a",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    setLoading(true);
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
  }
  return (
    <div className="flex flex-col px-10 mt-11">
      <div className="flex flex-row justify-start items-center mb-10">
        (
        <div className="flex flex-col justify-start items-start">
          <img
            className="mt-5 h-[100px] w-[100px] rounded-lg object-contain"
            src={songData?.images?.background}
          />
        </div>
        )
        <div className="ml-2">
          <h1 className="text-white truncate font-bold text-2xl">
            {songData?.title}
          </h1>
          <Link to={`/artists/${songData?.artists[0]?.adamid}`}>
            <p className="text-gray-300 truncate">{songData?.subtitle}</p>
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
            <p className="text-gray-400 text-base ">Sorry , no lyrics found</p>
          )}
        </div>
      </div>
      <RelatedSongs artistID={songData?.key} />
    </div>
  );
};

export default SongDetails;
