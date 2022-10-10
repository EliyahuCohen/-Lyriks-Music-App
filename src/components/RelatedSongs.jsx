import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import Loader from "./Loader";
import { Link, useNavigate } from "react-router-dom";
import { SongsContext } from "../context/SongsProvider";
import PlayPause from "./PlayPause";

const RelatedSongs = ({ artistID }) => {
  const navigate = useNavigate;

  const [data, setData] = useState([]);
  const { state } = useContext(SongsContext);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "def25a9515mshef63d93954f85c8p1ef419jsn69d6085cdc9a",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(
      `https://shazam-core.p.rapidapi.com/v1/tracks/related?track_id=${artistID}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
      })
      .catch((err) => console.error(err));
  }, [artistID]);
  if (!data) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="text-white font-bold text-3xl mb-5">Related Songs:</h1>
      {data?.length > 0 &&
        data.map((single, index) => {
          console.log(single);
          return (
            <div className=" flex flex-row items-center w-full hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2 topSongs">
              <h3 className="font-bold text-base text-white mr-3">
                {index + 1}.
              </h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  className="w-20 h-20 rounded-lg"
                  src={
                    single?.images?.background ||
                    "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
                  }
                  alt={single?.title}
                />
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <Link to={`/songs/${single?.key}`}>
                    <p className="text-xl font-bold text-white">
                      {single?.title}
                    </p>
                  </Link>
                  <Link to={`/artists/${artistID}`}>
                    <p className="text-ase text-gray-300 mt-1">
                      {single?.subtitle}
                    </p>
                  </Link>
                </div>
                <PlayPause activeSong={state?.activeSong} song={single} />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RelatedSongs;
