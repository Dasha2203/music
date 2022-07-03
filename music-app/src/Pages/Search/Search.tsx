import React, {useContext, useState} from "react";
import {SearchPage} from "./Style";
import {Container} from "../../components/Container";
import {SectionTitle} from "../../components/UI";
import {InputDecor} from "../../components/InputDecor/InputDecor";
import axios from "axios";
import {AppContext} from "../../context/AppContext";
import {ListTracks} from "../../components/ListTracks/ListTracks";
import {MusicContext} from "../../context/MusicContext";

export const Search = () => {
    const {token} = useContext(AppContext)
    const {likeMusic} = useContext(MusicContext);
    const [searchValue, setSearchValue] = useState('')
    const [tracks, setTracks] = useState<any[]>([])

    const searchTracks = async (e: any) => {
        setSearchValue(e.target.value);
        let value = e.target.value;

        try {
            let res = await axios.post('/tracks/tracksByName', {value},{
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data) {
                // console.log('favorites from server', resFavorites.data);
                setTracks(res.data.tracks)
                // getTracksByArtist(res.data.tracks[0].artistId)
                // setPlaylists(resPlaylists.data.playlists)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
            <Container>
                <SectionTitle>
                    Search
                </SectionTitle>
                <InputDecor
                    label={'Search'}
                    placeHolder={'Start typing the song'}
                    type={'text'} value={searchValue}
                    changeValue={searchTracks }
                    error={''}
                />
                {tracks.length && <ListTracks items={tracks} like={likeMusic}/>}
            </Container>
    )
}