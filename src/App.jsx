import { Route, Routes } from "react-router-dom";
import { SongsContext } from "./context/SongsProvider";
import { Sidebar, TopPlay, SongBar } from "./components";
import { ArtistDetails, Discover, SongDetails } from "./pages";
import { useContext } from "react";
import Search from "./components/Search";
import SearchPage from "./pages/SearchPage";
const App = () => {
  const { state, dispatch } = useContext(SongsContext);

  return (
    <div className="absolute right-0 flex top-0 left-0 bottom-0">
      <Sidebar className="z-50" />
      <div className="flex-1 flex min-w-[500px] flex-col bg-gradient-to-br from-black to-[#121286]">
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Search />
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchId" element={<SearchPage />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {state.activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <SongBar song={state.activeSong} />
        </div>
      )}
    </div>
  );
};

export default App;
