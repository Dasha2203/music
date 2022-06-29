import React, {useContext, useEffect, useState} from "react";
import {Page, SectionTitle} from "../../components/UI";
import {PagePlaylist} from "./Style";
import {Container} from "../../components/Container";
import {ListTracks} from "../../components/ListTracks/ListTracks";
import {AppContext} from "../../context/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {MusicContext} from "../../context/MusicContext";
import {ArtistBtns} from "../Artist/S.el";
import {Button} from "../../components/Button";
import {ModalApp} from "../../components/Modals/ModalApp";
import {Buttons, ModalTitleApp} from "../../components/Modals/S.el";
import {RadioLists} from "../../components/RadioLists/RadioLists";

export const Playlist = () => {
    const {isAdmin, token} = useContext(AppContext);
    const {likeMusic} = useContext(MusicContext)
    const [tracks, setTracks] = useState<any[]>([])
    const [allTracks, setAllTracks] = useState<any[]>([])

    const {id} = useParams();
    const [listTracks, setListTracks] = useState<any[]>([]);
    const [modalAddTrack, setModalAddTrack] = useState(false)
    const [selectTrackError, setSelectTrackError] = useState(false)
    const [selectTrack, setSelectTrack] = useState<any | null>(null)
    const navigate = useNavigate();
    const getSelectTracks = () => {

    }

    const getAllTracks = async () => {
        try {
            let tracksArtist = await axios.get('/tracks/tracks', {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            console.log('tracks Artist', tracksArtist.data.tracks);
            let allTrack = tracksArtist.data.tracks
            // setArtist(tracksArtist.data.artist)
            // setTracks(tracksArtist.data.tracks);
            // setModalCreateGenre(false)
            // setModalSuccess(res.data.message)
            // setGenres([...genres, {id: Date.now()}])

            setAllTracks(allTrack)


        } catch(err) {
            console.error('Get Tracks By Artist', err)
        }
    }

    useEffect(()=> {
        console.log('effect', tracks)
        if( allTracks.length) {
            // let difference = artistTracks.filter(x => !tracks.includes(x));;
            //  console.log('result', difference)
            const results = allTracks.filter(({ id: id1 }) => !tracks.some(({ id: id2 }) => id2 === id1));
            // setListTracks(intersection)
            console.log('res', results)
            setListTracks(results)

        }

    },[tracks,allTracks])

    useEffect(()=>  {
        console.log('listTracks', listTracks);
    },[listTracks])

    useEffect(()=> {
        getTracksPlaylist();
        getAllTracks();
    },[id])

    const getTracksPlaylist = async () => {
        try {
            let res = await axios.post('/tracks/playlist', {id},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                // console.log('favorites from server', resFavorites.data);
                setTracks(res.data.tracks)
                console.log('Треки плейлиста', res.data)
                // getTracksByArtist(res.data.tracks[0].artistId)
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }

    }

    const addTrackToPlaylist = async () => {
        if (!selectTrack) {
            setSelectTrackError(true)
            return
        }
        try {
            let res = await axios.post('/tracks//addTrackPlaylist', {id, idTrack: selectTrack.id},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                // console.log('favorites from server', resFavorites.data);
                // setTracks(res.data.tracks)
                // getTracksByArtist(res.data.tracks[0].artistId)
                getTracksPlaylist()
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeTrackFromPlaylist = async (idTrack: number) => {
        console.log('remove');

        try {
            let res = await axios.post('/tracks/removeTrackPlaylist', {id, idTrack},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                // console.log('favorites from server', resFavorites.data);
                // setTracks(res.data.tracks)
                // getTracksByArtist(res.data.tracks[0].artistId)
                getTracksPlaylist()
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removePlaylist = async () => {
        console.log('remove');

        try {
            let res = await axios.post('/music/removePlaylist', {id},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                navigate('/playlists')
                // console.log('favorites from server', resFavorites.data);
                // setTracks(res.data.tracks)
                // getTracksByArtist(res.data.tracks[0].artistId)
                // getTracksPlaylist()
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }
    }



    const closeModal = () => {
        setModalAddTrack(false)
    }

    return (
        <PagePlaylist>
            <Container>
                <SectionTitle>Playlist {tracks.length ? tracks[0].playlistName : ''} {isAdmin && (
                    <ArtistBtns>
                        {listTracks.length > 0 ? <Button type="button" onClick={() => setModalAddTrack(true)}>ADD TRECK</Button> : null}
                        {/*<IconButton>*/}
                        {/*    <IconFollow/>*/}
                        {/*</IconButton>*/}
                        <Button type="button" border onClick={removePlaylist}>Remove playlist</Button>
                    </ArtistBtns>
                )}</SectionTitle>

                {modalAddTrack && (
                    <ModalApp onClose={closeModal}>
                        <ModalTitleApp>Select track</ModalTitleApp>
                        <form onSubmit={addTrackToPlaylist}>
                            <RadioLists
                                error={selectTrackError}
                                items={listTracks}
                                active={selectTrack ? selectTrack.name : ''}
                                defText={'Select track...'}
                                select={(track)=>setSelectTrack(track)}
                            />
                            <Buttons>
                                <Button border onClick={closeModal}>Cancel</Button>
                                <Button type={"submit"}>Add</Button>
                            </Buttons>
                        </form>
                    </ModalApp>
                )}
                {tracks.length && <ListTracks removeCustom={removeTrackFromPlaylist} items={tracks} like={likeMusic}/>}
            </Container>
        </PagePlaylist>
    )
}