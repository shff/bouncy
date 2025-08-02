import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface VectorWithVelocity {
  x: number;
  y: number;
  xVelocity: number;
  yVelocity: number;
};

function App() {
  const [positions, setPositions] = useState<VectorWithVelocity[]>(
    [{ x: 0, y: 0, xVelocity: 20, yVelocity: 20 }]
  );

  useEffect(() => {
    const handler = setInterval(() => {
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;

      setPositions((positions) => {
        return positions.map((position) => {
          const positionCopy = { ...position };

          if (positionCopy.x > maxX) positionCopy.xVelocity = -20;
          if (positionCopy.x < 0) positionCopy.xVelocity = 20;
          positionCopy.x += positionCopy.xVelocity;

          if (positionCopy.y > maxY) positionCopy.yVelocity = -20;
          if (positionCopy.y < 0) positionCopy.yVelocity = 20;
          positionCopy.y += positionCopy.yVelocity;

          return positionCopy
        });
      });
    }, 100);

    return () => clearInterval(handler);
  }, []);

  return (
    <div>
      <button onClick={() => {
        setPositions((positions) => {
          return [...positions, { x: 0, y: 0, xVelocity: 20, yVelocity: 20 }];
        });
      }}>Add new atom</button>
      {positions.map((position, index) => {
        return (<div
          key={index}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            left: position.x,
            top: position.y,
          }}
        >
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>)
      })}
    </div>
  );
}

export default App
