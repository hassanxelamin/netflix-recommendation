import React, { useState, useEffect } from 'react'
import SliderItem from './slider-item';

const Slider = () => {

  const [images, setImages] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState("Batman Begins");
  const [translateX, setTranslateX] = useState(0);
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recommendations/${selectedMovie}`);
        const data = await response.json();
        setImages(data.posters); 
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [selectedMovie]);

  const handleLeftClick = () => {
    setTranslateX(translateX + 100);
  }
  

  const handleRightClick = () => {
    setTranslateX(translateX - 100);
  }

  return (
    <section className='w-full flex justify-center items-center'>
      <div id="container" data-name="container" className='w-full flex flex-col justify-center py-20'>
        <div className='text-white font-bold text-[2.5rem] pb-3 pl-4'>Matched to You</div>
        <div id="slider-container" className='flex justify-between w-screen'>
          <button id="left-handle" onClick={handleLeftClick} className='z-50 min-w-[5rem] flex justify-center items-center border-none rounded-tr rounded-br'>
            Arrow
          </button>
          <div id="slider" data-name="slider" style={{ transform: `translateX(${translateX}%)` }} className={`flex gap-x-2 transition ease-in-out delay-150`}>
            {images.map((image, index) => (
              <SliderItem key={index} index={index} image={image} />
              ))}
          </div>
          <button id="right-handle" onClick={handleRightClick} className='z-50 min-w-[5rem] flex justify-center items-center border-none rounded-tl rounded-bl'>
              Arrow
          </button>
        </div>

      </div>
    </section>
  )
}

export default Slider