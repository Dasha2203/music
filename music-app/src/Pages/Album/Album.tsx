import React, {useContext, useEffect, useState} from "react";
import {Page, SectionTitle} from "../../components/UI";
import {PageAlbum} from "./Styled";
import {Container} from "../../components/Container";
import {ListTracks} from "../../components/ListTracks/ListTracks";
import {AppContext} from "../../context/AppContext";
import {useParams} from "react-router-dom";
import axios from "axios";
import {MusicContext} from "../../context/MusicContext";
import {ArtistBtns} from "../Artist/S.el";
import {Button} from "../../components/Button";
import {ModalApp} from "../../components/Modals/ModalApp";
import {Buttons, ModalTitleApp} from "../../components/Modals/S.el";
import {UploadImg} from "../../components/UploadImg/UploadImg";
import {InputDecor} from "../../components/InputDecor/InputDecor";
import {RadioLists} from "../../components/RadioLists/RadioLists";

export const Album = () => {
    const {isAdmin, token} = useContext(AppContext);
    const {likeMusic} = useContext(MusicContext)
    const [tracks, setTracks] = useState<any[]>([])
    const [artistTracks, setArtistTracks] = useState<any[]>([])

    const {id} = useParams();
    const [listTracks, setListTracks] = useState<any[]>([]);
    const [modalAddTrack, setModalAddTrack] = useState(false)
    const [selectTrackError, setSelectTrackError] = useState(false)
    const [selectTrack, setSelectTrack] = useState<any | null>(null)
    const getSelectTracks = () => {

    }

    const getTracksByArtist = async (id: number) => {
        try {
            let tracksArtist = await axios.post('/tracks/tracksArtist', {id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            console.log('tracks Artist', tracksArtist.data.tracks);
            let artistTrack = tracksArtist.data.tracks
            // setArtist(tracksArtist.data.artist)
            // setTracks(tracksArtist.data.tracks);
            // setModalCreateGenre(false)
            // setModalSuccess(res.data.message)
            // setGenres([...genres, {id: Date.now()}])

            setArtistTracks(artistTrack)


        } catch(err) {
            console.error('Get Tracks By Artist', err)
        }
    }

    useEffect(()=> {
        console.log('effect')

        console.log('artist', artistTracks);
        console.log('tracks', tracks)
        let newArr = []

        // for (let i = 0; i <artistTracks.length; i++) {
        //     for (let j =0; j < tracks.length; j++) {
        //         if (artistTracks[i].id === tracks[j])
        //     }
        // }

        if(tracks.length && artistTracks.length) {
           // let difference = artistTracks.filter(x => !tracks.includes(x));;
           //  console.log('result', difference)
            const results = artistTracks.filter(({ id: id1 }) => !tracks.some(({ id: id2 }) => id2 === id1));
            // setListTracks(intersection)
            console.log('res', results)
            setListTracks(results)

        }

    },[tracks,artistTracks])

    useEffect(()=>  {
        console.log('listTracks', listTracks);
    },[listTracks])

    useEffect(()=> {
        getTracksAlbum();
    },[id])

    const getTracksAlbum = async () => {
        try {
            let res = await axios.post('/tracks/album', {id},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                // console.log('favorites from server', resFavorites.data);
                setTracks(res.data.tracks)
                getTracksByArtist(res.data.tracks[0].artistId)
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }

    }

    const addTrackToAlbum = async () => {
        if (!selectTrack) {
            setSelectTrackError(true)
            return
        }
        try {
            let res = await axios.post('/tracks/addTrackAlbum', {id, idTrack: selectTrack.id},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                // console.log('favorites from server', resFavorites.data);
                // setTracks(res.data.tracks)
                // getTracksByArtist(res.data.tracks[0].artistId)
                getTracksAlbum()
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const removeTrackFromAlbum = async (idTrack: number) => {
        console.log('remove');

        try {
            let res = await axios.post('/tracks/removeTrackAlbum', {id, idTrack},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                // console.log('favorites from server', resFavorites.data);
                // setTracks(res.data.tracks)
                // getTracksByArtist(res.data.tracks[0].artistId)
                getTracksAlbum()
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
        <PageAlbum>
            <Container>
                <SectionTitle>Album {tracks.length ? tracks[0].albomName : ''} {isAdmin && (
                    <ArtistBtns>
                        {listTracks.length ? <Button type="button" onClick={() => setModalAddTrack(true)}>ADD TRECK</Button> : null}
                        {/*<IconButton>*/}
                        {/*    <IconFollow/>*/}
                        {/*</IconButton>*/}
                    </ArtistBtns>
                )}</SectionTitle>

                {modalAddTrack && (
                    <ModalApp onClose={closeModal}>
                        <ModalTitleApp>Select track</ModalTitleApp>
                        <form onSubmit={addTrackToAlbum}>
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
                {tracks.length && <ListTracks removeCustom={removeTrackFromAlbum} items={tracks} like={likeMusic}/>}
            </Container>
        </PageAlbum>
    )
}