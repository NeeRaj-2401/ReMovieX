import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";

function Carousel({ data, loading }) {

  const carouselContainer = useRef();
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const navigation = (direction) => {
    const container = carouselContainer.current;

    const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    })
  }

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ?
          (
            <div className="carouselItems"
            ref={carouselContainer} >
              {data?.map((item) => {

                const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                return (
                  <div className="carouselItem" key={item.id}>
                    <div className="posterBlock">
                      <Img src={posterUrl} />
                      <CircleRating
                        rating={item.vote_average.toFixed(1)} //toFixed(1) sending only one digit after decimal
                      />
                    </div>
                    <div className="textBlock">
                      <span className="title">
                        {item.title || item.name}
                      </span>
                      <span className="date">
                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          )
          :
          (
            <div className="loadingSkeleton">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}
      </ContentWrapper>
    </div>
  )
}

export default Carousel