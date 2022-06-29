import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

import {SmallCard} from "../../components/SmallCard/SmallCard";
import {SectionTitle} from "../../components/UI";
import {Container} from "../../components/Container";
import {AddSmallCard} from "../../components/SmallCard/AddSmallCard";
import {ModalApp} from "../../components/Modals/ModalApp";
import {Buttons, ModalTitleApp} from "../../components/Modals/S.el";
import {InputDecor} from "../../components/InputDecor/InputDecor";
import {Button} from "../../components/Button";
import {UploadImg} from "../../components/UploadImg/UploadImg";
import {ModalSuccess} from "../../components/Modals/ModalSuccess";
import {ModalError} from "../../components/Modals/ModalError";
import {GenresItem, PageGenres, WrapGenres} from "./S.el";
import {MusicContext} from "../../context/MusicContext";
import {AppContext} from "../../context/AppContext";
import {typeImage} from "../../types/img";


export const Genres = () => {
    const {token, loader, setLoader, isAdmin} = useContext(AppContext);
    const {genres, setGenres, getGenres} = useContext(MusicContext);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [modalCreateGenre, setModalCreateGenre] = useState(false);
    const [modalSuccess, setModalSuccess] = useState('')
    const [modalError, setModalError] = useState('')
    const navigate = useNavigate();

    const [image, setImage] = useState<null | FormData>(null);
    const [srcImg, setSrcImg] = useState('')
    const handleClick = () => {
        axios.post('http://localhost:4000/image-upload', image)
            .then(res => {
                console.log('Axios response: ', res)
            })
    }
    const handleFileInput = (event: any) => {
        console.log('handleFileInput working!')
        console.log(event.target.files[0]);
        const formData = new FormData();
        formData.append('file', event.target.files[0], event.target.files[0].name);
        console.log(formData);
        setImage(formData);
        setSrcImg(URL.createObjectURL(event.target.files[0]))
    }

    const createGenre = async ( img: typeImage) => {
        if (!token) return;


        try {
            let res = await axios.post('/music/createGenre', {name, srcImg: img.path}, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            setModalCreateGenre(false)
            setModalSuccess(res.data.message)
            getGenres();
            // setGenres([...genres, {id: Date.now()}])
        } catch(err) {
            // setModalError(err?.message)
            console.error('create genre error', err)
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

        try {
            setLoader(true)
            let res = await axios.post('/music/uploadImage', image, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            createGenre(res.data.img)
        } catch (err) {
            console.error('Upload image error genres', err);
            setLoader(false)
        }
    }

    const closeModal = () => {
        setModalCreateGenre(false)
    }

    return (
        <PageGenres>
            <Container>
                <SectionTitle>Genres</SectionTitle>
                <WrapGenres>
                    {isAdmin && (
                        <GenresItem onClick={() => setModalCreateGenre(true)}>
                            <AddSmallCard title={'add'}/>
                        </GenresItem>
                    )}
                    {
                        genres.map(genre => (
                        <GenresItem key={genre.id} onClick={() =>navigate(`/genre/${genre.id}`)}>
                            <SmallCard genre={genre}/>
                        </GenresItem>
                    ))}
                </WrapGenres>
            </Container>
            {modalCreateGenre && (
                <ModalApp onClose={closeModal} >
                    <ModalTitleApp>Create new genre</ModalTitleApp>
                    <form onSubmit={uploadImage}>
                        <UploadImg
                            handleFileInput={handleFileInput}
                            srcImg={srcImg}
                        />
                        <InputDecor
                            label={'Name'}
                            placeHolder={'Name genre'}
                            type={'text'} value={name}
                            changeValue={(e)=> setName(e.target.value)}
                            error={nameError}
                        />
                        <Buttons>
                            <Button border onClick={closeModal}>Cancel</Button>
                            <Button type={"submit"} >Create</Button>
                        </Buttons>
                    </form>

                </ModalApp>
            )}

            {modalSuccess && <ModalSuccess onClose={()=>setModalSuccess('')} title={'Genre was created'}/>}
            {modalError && <ModalError onClose={()=>setModalError('')} title={'Genre didn`t created'}/>}


        </PageGenres>
    )
}