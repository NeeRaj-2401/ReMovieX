import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import './style.scss';


import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";


const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // handling unecessary scrolls when changing the page via clicks
  useEffect(() => {
    window.scrollTo(0,0)
  }, [location])
  
  //(we are toggling the visibility of navbar component with "show" state)
  const controlNavbar = () => {
    // console.log(window.scrollY)
    if(window.scrollY > 200){
      // condition to check if user is scrolling towards down 
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide");
      }
      else{
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    }else{
      setShow("top");
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    // its necessary to remove the eventlistner added, to avoid memory leak
    return () => {window.removeEventListener("scroll", controlNavbar); }
  }, [lastScrollY])
  

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  // to redirect to search results page
  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      // gives url: localhost:3000/search/query
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false)
      }, 1000);
    }
  }

  const navigateHandler = (type) => {
    if (type == "movie") {
      navigate('/explore/movie');
    } else {
      navigate('/explore/tv');
    }
    setMobileMenu(false)
  }

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigateHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigateHandler("tv")} >TV Shows</li>
          <li className="menuItem"> <HiOutlineSearch onClick={openSearch} /> </li>
        </ul>

        {/* mobile menu section */}
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {
            mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />
          }
        </div>
      </ContentWrapper>

      {/* Search Bar below nav when clicked */}
      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input type="text" placeholder='Search for movie or TV show...' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}

    </header>
  );
};

export default Header;
