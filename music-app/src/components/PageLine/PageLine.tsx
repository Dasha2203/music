import React from 'react'
import {
    PageLineAlbums,
    PageLineContainer,
    PageLineDescription,
    PageLineLink,
    PageLineShowAll, PageLineSubtitle,
    PageLineText,
    PageLineSubtitleText
} from "./S.el";

type Props = {
    children: React.ReactNode,
    description?: string;
    title: string,
    link: string
}

export const PageLine = ({children, description, title, link}: Props) => {
    return (
        <PageLineContainer>
            <PageLineLink href={link}>
                <PageLineSubtitle>
                    <PageLineSubtitleText>
                        {title}
                    </PageLineSubtitleText>
                    <PageLineShowAll>
                        VIEW ALL
                    </PageLineShowAll>
                </PageLineSubtitle>

                {description && (
                    <PageLineDescription>
                        <PageLineText>
                            {description}
                        </PageLineText>
                    </PageLineDescription>
                )}
            </PageLineLink>
            <PageLineAlbums>
                {children}
            </PageLineAlbums>
        </PageLineContainer>
    )
}