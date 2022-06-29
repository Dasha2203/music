import React, {useContext, useEffect, useState} from "react";
import {HistoryPage} from "./Style";
import {SectionTitle} from "../../components/UI";
import {Container} from "../../components/Container";
import {AppContext} from "../../context/AppContext";
import axios from "axios";
import {ListTracks} from "../../components/ListTracks/ListTracks";
import {MusicContext} from "../../context/MusicContext";
import {useNavigate} from "react-router-dom";

export const History = () => {
    const {token,userInformation} = useContext(AppContext);
    const {likeMusic} = useContext(MusicContext)
    const [tracks, setTracks] = useState<any[]>([]);
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!userInformation && !token) {
    //         navigate('/login')
    //     }
    // },[])
    //
    // const getHistory = async () => {
    //     if (!token) return;
    //
    //     try {
    //         let resHistory = await axios.get('/auth/history', {
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Authorization": "Bearer " + token
    //             }
    //         })
    //
    //         if (resHistory.data) {
    //             console.log('History: ', resHistory.data)
    //             setTracks(resHistory.data.tracks);
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    //
    // useEffect(()=> {
    //     getHistory();
    // },[])


    return (
        <HistoryPage>
            <Container>
                <SectionTitle>History</SectionTitle>
                {/*{tracks.length && <ListTracks items={tracks} like={likeMusic}/>}*/}
            </Container>
        </HistoryPage>
    )
}