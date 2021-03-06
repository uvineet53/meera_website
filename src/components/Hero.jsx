import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import styled, { css } from "styled-components/macro";
import { Button, SliderButton } from "./Button";
import ReactTypingEffect from "react-typing-effect";

const HeroSection = styled.section`
  height: 100vh;
  max-height: 1100px;
  position: relative;
  overflow: hidden;
  transition: 0.5s ease-in-out;
`;

const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const HeroSlide = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  transition: 0.5s ease-in;
  opacity: ${({ active }) => (active ? "1" : "0")};
`;

const HeroSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  filter: brightness(0.5);
  transform: scale(1.1);
  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    bottom: 0vh;
    left: 0vh;
    overflow: hidden;
    opacity: 0.4;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

const HeroContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  left: 10vw;
  flex-direction: column;
  max-width: 1600px;
  width: calc(100%-100px);
  color: #fff;

  h1 {
    font-size: clamp(3rem, 8vw, 4rem);
    font-weight: 400;
    text-transform: uppercase;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    text-align: left;
    margin-bottom: 0.8rem;
  }

  p {
    margin-bottom: 1.2rem;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
  }
`;

const MainContent = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  left: 10vw;
  flex-direction: row;
  max-width: 1600px;
  width: calc(100%-100px);
  color: #fff;

  h1 {
    font-size: clamp(1.5rem, 8vw, 4rem);
    font-weight: 400;
    margin-right:.4rem;
    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
    text-align: left;
    margin-bottom: 0.8rem;
  }
`;
const TagText = styled(ReactTypingEffect)`
  color: #fff;
  font-size: clamp(1.5rem, 8vw, 4rem);
`;

const Arrow = styled(IoMdArrowRoundForward)`
  margin-left: 0.5rem;
`;

const SliderButtons = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  z-index: 10;
`;

const arrowButtons = css`
  width: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
  background: #0D0D26;
  border-radius: 50px;
  padding: 10px;
  margin-right: 1rem;
  user-select: none;
  transition: 0.3s;
  &:hover {
    background: #130C40;
    transform: scale(1.05);
  }
`;

const PrevArrow = styled(IoArrowBack)`
  ${arrowButtons}
`;

const NextArrow = styled(IoArrowForward)`
  ${arrowButtons}
`;

const Hero = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);
  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === length - 1 ? 0 : current + 1);
    console.log(current);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setCurrent(current === 0 ? length - 1 : current - 1);
    console.log(current);
  };

  //   useEffect(() => {
  //     const nextSlide = () => {
  //       setCurrent((current) => (current === length - 1 ? 0 : current + 1));
  //     };
  //     timeout.current = setTimeout(nextSlide, 3000);
  //     return function () {
  //       if (timeout.current) {
  //         clearTimeout(timeout.current);
  //       }
  //     };
  //   }, [current, length]);

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <HeroSection>
      <HeroWrapper>
        {slides.map((slide, index) => {
          return (
            <HeroSlide key={index} active={index === current ? true : false}>
              {index === current && (
                <HeroSlider>
                  <HeroImage src={slide.image} alt={slide.alt} />
                  {slide.alt == "Main" ? (
                    <MainContent>
                      <h1 style={{color: "#6DDAF2"}}>{slide.title}</h1>
                      <TagText text={[...slide.tags]} eraseDelay={2000} typingDelay={1500} eraseSpeed={100} speed={100}/>
                    </MainContent>
                  ) : (
                    <HeroContent>
                      <h1>{slide.title}</h1>
                      <p>{slide.description}</p>
                      <SliderButton
                        primary="true"
                        href={slide.path}
                        css={`
                          max-width: 160px;
                        `}
                      >
                        {slide.label}
                        <Arrow />
                      </SliderButton>
                    </HeroContent>
                  )}
                </HeroSlider>
              )}
            </HeroSlide>
          );
        })}
        <SliderButtons>
          <PrevArrow onClick={prevSlide} />
          <NextArrow onClick={nextSlide} />
        </SliderButtons>
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
