import React, { useState } from 'react'

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";

function Popular() {
    const [mediaType, setMediaType] = useState("movie");

    const { data, loading } = useFetch(`/${mediaType}/popular`);

    const onTabChange = (tab) => {
        setMediaType(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                mediaType={mediaType}
            />
        </div>
    );
}

export default Popular