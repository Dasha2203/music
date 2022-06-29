import React from 'react'
import {Img, UploadImgContainer} from "./Style";

export const UploadImg = (
    {handleFileInput, srcImg}: { handleFileInput: (event: any) => void, srcImg: string }
) => {
    return (
        <UploadImgContainer selected={!!srcImg}>
            <Img>
                {srcImg ? <img src={srcImg} alt="selected image"/> : (
                    <>
                        <span>
                            Click to choose image
                        </span>
                        <label htmlFor="file"></label>
                        <input name="file" type="file" id={'file'} onChange={handleFileInput} accept="image/png, image/jpeg"/>
                    </>
                )}
            </Img>
        </UploadImgContainer>
    )
}