import React from 'react'
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import "./style.scss";

function Home() {
  return (
    <div className='homePage'>
      <HeroBanner />
      <Trending />
    </div>
  )
}

export default Home