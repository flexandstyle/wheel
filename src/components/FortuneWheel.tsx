import { useEffect, useRef, useState } from 'react';
import type { Restaurant } from '../types';
import { wheelColors } from '../data/restaurants';

interface FortuneWheelProps {
  restaurants: Restaurant[];
  onSpinEnd: (restaurant: Restaurant) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
}

export function FortuneWheel({
  restaurants,
  onSpinEnd,
  isSpinning,
  onSpinStart,
}: FortuneWheelProps) {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<SVGSVGElement>(null);

  const segments = restaurants.slice(0, 8);
  const segmentAngle = 360 / segments.length;

  useEffect(() => {
    if (isSpinning) {
      const randomIndex = Math.floor(Math.random() * segments.length);
      const extraRotations = 5 + Math.random() * 3;
      const targetAngle = 360 * extraRotations + (360 - randomIndex * segmentAngle - segmentAngle / 2);

      setRotation(targetAngle);

      const timeout = setTimeout(() => {
        onSpinEnd(segments[randomIndex]);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [isSpinning, segments, segmentAngle, onSpinEnd]);

  const createSegmentPath = (index: number, total: number) => {
    const startAngle = (index * 360) / total - 90;
    const endAngle = ((index + 1) * 360) / total - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const radius = 120;
    const cx = 150;
    const cy = 150;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number, total: number) => {
    const angle = ((index + 0.5) * 360) / total - 90;
    const rad = (angle * Math.PI) / 180;
    const radius = 75;
    const cx = 150;
    const cy = 150;

    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
      rotation: angle + 90,
    };
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 -mt-2">
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-[#FF6B6B] drop-shadow-lg" />
      </div>

      {/* Wheel */}
      <div className="relative">
        <svg
          ref={wheelRef}
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
          }}
        >
          {/* Outer ring */}
          <circle
            cx="150"
            cy="150"
            r="145"
            fill="none"
            stroke="#1C1C1E"
            strokeWidth="8"
          />

          {/* Segments */}
          {segments.map((restaurant, index) => {
            const textPos = getTextPosition(index, segments.length);
            return (
              <g key={restaurant.id}>
                <path
                  d={createSegmentPath(index, segments.length)}
                  fill={wheelColors[index % wheelColors.length]}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="#fff"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {restaurant.name.length > 12
                    ? restaurant.name.substring(0, 10) + '...'
                    : restaurant.name}
                </text>
              </g>
            );
          })}

          {/* Center circle */}
          <circle cx="150" cy="150" r="25" fill="#1C1C1E" />
          <circle cx="150" cy="150" r="20" fill="#fff" />
          <text
            x="150"
            y="150"
            fill="#1C1C1E"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            VIBE
          </text>
        </svg>
      </div>

      {/* Spin button */}
      <button
        onClick={onSpinStart}
        disabled={isSpinning}
        className={`mt-8 px-12 py-4 rounded-full text-white font-bold text-lg transition-all duration-300 ${
          isSpinning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'gradient-accent hover:shadow-lg hover:scale-105 active:scale-95'
        }`}
      >
        {isSpinning ? 'Крутится...' : 'Крутить!'}
      </button>
    </div>
  );
}
