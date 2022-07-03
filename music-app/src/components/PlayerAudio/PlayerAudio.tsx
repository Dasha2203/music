import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BlockText,
  PlayerAudioContainer,
  PlayerAudioImg,
  PlayerAudioLogo,
  PlayerAudioText,
  PlayerAudioTitle,
} from "./Style";
import { MusicContext } from "../../context/MusicContext";
import {AudioControls} from "./AudioControls";

export const PlayerAudio = () => {
  const { playMusic, playMusicList, setPlayMusic } = useContext(MusicContext);
  // const refPlayer = useRef<any>();
  const [trackProgress, setTrackProgress] = useState(0);
  const [audioController, setAudioController] = useState<any>(null);
  const [isPlay, setIsPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<any>();
  const [duration, setDuration] = useState<any>();
  const isReady = useRef(false);3



  useEffect(()=> {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', (e:any) => {
        console.log(e.target.duration);
        setDuration(e.target.duration);
      });
    }
  })



  // audioRef.current.onloadedmetadata = (e:any ) => {
  //   console.log('hrhrhrhrh', audioRef.current.duration)
  //   if (audioRef.current.readyState > 0) {
  //     // var minutes = "0"+parseInt(audioRef.current.duration / 60, 10);
  //     // var seconds = "0"+parseInt(audioRef.current.duration % 60);
  //     // setDuration(minutes + ":" + seconds.slice(-2))
  //   }
  // }

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);


    if(audioRef.current) {

      intervalRef.current = setInterval(() => {
        if (audioRef.current!.ended) {
          // toNextTrack();
          soundFinished();
        } else {
          setTrackProgress(audioRef.current!.currentTime);
        }
      }, 1000);
    }
  };


  useEffect(()=> {
    if(audioRef.current) {

      // ret
      setDuration(audioRef.current.duration)
      console.log('dasha duration', duration)
    }
  },[audioRef])

  useEffect(() => {
    if (playMusic || playMusic === 0) {
      if (audioRef.current) {
        audioRef.current.pause();
      }



      audioRef.current = new Audio('/' + playMusicList[playMusic].path)
      setTrackProgress(audioRef.current.currentTime);
      console.log('duration', audioRef.current.duration)

      console.log('rfffaf', audioRef.current.currentTime)



      if (isReady.current) {
        audioRef.current.play();
        setIsPlay(true);
        startTimer();
      } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
      }
    }
  },[playMusic]);

  useEffect(() => {
    console.log('rfffaf', isPlay)
    if (!audioRef.current) return;
    if (isPlay) {

      audioRef.current.play();

      // refPlayer.current.audioEl.play();
      // startTimer();
    } else {
      // refPlayer.current.audioEl.pause();
      audioRef.current.pause();
    }
  }, [isPlay]);

  const soundFinished = () => {
    if (playMusic === playMusicList.length - 1) {
      setPlayMusic(0);
    } else {
      setPlayMusic((prev: number) => prev + 1);
    }
  };

  const prevMusic = () => {
    if (playMusic === 0) {
      setPlayMusic( playMusicList.length - 1);
    } else {
      setPlayMusic((prev: number) => prev - 1);
    }
  };



  const turnPlayActiveMusic = () => {
    console.log('click', playMusic)

    if(!audioRef.current) return;

    if (isPlay) {
      audioRef.current.pause();


      setIsPlay(false)
    } else {
      setDuration(audioRef.current.duration);
      audioRef.current.play();
      console.log('here')
      setIsPlay(true)
    }
  }
  return playMusicList.length ? (
    <PlayerAudioContainer>
      <>
        <PlayerAudioLogo>
          <PlayerAudioImg>
            {playMusicList[playMusic].srcImg && (
              <img src={`/${playMusicList[playMusic].srcImg}`} alt="" />
            )}
          </PlayerAudioImg>

          <BlockText>
            <PlayerAudioTitle>{playMusicList[playMusic].name}</PlayerAudioTitle>
            <PlayerAudioText>
              {playMusicList[playMusic].artistName}
            </PlayerAudioText>
          </BlockText>
        </PlayerAudioLogo>
        <AudioControls
            isPlay={isPlay}
            isShuffle={false}
            turnPlayMusic={turnPlayActiveMusic}
            next={soundFinished}
            prev={prevMusic}
            duration={duration}
            audio={audioRef.current}
        />
      </>
    </PlayerAudioContainer>
  ) : null;
};
