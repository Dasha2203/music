import React, {useContext, useEffect} from "react";
import {FavoritesPage} from "./Style";
import {SectionTitle} from "../../components/UI";
import {Container} from "../../components/Container";
import {MusicContext} from "../../context/MusicContext";
import {ListTracks} from "../../components/ListTracks/ListTracks";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";


export const Favorites = () => {
    const {userInformation, token} = useContext(AppContext)
    const {favorites, likeMusic} = useContext(MusicContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!userInformation && !token) {
            navigate('/login')
        }
    },[])
    return (
        <FavoritesPage>
            <Container>
                <SectionTitle>Favorites</SectionTitle>
                {favorites.length && <ListTracks items={favorites} like={likeMusic}/>}
            </Container>
        </FavoritesPage>
    )
}