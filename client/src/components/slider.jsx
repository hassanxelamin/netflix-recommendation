import React, { useState, useEffect } from 'react'
import SliderItem from './slider-item';

const Slider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(29.7);
  const [selectedMovie, setSelectedMovie] = useState("Batman Begins");
  const [middleIndex, setMiddleIndex] = useState(1);

  const gapSizeRem = 0.5;
  const rootFontSize = 10;
  const gapSizePixels = gapSizeRem * rootFontSize;
  const viewportWidth = window.innerWidth;
  const gapSizePercentage = (gapSizePixels / viewportWidth) * 100;
  const totalMovePerItem = 15 + gapSizePercentage;
  
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recommendations/${selectedMovie}`);
        const data = await response.json();

        const clonedStart = data.posters.slice(0, 30); 
        const clonedEnd = data.posters.slice(-30);
        const loopedImages = [...clonedEnd, ...data.posters, ...clonedStart];

        setImages(loopedImages);
        // setCurrentIndex(5.7);

      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    fetchRecommendations();
  }, [selectedMovie]);

  const handleLeftClick = () => {
    // Update currentIndex as usual
    let newIndex = currentIndex - 6;
  
    // Check if we need to update the content for infinite effect
    if (newIndex <= 30) { // 30 is the number of duplicated items
      // Cycle content from end to start
      let updatedImages = [...images];
      for (let i = 0; i < 30; i++) {
        updatedImages[i] = images[images.length - 30 + i];
      }
      setImages(updatedImages);
    }
  
    setCurrentIndex(newIndex);
  };

const handleRightClick = () => {
  // Update currentIndex as usual
  let newIndex = currentIndex + 6;

  // Check if we need to update the content for infinite effect
  if (newIndex >= images.length - 30) { // 30 is the number of duplicated items
    // Cycle content from start to end
    let updatedImages = [...images];
    for (let i = 0; i < 30; i++) {
      updatedImages[images.length - 30 + i] = images[i];
    }
    setImages(updatedImages);
  }

  setCurrentIndex(newIndex);
};

  // Calculate the transform value based on the current index
  const transformValue = -(totalMovePerItem * currentIndex);


  return (
    <section className='w-full flex justify-center items-center'>

      <div id="container" data-name="container" className='w-full flex flex-col justify-center py-20'>

        <div className='text-white font-bold text-[2.5rem] pb-3 pl-4'>Matched to You</div>

        <div id="slider-container" className='flex justify-between w-screen'>

          <button id="left-handle" onClick={handleLeftClick} className='z-50 min-w-[5rem] flex justify-center items-center border-none rounded-tr rounded-br'>
            Arrow
          </button>

          <div id="slider" data-name="slider" style={{ transform: `translateX(${transformValue}%)` }} className={`flex gap-x-2 transition ease-in-out delay-150`}>
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