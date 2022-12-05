import React, {useEffect, useState} from 'react';
import {motion, useTransform, useMotionValue} from 'framer-motion';
import outsideHitbox from './hitbox/outsideHitbox';
import insideHitbox from './hitbox/insideHitbox';
import './App.css';

function App() {
  const [mouseCoords, setMouseCoords] = useState({x:0 , y:0}); //realTime mouse coordinates
  const [globalMouseCoords, setGlobalMouseCoords] = useState({x: 0, y: 0}); //realTime mouse coordinates globally for comparison
  const [carCoords, setCarCoords] = useState({x: 0, y: 0}); //last added coordinate
  const [carPoint, setCarPoint] = useState({x:0 , y:0}); //realtime car coordinates
  const [carCorrection, setCarCorrection] = useState({x:0 , y:0}); //correction for setting mouse on the middle of the car
  const [carAngle, setCarAngle] = useState(0) //car angle
  const deadZone = 30;
  const [carTransitionVariables, setCarTransitionVariables] = useState({})
  const [carAnimationVariables, setCarAnimationVariables] = useState({})

  const radians_to_degrees = (rad) =>{
    return (rad * 180.0 / Math.PI);
  }
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
  const setCarCoordsFunc = async() =>{
    const oldAngle = carAngle;
      const angle = radians_to_degrees(Math.atan2((carPoint.y - mouseCoords.y - carCorrection.y),(carPoint.x - mouseCoords.x - carCorrection.x)));
      if(angle !== 0 && angle){
        if(Math.abs(carAngle - oldAngle)  > 40){
            await setTimeout(() => {
              setCarAngle((carAngle - oldAngle)/ 4)
            }, 20)
        }else{
          setCarAngle(angle)
        }
      }
    setTimeout(() => {
      setCarCoords({
        x: mouseCoords.x -480,
        y: -(mouseCoords.y -270),
      })
    }, 200)
    correction()
    setTimeout(() => {
      setCarPoint({
        x: (mouseCoords.x + carCorrection.x),
        y: (mouseCoords.y + carCorrection.y),
      })
    }, 200)
  }

  const correction = () =>{
    const cor = -12.875
    const x = Math.abs(Math.sin(carAngle)) * cor
    const y = Math.abs(Math.cos(carAngle)) * cor
    setCarCorrection({
      x: x,
      y: y
    })
  }

  const getDistance = (coords1, coords2) =>{
    return Math.sqrt((coords1.x - coords2.x)**2 + (coords1.y - coords2.y)**2)
  }

  const handleCarMove = () => {
    if(getDistance(mouseCoords, carPoint) > 30){
      setCarCoordsFunc()
      setCarAnimationVariables({
        ...carPoint,
        type: "inertia",
        rotate: carAngle + 270
      })
    }
  };
  const handleTracking = () =>{
    
  }

  return (
    <>
      <h2>Coords: {mouseCoords.x} {mouseCoords.y}</h2>
      <h2>Global coords: {globalMouseCoords.x} {globalMouseCoords.y}</h2>
      <h2>Car coords: {carCoords.x} {carCoords.y}</h2>
      <h2>Car angle: {carAngle}</h2>
      <button>Track outsideHitbox</button>
      <motion.div className="carEnvironment" onMouseMove={handleMouseMove}>
        <motion.img animate={carAnimationVariables} transition={carTransitionVariables} className="carImg" src='assets/car.webp' alt='car' />
        <motion.img className="trackImg" src='assets/pista1.webp' alt='track'/>
      </motion.div>
    </>
  );
}

export default App;