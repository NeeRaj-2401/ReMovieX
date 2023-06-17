import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import "./style.scss";

function HeroBanner() {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState("");

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);


    // to change bg image
    const { data, loading } = useFetch('/movie/upcoming')
    useEffect(() => {
        // sample bg = {https://image.tmdb.org/t/p/original} + {/kgATFkG4SDyengNMmCuwmj7igWW.jpg}
        const bg =
            url.backdrop +
            data?.results[Math.floor(Math.random() * 20)].backdrop_path;
        setBackground(bg);
    }, [data])


    // to redirect to search results page
    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            // gives url: localhost:3000/search/query
            navigate(`/search/${query}`);
        }
    }

    return (
        <div className="heroBanner">
            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                    <div className="heroBannerContent">
                        <span className="title">Welcome.</span>
                        <span className="subTitle">Millions of movies, TV shows and people to discover. Explore Now.</span>
                        <div className="searchInput">
                            <input type="text" placeholder='Search for movie or TV show...' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
                            <button>Search</button>
                        </div>
                    </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner;