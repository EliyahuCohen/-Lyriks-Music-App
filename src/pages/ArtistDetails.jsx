import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
function ArtistDetails() {
  const { id } = useParams();
  const [artistsSongs, setArtistSongs] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "eecff1fbe0msh67d89e195487108p1beb7ejsn98eb68674b5d",
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    };
    let temp = [];
    fetch(
      `https://shazam-core.p.rapidapi.com/v1/artists/details?artist_id=${id}`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        temp = response.songs[0];
        setArtistSongs(Object.values(response.songs));
      })
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <div className="text-white">
      <h1 className="text-white font-bold text-2xl">
        {`${artistsSongs[0]?.attributes?.artistName} Albums`}
      </h1>
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
