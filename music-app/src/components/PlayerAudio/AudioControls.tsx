import React, {useEffect, useMemo, useRef, useState} from "react";

import {AudioControlsButton, AudioControlsContainer, BtnsContainer, Progress, ProgressContainer} from "./Style";

import {ReactComponent as Pause} from "../../assets/playerControls/pause.svg";
import {ReactComponent as Play} from "../../assets/playerControls/play.svg";
import {ReactComponent as Prev} from "../../assets/playerControls/prev.svg";
import {ReactComponent as Next} from "../../assets/playerControls/next.svg";
import {ReactComponent as Repeat} from "../../assets/playerControls/repeat.svg";
import {ReactComponent as Shuffle} from "../../assets/playerControls/shuffle.svg";
import {ReactComponent as Like} from "../../assets/like.svg";

interface Controls {
    isPlay: boolean;
    isShuffle: boolean;
    turnPlayMusic: () => void;
    next: () => void;
    prev: () => void;
    duration: number;
    audio: HTMLAudioElement | null;
}

export const AudioControls = ({ isPlay, isShuffle, turnPlayMusic, next, prev, duration, audio}: Controls) => {
    const intervalRef = useRef<any>();
    const [trackProgress, setTrackProgress] = useState(0);
    const [currentPercentage, setCurrentPercentage] = useState(0);

    const progressTime = useMemo(()=> {
        let minutes = formatTime(Math.floor(trackProgress / 60));
        let seconds = formatTime(Math.floor(trackProgress % 60));

        return `${minutes} : ${seconds}`;
    },[trackProgress]);

    const durationTime = useMemo(()=> {
        let minutes = formatTime(Math.floor(duration / 60));
        let seconds = formatTime(Math.floor(duration % 60));

        return `${minutes} : ${seconds}`;
    },[duration]);


    useEffect(()=> {
        let currentPercentage = (trackProgress/duration)*100;
        setCurrentPercentage(currentPercentage);
    }, [trackProgress, duration]);

    useEffect(()=> {
        if (!audio) return;
        setTrackProgress(audio.currentTime);
        startTimer();
    },[audio]);

    function startTimer() {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        if (!audio) return;

        intervalRef.current = setInterval(() => {
            if (audio.ended) {
                next();
            } else {
                setTrackProgress(audio.currentTime);
            }
        }, 1000);
    }

    function onScrub(value: any) {
        // Clear any timers already running
        if(!audio) return;

        clearInterval(intervalRef.current);
        audio.currentTime = value;
        setTrackProgress(audio.currentTime);
    }

    function formatTime(number: number) {
        if (number < 10) {
            return `0${number}`
        }

        return number;
    }

    function onScrubEnd() {
        // If not already playing, start
        if (!isPlay) {
            // setIsPlay(true);
        }

        startTimer();
    }

    return (
        <AudioControlsContainer>
            <BtnsContainer>
                <AudioControlsButton>
                    <Like/>
                </AudioControlsButton>
                <AudioControlsButton onClick={prev}>
                    <Prev/>
                </AudioControlsButton>
                {isPlay && (
                    <AudioControlsButton onClick={turnPlayMusic}>
                        <Pause/>
                    </AudioControlsButton>
                )}

                {!isPlay && (
                    <AudioControlsButton onClick={()=>{turnPlayMusic();startTimer();}}>
                        <Play/>
                    </AudioControlsButton>
                )}
                <AudioControlsButton onClick={next}>
                    <Next/>
                </AudioControlsButton>
                {isShuffle && (
                    <AudioControlsButton>
                        <Shuffle/>
                    </AudioControlsButton>
                )}
                {!isShuffle && (
                    <AudioControlsButton>
                        <Repeat/>
                    </AudioControlsButton>
                )}
            </BtnsContainer>

            <ProgressContainer>
                <span className={"current-progress"}>{progressTime}</span>
                <span className={"duration-progress"}>{durationTime}</span>

                <Progress
                    percentageValue={currentPercentage}
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                />
            </ProgressContainer>

        </AudioControlsContainer>
    )
}