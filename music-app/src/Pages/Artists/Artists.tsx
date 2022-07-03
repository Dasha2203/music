import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {SectionTitle} from "../../components/UI";
import {Container} from "../../components/Container";
import {Artist} from "../../components/Artist/Artist";
import {AddArtist} from "../../components/Artist/AddArtist";
import {Button} from "../../components/Button";
import {ModalApp} from "../../components/Modals/ModalApp";
import {UploadImg} from "../../components/UploadImg/UploadImg";
import {InputDecor} from "../../components/InputDecor/InputDecor";
import {ModalSuccess} from "../../components/Modals/ModalSuccess";
import {ModalError} from "../../components/Modals/ModalError";
import {TextareaDecor} from "../../components/InputDecor/TextareaDecor";
import {Buttons, ModalTitleApp} from "../../components/Modals/S.el";

import {AppContext} from "../../context/AppContext";
import {MusicContext} from "../../context/MusicContext";
import {typeImage} from "../../types/img";
import {ArtistsItem, PageArtists, WrapArtists} from "./Style";

export const Artists = () => {
    const {artists, getArtists} = useContext(MusicContext);
    const {token,setLoader, isAdmin} = useContext(AppContext);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [description, setDescription] = useState('');
    const [modalCreateArtist, setModalCreateArtist] = useState(false);
    const [modalSuccess, setModalSuccess] = useState('')
    const [modalError, setModalError] = useState(false)
    const navigate = useNavigate();

    const [image, setImage] = useState<null | FormData>(null);
    const [srcImg, setSrcImg] = useState('');

    const handleFileInput = (event: any) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0], event.target.files[0].name);
        setImage(formData);
        setSrcImg(URL.createObjectURL(event.target.files[0]))
    }

    const createArtist = async ( img: typeImage) => {
        if (!token) return;

        try {
            let res = await axios.post('/music/createArtist', {name, description, srcImg: img.path}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            setModalCreateArtist(false)
            setModalSuccess(res.data.message)
            getArtists();
            // setGenres([...genres, {id: Date.now()}])
        } catch(err) {
            setModalError(true)
            console.error('create artist error', err)
        } finally {
            console.log('finally')
            setLoader(false)
        }
    }

    const uploadImage = async (e: any) => {
        if (!token) return;

        e.preventDefault()

        if (!name.trim()) {
            setNameError('Enter name artist');
            return;
        }

        try {
            setLoader(true)
            let res = await axios.post('/music/uploadImage', image, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            createArtist(res.data.img)
        } catch (err) {
            console.error('Upload image error artists', err);
            setLoader(false)
        }
    }

    const closeModal = () => {
        setModalCreateArtist(false)
    }

    return (
        <>
            <Container>
                <SectionTitle>Artists</SectionTitle>
                <WrapArtists>

                    {isAdmin && (
                        <ArtistsItem onClick={() => setModalCreateArtist(true)}>
                            <AddArtist/>
                        </ArtistsItem>
                    )}
                    {artists.map(artist => (
                        <ArtistsItem key={artist.id} onClick={()=>navigate(`/artist/${artist.id}`)}>
                            <Artist artist={artist}/>
                        </ArtistsItem>
                    ))}

                </WrapArtists>
            </Container>
            {modalCreateArtist && (
                <ModalApp onClose={closeModal}>
                    <ModalTitleApp>Create new artist</ModalTitleApp>
                    <form onSubmit={uploadImage}>
                        <UploadImg
                            handleFileInput={handleFileInput}
                            srcImg={srcImg}
                        />
                        <InputDecor
                            label={'Name'}
                            placeHolder={'Name Artist'}
                            type={'text'} value={name}
                            changeValue={(e) => setName(e.target.value)}
                            error={nameError}
                        />
                        <TextareaDecor label={'Description'}
                                       placeHolder={'Overview Artist'}
                                      value={description}
                                       changeValue={(e) => setDescription(e.target.value)}
                                       error={nameError}/>
                        <Buttons>
                            <Button border onClick={closeModal}>Cancel</Button>
                            <Button type={"submit"}>Create</Button>
                        </Buttons>
                    </form>

                </ModalApp>
            )}

            {modalSuccess && <ModalSuccess onClose={() => setModalSuccess('')} title={'Artist was created'}/>}
            {modalError && <ModalError onClose={() => setModalError(false)} title={'Artist didn`t created'}/>}
        </>
    )
}