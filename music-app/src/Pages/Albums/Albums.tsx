import React, {useContext, useState} from 'react';
import {SectionTitle} from "../../components/UI";
import {Container} from "../../components/Container";
import {MusicContext} from "../../context/MusicContext";
import {ModalApp} from "../../components/Modals/ModalApp";
import {Buttons, ModalTitleApp} from "../../components/Modals/S.el";
import {UploadImg} from "../../components/UploadImg/UploadImg";
import {InputDecor} from "../../components/InputDecor/InputDecor";
import {Button} from "../../components/Button";
import {ModalSuccess} from "../../components/Modals/ModalSuccess";
import {ModalError} from "../../components/Modals/ModalError";
import {AppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";
import {typeImage} from "../../types/img";
import axios from "axios";
import {AlbumsItem, PageAlbums, WrapAlbums} from "./Style";
import {AddAlbum} from "../../components/Album/AddAlbum";
import {Album} from "../../components/Album/Album";
import {RadioLists} from "../../components/RadioLists/RadioLists";
import {TArtist} from "../../types/artist";
import {LENGTH_YEAR, PATTERN_NUMBER} from "../../constantes/variables";

export const Albums = () => {
    const {albums, artists} = useContext(MusicContext);
    const {token, loader, setLoader, isAdmin} = useContext(AppContext);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [modalCreateAlbum, setModalCreateAlbum] = useState(false);
    const [modalSuccess, setModalSuccess] = useState('')
    const [modalError, setModalError] = useState(false)
    const navigate = useNavigate();
    const [selectedArtist, setSelectedArtist] = useState<TArtist | null>(null);
    const [selectedArtistError, setSelectedArtistError] = useState(false);
    const [yearAlbum, setYearAlbum] = useState('');
    const [yearAlbumError, setYearAlbumError] = useState('');
    const [image, setImage] = useState<null | FormData>(null);
    const [srcImg, setSrcImg] = useState('');

    const handleFileInput = (event: any) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0], event.target.files[0].name);
        setImage(formData);
        setSrcImg(URL.createObjectURL(event.target.files[0]))
    }

    const addAlbum = async (img: typeImage) => {
        if (!selectedArtist) return
        try {
            setLoader(true)

            let res = await axios.post('/music/addAlbum', {name, year: yearAlbum, srcImg: img.path, artist: selectedArtist.id}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (res.data.isCompleted) {
                setModalSuccess(res.data.message);
                setModalCreateAlbum(false)
            }

        } catch (err) {
            console.error('remove track', err)
            setModalError(true)
        } finally {
            setLoader(false)
        }
    }

    const uploadImage = async (e: any) => {
        if (!token) return;
        resetState()

        e.preventDefault()

        if (!name.trim()) {
            setNameError('Enter name album');
            return;
        }
        if (!yearAlbum.trim()) {
            setYearAlbumError('Enter year');
            return;
        }
        if (!selectedArtist) {
            setSelectedArtistError(true)
            return
        }
        setLoader(true);
        if (!!image) {
            try {
                let res = await axios.post('/music/uploadImage', image, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + token
                    }
                })

                addAlbum(res.data.img)
            } catch (err) {
                console.error('Upload image error genres', err);
                setLoader(false)
            }
        }


    }

    const yearHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= LENGTH_YEAR && (PATTERN_NUMBER.test(e.target.value))) {
            setYearAlbum(e.target.value);
        }
    }
    const resetState = () => {
        setName('');
        setNameError('');
        setYearAlbum('');
        setYearAlbumError('')
        setSelectedArtist(null);
        setSelectedArtistError(false)
        setImage(null)
        setSrcImg('')
    }

    const closeModal = () => {
        setModalCreateAlbum(false);
        resetState()
    }


    return (
        <PageAlbums>
            <Container>
                <SectionTitle>Albums</SectionTitle>
                <WrapAlbums>
                    {isAdmin && (
                        <AlbumsItem onClick={() => setModalCreateAlbum(true)}>
                            <AddAlbum/>
                        </AlbumsItem>
                    )}
                    {albums.map(album => (
                        <AlbumsItem key={album.id} onClick={()=>navigate(`/album/${album.id}`)}>
                            <Album album={album}/>
                        </AlbumsItem>
                    ))}
                </WrapAlbums>
            </Container>

            {modalCreateAlbum && (
                <ModalApp onClose={() => {
                }}>
                    <ModalTitleApp>Create new album</ModalTitleApp>
                    <form onSubmit={uploadImage}>
                        <UploadImg
                            handleFileInput={handleFileInput}
                            srcImg={srcImg}
                        />
                        <RadioLists
                            error={selectedArtistError}
                            items={artists}
                            active={selectedArtist ? selectedArtist.name : ''}
                            defText={'Select artist...'}
                            select={(artist)=>setSelectedArtist(artist)}
                        />
                        <InputDecor
                            label={'Name'}
                            placeHolder={'Name '}
                            type={'text'} value={name}
                            changeValue={(e) => setName(e.target.value)}
                            error={nameError}
                        />
                        <InputDecor
                            label={'Year the album was released'}
                            placeHolder={'Enter the year the album was released'}
                            type={'text'} value={yearAlbum}
                            changeValue={yearHandleInput}
                            error={yearAlbumError}
                        />
                        <Buttons>
                            <Button border onClick={closeModal}>Cancel</Button>
                            <Button type={"submit"}>Create</Button>
                        </Buttons>
                    </form>

                </ModalApp>
            )}

            {modalSuccess && <ModalSuccess onClose={() => setModalSuccess('')} title={'Playlist was created'}/>}
            {modalError && <ModalError onClose={() => setModalError(false)} title={'Playlist didn`t created'}/>}

        </PageAlbums>
    )
}