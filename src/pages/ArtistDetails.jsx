import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { SongsContext } from "../context/SongsProvider";
function ArtistDetails() {
  const { id } = useParams();
  const [artistsSongs, setArtistSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(SongsContext);

  const { currentSongs } = state;
  useEffect(() => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eecff1fbe0msh67d89e195487108p1beb7ejsn98eb68674b5d",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    fetch(
      `https://shazam-core.p.rapidapi.com/v1/artists/details?artist_id=${id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setArtistSongs(Object.values(response.songs));
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);
  let sort = currentSongs.filter((one) => one.artists[0].adamid == id)[0];
  if (loading) {
    return <Loader title="Searching for Albums..." />;
  }

  return (
    <div className="text-white">
      <h1 className="text-white font-bold text-2xl p-2 ml-5">
        {`${artistsSongs[0]?.attributes?.artistName} Albums`}
      </h1>
      <div className="flex flex-row sm:justify-start justify-center p-5 text-center">
        <div className="flex flex-col justify-start">
          <img
            src={sort?.images?.background}
            alt={sort?.subtitle}
            className="h-[200px] w-[200px] rounded-full "
          />
          <p className="mt-5 text-gray-300 cursor-pointer">{state.genere}</p>
        </div>
      </div>
      {artistsSongs &&
        artistsSongs.map((one, index) => {
          return (
            <div
              className="flex flex-row justify-start bg-black w-full mt-5 items-center p-5 rounded-lg"
              key={one.id}
            >
              <p className="font-bold">{index}.</p>
              <div className="ml-5">
                <h2 className=" text-white font-bold ">
                  {one?.attributes?.name}
                </h2>
                <p className="text-gray-300 font-bold text-1xl">
                  {one?.attributes?.artistName}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ArtistDetails;
