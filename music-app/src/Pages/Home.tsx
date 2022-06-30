import React, {useContext} from 'react';
import {Page} from "../components/UI";
import {Artist} from "../components/Artist/Artist";
import {PageLine} from "../components/PageLine/PageLine";
import {Container} from "../components/Container";
import {SmallCard} from "../components/SmallCard/SmallCard";
import {MusicContext} from "../context/MusicContext";
import {ArtistsItem, WrapArtists} from "./Artists/Style";
import {GenresItem, WrapGenres} from "./Genres/S.el";
import {useNavigate} from "react-router-dom";
import {PlayListsItem, WrapPlayLists} from "./PlayLists/S.el";
import {Playlist} from "../components/Playlist/Playlist";
import {AlbumsItem, WrapAlbums} from "./Albums/Style";
import {AddAlbum} from "../components/Album/AddAlbum";
import {Album} from "../components/Album/Album";

export const Home = () => {
    const {artists, genres, playlists, albums} = useContext(MusicContext);
    const navigate = useNavigate();
    return (
            <Container>

                <PageLine
                    title={"Genres"}
                    description={"Explore by genre and mood"}
                    link={'/genres'}
                >
                    <WrapGenres>
                        {genres.map(genre => (
                            <GenresItem key={genre.id} onClick={() =>navigate(`/genre/${genre.id}`)}>
                                <SmallCard genre={genre}/>
                            </GenresItem>
                        ))}
                    </WrapGenres>
                </PageLine>

                <PageLine
                    title={"Albums"}
                    description={"Explore by genre and mood"}
                    link={'/albums'}
                >
                    <WrapAlbums>
                        {albums.map(album => (
                            <AlbumsItem key={album.id} onClick={()=>navigate(`/album/${album.id}`)}>
                                <Album album={album}/>
                            </AlbumsItem>
                        ))}
                    </WrapAlbums>
                </PageLine>

                <PageLine
                    title={"Playlist picks"}
                    link={'/playlists'}
                >
                    <WrapPlayLists>
                        {playlists.map(playlist => (
                            <PlayListsItem key={playlist.id} onClick={()=>navigate(`/playlist/${playlist.id}`)}>
                                <Playlist playlist={playlist}/>
                            </PlayListsItem>
                        ))}
                    </WrapPlayLists>

                </PageLine>
                <PageLine
                    title={"Artist"}
                    link={'/artists'}
                >
                    {artists.map(artist => (
                        <ArtistsItem key={artist.id} onClick={()=>navigate(`/artist/${artist.id}`)}>
                            <Artist artist={artist}/>
                        </ArtistsItem>
                    ))}
                </PageLine>
            </Container>

    )
}