import React, { useEffect, useState } from 'react'
import { AiFillCaretLeft,AiFillCaretRight,AiFillPlayCircle,AiFillPauseCircle } from "react-icons/ai";
import data from "../db.json"

import "./CatalogViewer.css";



const Catalog = () => {
    let images=data.Images;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
  
    const handlePrevious = () => {
      setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };
  
    const handleNext = () => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };
  
    const handleThumbnailClick = (index) => {
      setCurrentIndex(index);
      setIsPlaying(false);
    };
  
    useEffect(() => {
      let interval;
      if (isPlaying) {
        interval = setInterval(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
      }
      return () => clearInterval(interval);
    }, [images, isPlaying]);
  

  return (
    <div>

<div className="container">
      <div className="mainContainer">
        <div className="">
          <img
            className="mainImg"
            src={images[currentIndex].src}
            alt={images[currentIndex].caption}
          />
        </div>

        <div className="warpper">
          <div className="arrowcont" onClick={handlePrevious}>
            <AiFillCaretLeft className="arrow" />
          </div>

          <div className="" style={{display:"flex",gap:"5px",width:"100%"}}>
            {images.map((imag, i) => (
              <img 
                className={currentIndex==i?"active":"imagess"}
                width="100%"            
                key={i}
                src={imag.src}
                alt={imag.caption}
                onClick={() => handleThumbnailClick(i)}
              />
            ))}
          </div>

          <div className="arrowcont"  onClick={handleNext}>
            <AiFillCaretRight className="arrow" />
          </div>
        </div>
      </div>

      <div className="bottomImg">          
            
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  
                
                }}
              >
                <h2>{images[currentIndex].caption}</h2>

                <p
                  style={{
                    textAlign: "center",
                    
                    fontSize: "15px",
                  }}
                >
                  {images[currentIndex].desc}
                </p>
              
            </div>
          
        
        <div className="pause">
          <div
            className=""
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <AiFillPauseCircle size="sm" /> : <AiFillPlayCircle size="sm" />}
          </div>
        </div>
      </div>
    </div>  

    </div>
  )
}

export default Catalog