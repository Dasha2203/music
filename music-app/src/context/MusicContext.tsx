import React, {FC, useContext, useEffect, useState} from "react";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";
import {AppContext} from "./AppContext";
import {TArtist} from "../types/artist";
import {Genre} from "../types/genre";
import {TPlaylist} from "../types/playlist";
import {TAlbums} from "../types/albums";

type TTracks = {
    artistId: number,
    artistName: string,
    id: number,
    lang_id: number,
    name: string,
    path: string,
    srcImg: string,
    text: string,
    textTrack_id: number
}

type Context = {
    genres: Genre[],
    getGenres: () => void,
    getArtists: () => void,
    setGenres: (val: Genre[]) => void,
    playMusic: any,
    setPlayMusic: (val: any) => void,
    artists: TArtist[],
    setArtists: (val: TArtist[]) => void,
    getPlaylists: () => void,
    playlists: TPlaylist[],
    setPlaylists: (val: TPlaylist[]) => void,
    getAlbums: () => void,
    albums: TAlbums[],
    setAlbums: (val: TAlbums[]) => void,
    likeMusic: (id: number) => void,
    getFavorites: () => void,
    favorites: TTracks[],
    setFavorites: (val: TTracks[]) => void,
    playMusicList: any[],
    setPlayMusicList: (val: []) => void,

}

export const MusicContext = React.createContext<Context>({
    genres: [],
    getGenres: () => undefined,
    setGenres:(val: Genre[]) => undefined,
    playlists: [],
    setPlaylists: (val: TPlaylist[]) => undefined,
    playMusic: null,
    setPlayMusic: (val: any) => undefined,
    artists: [],
    setArtists: (val: TArtist[]) => undefined,
    getArtists: () => undefined,
    getPlaylists: () => undefined,
    getAlbums: () => undefined,
    albums: [],
    setAlbums: (val: TAlbums[]) => undefined,
    likeMusic: (id: number) => undefined,
    getFavorites: () => undefined,
    favorites: [],
    setFavorites: (val: TTracks[]) => undefined,
    playMusicList: [],
    setPlayMusicList: (val: []) => undefined

})

export const MusicProvider= ({ children }: {children: React.ReactNode}) => {
    const {token} = useContext(AppContext);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [artists, setArtists] = useState<TArtist[]>([]);
    const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
    const [tracks, setTracks] = useState();
    const [albums, setAlbums] = useState<TAlbums[]>([]);
    const [favorites, setFavorites] = useState<TTracks[]>([]);


    const [playMusic, setPlayMusic] = useState<any>();
    const [playMusicList, setPlayMusicList] = useState<any[]>([])

    useEffect(()=>{

        if(typeof playMusic === 'number' && playMusicList.length) {
            addTrackToHistory(playMusicList[playMusic].id)
        }

    },[playMusic, playMusicList])

    const getGenres = async () => {
        try {
            let resGenres = await axios.get('/music/genres', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (resGenres.data) {
                setGenres(resGenres.data.genres);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addTrackToHistory = async (id: number) => {
        try {
            let resHistory = await axios.post('/auth/addHistory', {id},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            console.log('History added')

        } catch (err) {
            console.log(err);
        }
    }

    const removeFavorite = async (id: number) => {
        try {
            let res = await axios.post('/auth/removeFavorite',{id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                console.log('добавили')
                getFavorites()
            }
        } catch(err) {
            console.log('like music', err)
        }

    }

    const likeMusic = async (id: number) => {
        console.log('like')

        let find = favorites.find(item => item.id === id)
        if (find) {
            removeFavorite(id)
            return
        }
        try {
            let res = await axios.post('/auth/addFavorite',{id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                console.log('добавили')
                getFavorites()
            }
        } catch(err) {
            console.log('like music', err)
        }

    }

    const getAlbums = async () => {

        try {
            let resAlbums = await axios.get('/music/albums', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (resAlbums.data) {
                console.log('albums context', resAlbums.data)
                setAlbums(resAlbums.data.albums);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getArtists = async () => {

        try {
            let resArtists = await axios.get('/music/artists', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (resArtists.data) {
                setArtists(resArtists.data.artists);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getFavorites = async () => {
        if (!token) return;
        try {
            let resFavorites = await axios.get('/auth/favorites', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (resFavorites.data) {
                // console.log('favorites from server', resFavorites.data);
                setFavorites(resFavorites.data.tracks)
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getPlaylists = async () => {

        try {
            let resPlaylists = await axios.get('/playlists', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (resPlaylists.data) {
                // console.log('playlist from server', resPlaylists.data)
                setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <MusicContext.Provider
            value={{
                genres,
                setGenres,
                getGenres,
                playMusic,
                setPlayMusic,
                artists,
                setArtists,
                getArtists,
                getPlaylists,
                playlists,
                setPlaylists,
                getAlbums,
                albums,
                setAlbums,
                likeMusic,
                getFavorites,
                setFavorites,
                favorites,
                setPlayMusicList,
                playMusicList
            }}
        >
            {children}
        </MusicContext.Provider>
    );
}