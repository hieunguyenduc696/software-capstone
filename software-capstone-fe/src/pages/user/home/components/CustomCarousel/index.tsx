import React from 'react';
import { Carousel } from 'antd';
import { styled } from "styled-components";
import styles from './CustomCarousel.module.css'


const StyledCarousel = styled(Carousel)`
   > .slick-dots li button {
   display: none !important;
  },
  > .ant-image {
      display: none !important;
  }
`

const btn = {
    PREV: 'prev',
    NEXT: 'next'
}

const CustomeCarousel: React.FC = () => {
    const carouselRef = React.createRef() as any;

    const slides = [
        'slide.png',
        'https://i.pinimg.com/564x/aa/ea/12/aaea12e1c3a5a1ed35dbd87c3f15f45e.jpg',
        'https://i.pinimg.com/564x/c0/1f/71/c01f719490b79c02ede76db8687e8a67.jpg',
        'https://i.pinimg.com/564x/6f/2c/00/6f2c00585b1183995fd0690fff0ccc6b.jpg'
    ]

    const handleBtnClick = (type = btn.NEXT) => {
        if (carouselRef.current) {
            type === btn.PREV ? carouselRef.current.prev() : carouselRef.current.next();
        }
    }

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div style={{ position: 'relative' }}>
            <StyledCarousel afterChange={onChange} ref={carouselRef}>
                {slides.map((i, index) => <div key={index}><div
                    style={{
                        margin: 0,
                        height: '300px',
                        backgroundImage: `url('${i}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></div></div>)}
            </StyledCarousel>
            <img alt='' src='left.png' className={`${styles.btn} ${styles.left}`} onClick={() => handleBtnClick(btn.PREV)} />
            <img alt='' src='right.png' className={`${styles.btn} ${styles.right}`} onClick={() => handleBtnClick(btn.NEXT)} />
        </div>
    );
};

export default CustomeCarousel;