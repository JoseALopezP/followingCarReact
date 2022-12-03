import React, {useEffect, useState} from 'react';
import {motion, useTransform, useMotionValue} from 'framer-motion';
import './App.css';

function App() {
  const [mouseCoords, setMouseCoords] = useState({x:0 , y:0});
  const [globalMouseCoords, setGlobalMouseCoords] = useState({x: 0, y: 0});
  const [carCoords, setCarCoords] = useState({x: 0, y: 0});
  const [carPoint, setCarPoint] = useState({x:0 , y:0});

  
  useEffect(() => {
    const handleWindowMouseMove = event => {
      setGlobalMouseCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
   
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);
  const handleMouseMove = event => {
    setMouseCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
    setCarPoint({
      x:mouseCoords.x,
      y:mouseCoords.y,
    })
  };
  const handleCarMove = event => {
    setCarCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };
  
  return (
    <>
      <h2>Coords: {mouseCoords.x} {mouseCoords.y}</h2>
      <h2>Global coords: {globalMouseCoords.x} {globalMouseCoords.y}</h2>
      <h2>Car coords: {carCoords.x} {carCoords.y}</h2>
      <motion.div className="carEnvironment" onMouseMove={handleCarMove}>
        <motion.img animate={carPoint} className="carImg" src='assets/car.webp' alt='car' onMouseMove={handleMouseMove}/>
        <motion.img className="trackImg" src='assets/pista1.webp' alt='track'/>
      </motion.div>
    </>
  );
}

export default App;