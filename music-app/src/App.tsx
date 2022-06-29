import React, { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./globalStyles";
import { Header } from "./components/Header/Header";
import { Login } from "./Pages/Auth/Login";
import { Register } from "./Pages/Auth/Register";
import { Home } from "./Pages/Home";
import { ArtistPage } from "./Pages/Artist/Artist";
import { Genres } from "./Pages/Genres/Genres";
import { PlayLists } from "./Pages/PlayLists/PlayLists";
import { Profile } from "./Pages/Profile/Profile";
import { AppContext } from "./context/AppContext";
import axios from "axios";
import { MusicContext } from "./context/MusicContext";
import { Loader } from "./components/Loader/Loader";
import { TracksByGenre } from "./Pages/Traks/TracksByGenre/TracksByGenre";
import { Artists } from "./Pages/Artists/Artists";
import { Albums } from "./Pages/Albums/Albums";
import { Favorites } from "./Pages/Favorites/Favorites";
import { History } from "./Pages/History/History";
import { PlayerAudio } from "./components/PlayerAudio/PlayerAudio";
import { Album } from "./Pages/Album/Album";
import { Playlist } from "./Pages/Playlist/Playlist";
import { Search } from "./Pages/Search/Search";
import { ConnectionError } from "./Pages/ConnectionError/ConnectionError";

function App() {
  const { getUserInformation, token, loader, serverConnectionError } =
    useContext(AppContext);
  const { getGenres, getArtists, getPlaylists, getAlbums, getFavorites } =
    useContext(MusicContext);

  useEffect(() => {
    if (!token) return;

    getUserInformation();
  }, [token]);
  useEffect(() => {
    getGenres();
    getArtists();
    getPlaylists();
    getAlbums();
    getFavorites();
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      {/* {serverConnectionError && <ConnectionError/>} */}
      {true && (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={"/album/:id"} element={<Album />} />
            <Route path={"/playlist/:id"} element={<Playlist />} />
            <Route path={"/search"} element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path={"/history"} element={<History />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genre/:id" element={<TracksByGenre />} />
            <Route path="/playlists" element={<PlayLists />} />
            <Route path={"/albums"} element={<Albums />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <PlayerAudio />
        </>
      )}

      {/* <Loader /> */}
    </div>
  );
}

export default App;
