import { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const fadeInHero = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const fadeOutHero = keyframes`
    from {
        opacity: 1;
    } to {
        opacity: 0;
    }
`;

const CarouselContainer = styled.div`
  height: 300px;
  width: 35rem;
  margin: 1rem auto;
  display: flex;
  align-items: center;

  @media (max-width: 500px) {
    width: 100%;
  }

  svg {
    color: var(--button-red);
    cursor: pointer;
    font-size: 2rem;
    transition: all 0.3s ease-in-out;
  }

  svg:hover {
    transform: scale(1.1);
  }

  img {
    width: 80%;
    margin: 0 auto;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    animation: ${fadeInHero} 0.8s ease-in-out;
  }

  #hero-image.fade-out {
    animation: ${fadeOutHero} 0.8s ease-in-out;
  }
`;

export default function Carousel({ images }: { images: string[] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(() => {
    const heroImage = document.querySelector("#hero-image") as HTMLImageElement;
    heroImage.classList.add("fade-out");
    setTimeout(() => {
      if (currentImage === images.length - 1) {
        setCurrentImage(0);
      } else {
        setCurrentImage(currentImage + 1);
      }
      heroImage.classList.remove("fade-out");
    }, 800);
  }, [currentImage, images]);

  const handlePrev = useCallback(() => {
    const heroImage = document.querySelector("#hero-image") as HTMLImageElement;
    heroImage.classList.add("fade-out");
    setTimeout(() => {
      if (currentImage === 0) {
        setCurrentImage(images.length - 1);
      } else {
        setCurrentImage(currentImage - 1);
      }
      heroImage.classList.remove("fade-out");
    }, 800);
  }, [currentImage, images]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [handleNext, currentImage]);

  return (
    <CarouselContainer>
      <ArrowBackIos onClick={handlePrev} />
      <img
        id="hero-image"
        src={images[currentImage]}
        loading="eager"
        alt="a meal"
      />
      <ArrowForwardIos onClick={handleNext} />
    </CarouselContainer>
  );
}
