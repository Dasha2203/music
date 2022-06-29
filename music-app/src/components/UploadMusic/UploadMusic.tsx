import React from 'react'
import {Img, UploadMusicContainer} from "./Style";

export const UploadMusic = (
    {handleFileInput, nameMusic, error}: { handleFileInput: (event: any) => void, nameMusic: string, error: string }
) => {
    return (
        <UploadMusicContainer selected={!!nameMusic} error={!!error}>
            <Img>
                {nameMusic ? (
                    <span>
                        {nameMusic}
                    </span>) : (
                    <>
                        <span>
                            Click to choose music
                        </span>
                        <label htmlFor="file"></label>
                        <input name="file" type="file" id={'file'} onChange={handleFileInput}
                               accept="audio/*"/>
                    </>
                )}
            </Img>
        </UploadMusicContainer>
    )
}