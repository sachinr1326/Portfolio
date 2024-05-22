import React, { useEffect, useRef } from 'react'
import { register } from "swiper/element/bundle";
import "./Container4.css"
import { container4 } from '../JsonData';
import VideoCard from '../../GlobalComponent/VideoCard';
function Container4() {
    const swiperRef = useRef(null);

    useEffect(() => {
        // Register Swiper web component
        register();

        // Object with parameters

        const params11 = {
            navigation: "true",
            breakpoints: {
                200: {
                    slidesPerView: 1,
                },
                700: {
                    slidesPerView: 3,
                },
                1000: {
                    slidesPerView: 4,
                },
            },
        };
        // Assign it to swiper element
        Object.assign(swiperRef.current, params11);

        // initialize swiper
        swiperRef.current.initialize();
    }, []);
    return (
        <section className='ed-internship-main-container-6' id='Projects'>
            <div className="ed-internship-22-container-6 ">
                <div className="ed-internship-22-common-container">
                    <div className="section-1">
                        <h3 className="title">
                            {container4.title}
                        </h3>
                        <div className="community-sec">
                            <swiper-container
                                init="false"
                                ref={swiperRef}
                                indicators={true}
                                navigation="true"
                            >
                                {container4.video_card.map((res, index) => (
                                    <swiper-slide key={index}>
                                        <VideoCard result={res} />
                                    </swiper-slide>
                                ))}
                            </swiper-container>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Container4
