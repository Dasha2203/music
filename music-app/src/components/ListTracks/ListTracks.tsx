import React, {useContext, useState} from 'react';
import {
    AdminButton,
    AdminTrackButtons,
    ListContainer,
    ListTitle,
    ListTrackCell,
    ListTrackContainer,
    ListTrackImg,
    ListTrackRow
} from "./S.el";
import {TrackItem} from "../TrackItem/TrackItem";
import {ReactComponent as PlayIcon} from "../../assets/play.svg";
import {MusicContext} from "../../context/MusicContext";
import {ReactComponent as IconTrash} from "../../assets/trash.svg";
import {ReactComponent as IconText} from "../../assets/text.svg";
import {ModalText} from "../Modals/ModalText";
import {ReactComponent as IconLike} from "../../assets/like.svg";
import {AppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";


type Text = {
    name: string,
    text: string
}
export const ListTracks = ({
                               items,
                               remove,
                               like,
                               removeCustom
                           }: { items: any, remove?: (id: number) => void,removeCustom?:(idTrack: number) => void, like: (id: number) => void }) => {
    const {isAdmin, userInformation} = useContext(AppContext)
    const {setPlayMusic, setPlayMusicList, favorites} = useContext(MusicContext);
    const [showText, setShowText] = useState<Text | null>(null);
    const navigate = useNavigate()
    const handleClickMusic = (idx: number) => {
        setPlayMusicList(items)
        setPlayMusic(idx)
    }

    return (
        <ListContainer>
            <ListTitle>Popular songs</ListTitle>
            <ListTrackContainer>
                <ListTrackRow className={"header"}>
                    <ListTrackCell>
                        #
                    </ListTrackCell>
                    <ListTrackCell>
                        title
                    </ListTrackCell>
                    <ListTrackCell>
                        artist
                    </ListTrackCell>
                    {/*<ListTrackCell>*/}
                    {/*    album*/}
                    {/*</ListTrackCell>*/}
                    {/*<ListTrackCell>*/}
                    {/*    time*/}
                    {/*</ListTrackCell>*/}
                </ListTrackRow>
                {items.map((item: any, idx: number) => <ListTrackRow key={idx} onClick={() => handleClickMusic(idx)}>
                        <ListTrackCell>
                            {idx + 1}
                        </ListTrackCell>
                        <ListTrackCell>
                            <ListTrackImg>
                                <PlayIcon className={"play"}/>
                                {item.srcImg &&
                                    <img src={`/${item.srcImg}`} alt="track image"/>
                                }
                            </ListTrackImg>
                            {(item as any).name}
                        </ListTrackCell>
                        <ListTrackCell>
                            {(item as any).artistName}
                        </ListTrackCell>
                        {/*<ListTrackCell className={'opacity'}>*/}
                        {/*    Flleetwood Mac*/}
                        {/*</ListTrackCell>*/}
                        {/*<ListTrackCell className={'opacity'}>*/}
                        {/*    {item.time}*/}
                        {/*</ListTrackCell>*/}

                            <AdminTrackButtons>
                                <AdminButton onClick={(e) => {
                                    e.stopPropagation();
                                    if (!userInformation) navigate('/login')
                                    like(item.id)
                                }}>
                                    <IconLike className={!!favorites.find(i=>i.id = item.id) ? 'like like-active' : 'like'}/>
                                </AdminButton>

                                {item.text && (
                                    <AdminButton onClick={(e) => {
                                        e.stopPropagation();
                                        setShowText({text: item.text, name: item.name});
                                    }}>
                                        <IconText className="text"/>
                                    </AdminButton>
                                )}

                                {
                                    isAdmin && <> {
                                        removeCustom ?
                                            <AdminButton onClick={(e) =>{ e.stopPropagation(); removeCustom(item.id)}}>
                                                <IconTrash className="trash"/>
                                            </AdminButton> :
                                        remove ?
                                    <AdminButton onClick={(e) => { e.stopPropagation(); remove(item.id)}}>
                                        <IconTrash className="trash"/>
                                    </AdminButton> : null}
                                </>
                                }
                            </AdminTrackButtons>

                    </ListTrackRow>
                )}


                <TrackItem/>
            </ListTrackContainer>

            {showText && <ModalText onClose={() => setShowText(null)} title={showText.name} text={showText.text}/>}
        </ListContainer>
    )
}