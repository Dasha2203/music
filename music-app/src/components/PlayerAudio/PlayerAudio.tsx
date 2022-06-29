import React, {useContext, useEffect, useRef, useState} from "react";
import {
    BlockText,
    BtnLike,
    PlayerAudioContainer,
    PlayerAudioImg,
    PlayerAudioLogo,
    PlayerAudioText,
    PlayerAudioTitle
} from "./Style";
import ReactAudioPlayer from "react-audio-player";
import {ReactComponent as IconLike} from "../../assets/liketrack.svg";
import {MusicContext} from "../../context/MusicContext";

export const PlayerAudio = () => {
    const {playMusic, playMusicList, setPlayMusic} = useContext(MusicContext)
    const refPlayer = useRef<any>();
    const [audioController, setAudioController] = useState<any>(null)

    useEffect(()=> {
        if (refPlayer.current && playMusic) {
            // const audio = new Audio(`../${playMusic.path}`)
            // console.log(refPlayer.current.audioEl)
            // setAudioController(audio)
            // audio.play();
        }
    },[playMusic])
    const soundFinished = () => {
        if (playMusic === playMusicList.length-1) {
            setPlayMusic(0)
        } else {
            setPlayMusic((prev: number) => prev+1);
        }
    }
    return (
        playMusicList.length ?<PlayerAudioContainer>

            <><PlayerAudioLogo>
                <PlayerAudioImg>
                    {playMusicList[playMusic].srcImg && <img src={`/${playMusicList[playMusic].srcImg}`} alt=""/>}
                </PlayerAudioImg>


                <BlockText>
                    <PlayerAudioTitle>
                        {playMusicList[playMusic].name}
                    </PlayerAudioTitle>
                    <PlayerAudioText>
                        {playMusicList[playMusic].artistName}
                    </PlayerAudioText>
                </BlockText>
                {/*<BtnLike>*/}
                {/*    <IconLike/>*/}
                {/*</BtnLike>*/}

            </PlayerAudioLogo>

             <ReactAudioPlayer
                style={{marginLeft: 'auto'}}
                ref={(element) => { refPlayer.current = element }}
                src={`/${playMusicList[playMusic].path}`}
                autoPlay={true}
                controls
                onEnded={soundFinished}

            /></>
        </PlayerAudioContainer>: <></>
    )
}