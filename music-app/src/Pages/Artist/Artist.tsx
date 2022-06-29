import React, {useContext, useEffect, useState} from "react";
import {Page} from "../../components/UI";
import {Container} from "../../components/Container";
import {
    ArtistBtns,
    ArtistFollowers, ArtistNavigation,
    ArtistPromo,
    ArtistPromoContent,
    ArtistPromoImg,
    ArtistText,
    ArtistTitle,
    Hint, NavigationItem
} from "./S.el";
import {ReactComponent as IconFollow} from "../../assets/follow.svg";

import {Button} from "../../components/Button";
import {IconButton} from "../../components/ButtonIcon";
import {ReactComponent as IconLike} from "../../assets/like.svg";
import {MusicContext} from "../../context/MusicContext";
import {useNavigate, useParams} from "react-router-dom";
import {TArtist} from "../../types/artist";
import axios from "axios";
import {AppContext} from "../../context/AppContext";
import {ListTracks} from "../../components/ListTracks/ListTracks";
import {ArtistDescription} from "../Artists/Style";
import {ModalApp} from "../../components/Modals/ModalApp";
import {Buttons, ModalTitleApp} from "../../components/Modals/S.el";
import {UploadImg} from "../../components/UploadImg/UploadImg";
import {InputDecor} from "../../components/InputDecor/InputDecor";
import {TextareaDecor} from "../../components/InputDecor/TextareaDecor";
import {RadioLists} from "../../components/RadioLists/RadioLists";
import {Genre} from "../../types/genre";
import {UploadMusic} from "../../components/UploadMusic/UploadMusic";
import {typeImage} from "../../types/img";
import {ModalSuccess} from "../../components/Modals/ModalSuccess";
import {ModalError} from "../../components/Modals/ModalError";
import {AlbumsItem, WrapAlbums} from "../Albums/Style";
import {Album} from "../../components/Album/Album";
import {TAlbums} from "../../types/albums";

const LENGTH_YEAR = 4;
const pattern = /^[0-9\b]+$/;

