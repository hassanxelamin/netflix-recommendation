import React, { useState, useEffect } from 'react'
import SliderItem from './slider-item';

const Slider = () => {

  const [images, setImages] = useState([]);
  
  const [selectedMovie, setSelectedMovie] = useState("Batman Begins");
  
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

  return (
    <section className='w-full flex justify-center items-center'>
      <div id="container" data-name="container" className='w-full flex flex-col justify-center py-20'>
        <div className='text-white font-bold text-[2.5rem] pb-3 pl-4'>Matched to You</div>

        <div id="slider-container" className='flex justify-between w-screen'>
          <div className='z-50'>Arrow</div>
          <div id="slider" data-name="slider" className='flex gap-x-2 translate-x-[-100%]'>
            {images.map((image, index) => (
              <SliderItem key={index} index={index} image={image} />
              ))}
          </div>
          <div className='z-50'>Arrow</div>
        </div>

      </div>
    </section>
  )
}

export default Slider