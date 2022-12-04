import React, {useEffect, useState} from 'react';
import {motion, useTransform, useMotionValue} from 'framer-motion';
import './App.css';

function App() {
  const [mouseCoords, setMouseCoords] = useState({x:0 , y:0}); //realTime mouse coordinates
  const [globalMouseCoords, setGlobalMouseCoords] = useState({x: 0, y: 0}); //realTime mouse coordinates globally for comparison
  const [carCoords, setCarCoords] = useState({x: 0, y: 0}); //last added coordinate
  const [carPoint, setCarPoint] = useState({x:0 , y:0}); //realtime car coordinates
  const [carCorrection] = useState({x:-12 , y:-20}); //correction for setting mouse on the middle of the car
  const [carAngle, setCarAngle] = useState(0) //car angle
  const [carAnimationVariables, setCarAnimationVariables] = useState({})

  const radians_to_degrees = (rad) =>{
    return rad * (180.0 / Math.PI);
  }
          
console.log(radians_to_degrees(0.7853981633974483));
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
    handleCarMove()
  };
  const handleCarMove = () => {
    const angle = radians_to_degrees(Math.atan(((-(carCoords.y - 270)) - (-(mouseCoords.y - 270)))/((carCoords.x - 480) - (mouseCoords.x - 480))));
    console.log(angle)
    if(angle !== 0 && angle){
      setCarAngle(angle)
    }
    setCarPoint({
      x: (mouseCoords.x + carCorrection.x),
      y: (mouseCoords.y + carCorrection.y),
    })
    setCarCoords({
      x: mouseCoords.x -480,
      y: -(mouseCoords.y -270),
    })
    setCarAnimationVariables({
      ...carPoint,
      type: "inertia",
    })
  };
  const carTransition = {
    type: "intertia",
    duration: .2,
  }
  
  return (
    <>
      <h2>Coords: {mouseCoords.x} {mouseCoords.y}</h2>
      <h2>Global coords: {globalMouseCoords.x} {globalMouseCoords.y}</h2>
      <h2>Car coords: {carCoords.x} {carCoords.y}</h2>
      <h2>Car angle: {carAngle}</h2>
      <motion.div className="carEnvironment" onMouseMove={handleMouseMove}>
        <motion.img animate={carAnimationVariables} transition={carTransition} className="carImg" src='assets/car.webp' alt='car' />
        <motion.img className="trackImg" src='assets/pista1.webp' alt='track'/>
      </motion.div>
    </>
  );
}

export default App;