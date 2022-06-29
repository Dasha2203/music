import React, {useContext, useEffect, useState} from "react";
import {PageTracks} from "./Style";
import {SectionTitle} from "../../../components/UI";
import {Container} from "../../../components/Container";
import axios from "axios";
import {AppContext} from "../../../context/AppContext";
import {ListTracks} from "../../../components/ListTracks/ListTracks";
import {PlayerAudio} from "../../../components/PlayerAudio/PlayerAudio";
import {MusicContext} from "../../../context/MusicContext";
import {useParams} from "react-router-dom";


export const TracksByGenre = () => {
    const {token} = useContext(AppContext);
    const {likeMusic} = useContext(MusicContext)
    const [tracks, setTracks] = useState([]);
    const {id} = useParams();


    useEffect(() => {
        if (!token) return

        getTracksGenre()

    },[token])

    async function getTracksGenre() {
        try {
            let resTracks = await axios.post('/music/tracksGenre', {id},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (resTracks.data) {
                console.log('all track', resTracks.data.tracks)
                setTracks(resTracks.data.tracks);
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <PageTracks>
            <Container>
                <SectionTitle>Genres</SectionTitle>
                {tracks.length && <ListTracks items={tracks} like={likeMusic}/>}
            </Container>

        </PageTracks>
    )
}