export const ArtistPage = () => {
    const {token, loader, setLoader, isAdmin} = useContext(AppContext)
    const {artists, genres, likeMusic} = useContext(MusicContext);
    const {id} = useParams();
    const [artist, setArtist] = useState<null |TArtist>(null)
    const [tracks, setTracks] = useState<any[]>([])
    const navigate = useNavigate();
    const [modalCreateTrack, setModalCreateTrack] = useState(false);
    const [modalCreateAlbum, setModalCreateAlbum] = useState(false);
    const [activeTab, setActiveTab] = useState<'tracks' | 'albums'>('tracks');
    const [textTrack, setTextTrack] = useState('');
    const [name, setName] = useState('');
    const [selectGenre, setSelectGenre] = useState<null | Genre>(null)
    const [nameError, setNameError] = useState('');
    const [image, setImage] = useState<null | FormData>(null);
    const [srcImg, setSrcImg] = useState('');
    const [musicFile, setMusicFile] = useState<null | FormData>(null)
    const [musicName, setMusicName] = useState('');
    const [musicError, setMusicError] = useState('')
    const [modalSuccess, setModalSuccess] = useState('')
    const [modalError, setModalError] = useState(false);
    const [successTextModal, setSuccessTextModal] = useState('')
    const [selectGenreError, setSelectGenreError] = useState(false)
    const [yearAlbum, setYearAlbum] = useState('');
    const [albums, setAlbums] = useState<TAlbums[]>([])
    useEffect(() => {
        // console.log(id)
        // if (artists.length && id) {
        //     let artist = artists.find(artist => artist.id === +id)
        //     if (artist) setArtist(artist);
        // }
        if (id) {
            getTracksByArtist()
            getAlbumsArtist()
        }

    },[id]);



    const createTrack = async ( img: typeImage, music: string) => {
        if (!token || !selectGenre) return;

        console.log('create function img', img);


        try {
            let res = await axios.post('/tracks/addTrack', {
                name,
                text: textTrack,
                srcImg: img ? img.path : null,
                path: music,
                artist: id,
                genre:
                selectGenre.id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            setModalCreateTrack(false)
            setModalSuccess(res.data.message);
            setSuccessTextModal(res.data.message);
            setTracks([...tracks, res.data.track])
            // setGenres([...genres, {id: Date.now()}])
        } catch(err) {
            setModalError(true)
            console.error('create artist error', err)
        } finally {
            console.log('finally')
            setLoader(false)
        }
    }

    const yearHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= LENGTH_YEAR && (pattern.test(e.target.value))) {
            setYearAlbum(e.target.value);
        }
    }

    const getAlbumsArtist = async () => {
        try {
            let res = await axios.post('/music/getAlbumsArtist', {artist: id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data.isCompleted) {
                // setTracks([...tracks.filter(item => item.id !== id)])
                // // setLoader(false)
                // setModalSuccess
                console.log('albums by artist', res.data)
                setAlbums(res.data.albums)
            }

        } catch (err) {
            console.error('albums artist', err)
            setModalError(true)
        }
    }

    const uploadImage = async (music: string) => {
        if (!token) return;

        try {
            let res = await axios.post('/music/uploadImage', image, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            createTrack(res.data.img, music)
        } catch (err) {
            console.error('Upload image error artists', err);
            setLoader(false);
            setModalError(true)
        }
    }

    const uploadImageAlbum = async (e: any) => {
        e.preventDefault()
        if (!token) return;

        try {
            setLoader(true);
            let res = await axios.post('/music/uploadImage', image, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            addAlbum(res.data.img)
            // createTrack(res.data.img, music)
        } catch (err) {
            console.error('Upload image error album', err);
            setLoader(false);
            setModalError(true)
        }
    }

    const removeTrack = async (id: number) => {
        try {
            setLoader(true)

            let res = await axios.post('/tracks/remove', {id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data.isRemoved) {
                setTracks([...tracks.filter(item => item.id !== id)])
                // setLoader(false)
                setModalSuccess('Track was removed')
            }

        } catch (err) {
            console.error('remove track', err)
            setModalError(true)
        } finally {
            setLoader(false)
        }
    }

    const addAlbum = async (img: typeImage) => {
        try {
            setLoader(true)

            let res = await axios.post('/music/addAlbum', {name, year: yearAlbum, srcImg: img.path, artist: id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data.isCompleted) {
                console.log(res.data)
                setModalSuccess(res.data.message);
                setModalCreateAlbum(false)
                getTracksByArtist();
            }

        } catch (err) {
            console.error('remove track', err)
            setModalError(true)
        } finally {
            setLoader(false)
        }
    }


    const uploadMusic = async (e: any) => {
        if (!token) return;
        resetState();

        e.preventDefault()

        if (!name.trim()) {
            setNameError('Enter name track');
            return;
        }

        if (!musicFile) {
            setMusicError('Select music')
            return
        }

        if (!selectGenre) {
            setSelectGenreError(true);
            return;
        }

        try {
            setLoader(true)
            let res = await axios.post('/tracks/uploadMusic', musicFile, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            uploadImage(res.data.music.path);
            console.log('res music load', res.data.music.path)
            // setMusicPath(res.data.music.path);
        } catch (err) {
            console.error('Upload music error artist', err);
            setModalError(true)
            setLoader(false)
        }
    }

    const getTracksByArtist = async () => {
        try {
            let tracksArtist = await axios.post('/tracks/tracksArtist', {id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            console.log('tracks Artist', tracksArtist);
            setArtist(tracksArtist.data.artist)
            setTracks(tracksArtist.data.tracks);
            // setModalCreateGenre(false)
            // setModalSuccess(res.data.message)
            // setGenres([...genres, {id: Date.now()}])
        } catch(err) {
            console.error('Get Tracks By Artist', err)
        }
    }

    const handleFileInput = (event: any) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0], event.target.files[0].name);

        setImage(formData);
        setSrcImg(URL.createObjectURL(event.target.files[0]))
    }

    const handleMusicInput = (event: any) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0], event.target.files[0].name);
        setMusicFile(formData);
        // console.log('audio data', new Audio(formData));

        setMusicName(event.target.files[0].name)
        // setSrcImg(URL.createObjectURL(event.target.files[0]))
    }

    const resetState = () => {
        setName('');
        setNameError('');
        setMusicError('');
        setSelectGenre(null)
        setSelectGenreError(false);
        setImage(null)
        setSrcImg('')
        setMusicName('')
        setMusicFile(null)
    }

    const closeModal = () => {
        setModalCreateTrack(false);
        setModalCreateAlbum(false);

        resetState()
    }

    return (
        <Page className={"artist-page"}>
            <Container>
               <ArtistPromo>
                   {/*<ArtistFollowers>*/}
                   {/*    <IconLike/> {(120435).toLocaleString('en-US')}*/}
                   {/*</ArtistFollowers>*/}
                   <ArtistPromoImg>
                       {artist?.srcImg &&<img src={`/${artist.srcImg}`} alt="Artist image"/>}
                   </ArtistPromoImg>
                   <ArtistPromoContent>
                       <Hint>Artist</Hint>
                       <ArtistTitle>
                           <ArtistText>{artist?.name}</ArtistText>
                           {isAdmin && (
                               <ArtistBtns>
                                   <Button type="button" onClick={() => setModalCreateTrack(true)}>ADD TRACK</Button>
                                   <Button type="button" onClick={() => setModalCreateAlbum(true)}>ADD ALBUM</Button>
                               {/*<IconButton>*/}
                               {/*    <IconFollow/>*/}
                               {/*</IconButton>*/}
                                </ArtistBtns>
                           )}

                       </ArtistTitle>
                       <ArtistDescription>
                           {artist?.description}
                       </ArtistDescription>

                   </ArtistPromoContent>

               </ArtistPromo>

                <ArtistNavigation>
                    <NavigationItem active={activeTab === 'tracks'} onClick={()=> setActiveTab('tracks')}>Tracks</NavigationItem>
                    <NavigationItem active={activeTab === 'albums'} onClick={()=> setActiveTab('albums')}>Albums</NavigationItem>
                </ArtistNavigation>

                {activeTab === "tracks" ? tracks.length ? <ListTracks items={tracks} remove={removeTrack} like={likeMusic}/>: null :
                    <WrapAlbums>
                        <WrapAlbums>
                            {albums.map(album => (
                                <AlbumsItem key={album.id}>
                                    <Album album={album}/>
                                </AlbumsItem>
                            ))}
                        </WrapAlbums>
                </WrapAlbums>}



                {/*Modals*/}
                {modalCreateTrack && (
                    <ModalApp onClose={closeModal}>
                        <ModalTitleApp>Add new track to {artist?.name}</ModalTitleApp>
                        <form onSubmit={uploadMusic}>
                            <UploadMusic
                                handleFileInput={handleMusicInput}
                                nameMusic={musicName}
                                error={musicError}
                            />
                            <UploadImg
                                handleFileInput={handleFileInput}
                                srcImg={srcImg}
                            />
                            <RadioLists
                                error={selectGenreError}
                                items={genres}
                                active={selectGenre ? selectGenre.name : ''}
                                defText={'Select genre...'}
                                select={(genre)=>setSelectGenre(genre)}
                            />
                            <InputDecor
                                label={'Name'}
                                placeHolder={'Name track'}
                                type={'text'} value={name}
                                changeValue={(e) => setName(e.target.value)}
                                error={nameError}
                            />
                            <TextareaDecor label={'Track text'}
                                           placeHolder={'Song lyrics '}
                                           value={textTrack}
                                           changeValue={(e) => setTextTrack(e.target.value)}
                                           error={''}/>
                            <Buttons>
                                <Button border onClick={closeModal}>Cancel</Button>
                                <Button type={"submit"}>Create</Button>
                            </Buttons>
                        </form>
                    </ModalApp>
                )}

                {modalCreateAlbum && (
                    <ModalApp onClose={closeModal}>
                        <ModalTitleApp>Add new album to {artist?.name}</ModalTitleApp>
                        <form onSubmit={uploadImageAlbum}>
                            <UploadImg
                                handleFileInput={handleFileInput}
                                srcImg={srcImg}
                            />
                            <InputDecor
                                label={'Name'}
                                placeHolder={'Name Album'}
                                type={'text'} value={name}
                                changeValue={(e) => setName(e.target.value)}
                                error={nameError}
                            />
                            <InputDecor
                                label={'Year the album was released'}
                                placeHolder={'Enter the year the album was released'}
                                type={'text'} value={yearAlbum}
                                changeValue={yearHandleInput}
                                error={nameError}
                            />
                            <Buttons>
                                <Button border onClick={closeModal}>Cancel</Button>
                                <Button type={"submit"}>Create</Button>
                            </Buttons>
                        </form>
                    </ModalApp>
                )}
            </Container>
            {modalSuccess && <ModalSuccess onClose={() => setModalSuccess('')} title={successTextModal}/>}
            {modalError && <ModalError onClose={() => setModalError(false)} title={'Error'}/>}
        </Page>
    )
}