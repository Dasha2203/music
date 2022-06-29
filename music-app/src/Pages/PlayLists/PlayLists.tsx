import React, {useContext, useEffect, useState} from 'react';
import {PagePlayLists, PlayListsItem, WrapPlayLists} from "./S.el";
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
import {Playlist} from "../../components/Playlist/Playlist";
import {AddPlaylist} from "../../components/Playlist/AddPlaylist";

export const PlayLists = () => {
    const {playlists, getPlaylists} = useContext(MusicContext);
    const {token, loader, setLoader, isAdmin} = useContext(AppContext);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [description, setDescription] = useState('');
    const [modalCreatePlaylist, setModalCreatePlaylist] = useState(false);
    const [modalSuccess, setModalSuccess] = useState('')
    const [modalError, setModalError] = useState(false)
    const navigate = useNavigate();

    const [image, setImage] = useState<null | FormData>(null);
    const [srcImg, setSrcImg] = useState('');

    const handleFileInput = (event: any) => {
        console.log('handleFileInput working!')
        console.log(event.target.files[0]);
        const formData = new FormData();
        formData.append('file', event.target.files[0], event.target.files[0].name);
        console.log(formData);
        setImage(formData);
        setSrcImg(URL.createObjectURL(event.target.files[0]))
    }

    useEffect(() => {
        getPlaylists();
    },[])

    const createPlaylist = async ( img?: typeImage) => {
        if (!token) return;

        try {
            let res = await axios.post('/playlists/create', {name, srcImg: img?.path || null}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            closeModal();
            setModalSuccess(res.data.message)
            getPlaylists();
            // setGenres([...genres, {id: Date.now()}])
        } catch(err) {
            setModalError(true)
            console.error('create playlist error', err)
        } finally {
            console.log('finally')
            setLoader(false)
        }
    }

    const uploadImage = async (e: any) => {
        if (!token) return;

        e.preventDefault()

        if (!name.trim()) {
            setNameError('Enter name genre');
            return;
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

                console.log('resggggg', res)
                createPlaylist(res.data.img)
            } catch (err) {
                console.error('Upload image error genres', err);
                setLoader(false)
            }
        } else {
            createPlaylist();
        }


    }

    const closeModal = () => {
        setModalCreatePlaylist(false)
    }
    return (
        <PagePlayLists>
            <Container>
                <SectionTitle>Playlists</SectionTitle>
                <WrapPlayLists>
                    {isAdmin && (
                        <PlayListsItem onClick={() => setModalCreatePlaylist(true)}>
                            <AddPlaylist/>
                        </PlayListsItem>
                    )}
                    {playlists.map(playlist => (
                        <PlayListsItem key={playlist.id} onClick={()=>navigate(`/playlist/${playlist.id}`)}>
                            <Playlist playlist={playlist}/>
                        </PlayListsItem>
                    ))}
                </WrapPlayLists>
            </Container>

            {modalCreatePlaylist && (
                <ModalApp onClose={() => {
                }}>
                    <ModalTitleApp>Create new playlist</ModalTitleApp>
                    <form onSubmit={uploadImage}>
                        <UploadImg
                            handleFileInput={handleFileInput}
                            srcImg={srcImg}
                        />
                        <InputDecor
                            label={'Name'}
                            placeHolder={'Name playlist'}
                            type={'text'} value={name}
                            changeValue={(e) => setName(e.target.value)}
                            error={nameError}
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

        </PagePlayLists>
    )
}