import React, { useEffect, useRef, useState } from 'react'
import { register } from "swiper/element/bundle";
import "./Container4.css"
import { container4 } from '../JsonData';
import VideoCard from '../../GlobalComponent/VideoCard';
import ModalReact from "../../GlobalComponent/ProjectDetails/ProjectDetails"
import ProjectDetails from '../../GlobalComponent/ProjectDetails/ProjectDetails';
import { Modal } from 'react-bootstrap';
function Container4() {
    const swiperRef = useRef(null);
    const [modalShow, setModalShow] = useState(false);
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
    const [showdata,setShowData]=useState();
    const ShowProjectDetail =(data)=>{
        setShowData(data)
        setModalShow(true)
    }
    return (
        <section className='ed-internship-main-container-6' id='Projects'>
       {showdata &&(
          <Modal
         show={modalShow}
         onHide={() => setModalShow(false)}
      size="lg"
      className='modal-custom-react'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className='change-color'>
        <span className='close-btn' onClick={()=>setModalShow(false)} ><i class="fa-solid fa-circle-xmark"></i></span>
      <ProjectDetails data={showdata} />

      </Modal.Body>
    
    </Modal>
    )}
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
                                        <VideoCard result={res} ShowProjectDetail={ShowProjectDetail} />
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
