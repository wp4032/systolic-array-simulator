export const Arrow = ({ 
  length = 100,
  chevronSize = 20,
  className = "",
  color = "white",
  direction = "right",
  strokeWidth = 2
}: {
  length?: number;
  chevronSize?: number;
  className?: string;
  color?: string;
  direction?: "up" | "down" | "left" | "right";
  strokeWidth?: number;
}) => {
  return (
    <>
      {(() => {
        switch (direction) {
          case "right":
            return (
              <div className={`absolute -translate-y-1/2 ${className}`} style={{ width: length, height: chevronSize }}>
                {/* Line */}
                <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 rounded-full`} 
                    style={{ width: length, height: strokeWidth, backgroundColor: color }} />
                {/* Chevron */}
                <div className="absolute -right-[1px] top-1/2 transform -translate-y-1/2 ">
                  <svg 
                    width={chevronSize/2} 
                    height={chevronSize} 
                    viewBox={`0 0 ${chevronSize/2} ${chevronSize}`} 
                    fill="none"
                    className={`text-${color}`}
                  >
                    <path 
                      d={`M1 1L${chevronSize/2-1} ${chevronSize/2}L1 ${chevronSize-1}`}
                      stroke={color} 
                      strokeWidth={strokeWidth} 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          case "left":
            return (
              <div className={`absolute -translate-y-1/2 ${className}`} style={{ width: length, height: chevronSize }}>
                {/* Line */}
                <div className={`absolute top-1/2 right-0 bg-${color} transform -translate-y-1/2 rounded-full`} 
                    style={{ width: length - chevronSize/2 + 2, height: strokeWidth, backgroundColor: color }} />
                {/* Chevron */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                  <svg 
                    width={chevronSize} 
                    height={chevronSize} 
                    viewBox="0 0 24 24" 
                    fill="none"
                    className={`text-${color}`}
                  >
                    <path 
                      d="M15 18L9 12L15 6" 
                      stroke={color} 
                      strokeWidth={strokeWidth} 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            );
          case "up":
            return (
              <div className={`absolute ${className} -translate-x-1/2`} style={{ width: chevronSize, height: length }}>
                <div className={`absolute top-0 left-1/2 bg-${color} transform -translate-y-1/2 -translate-x-1/2 rounded-full`} 
                    style={{ height: length, width: strokeWidth, backgroundColor: color }} />
                <div className="absolute top-0 left-1/2 transform" style={{ transform: `translateY(-${length / 2 + 10}px)` }}>
                  <svg width={chevronSize} height={chevronSize} viewBox="0 0 24 24" fill="none" className={`text-${color} -translate-x-1/2`}>
                    <path d="M6 18L12 12L18 18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          case "down":
            return (
              <div className={`absolute ${className} -translate-x-1/2`} style={{ width: chevronSize, height: length }}>
                <div className={`absolute top-1/2 left-1/2 bg-${color} transform -translate-y-1/2 -translate-x-1/2 rounded-full`} 
                    style={{ height: length, width: strokeWidth, backgroundColor: color }} />
                <div className="absolute left-0 -bottom-[1px] transform">
                  <svg width={chevronSize} height={chevronSize/2} viewBox={`0 0 ${chevronSize} ${chevronSize/2}`} fill="none" className={`text-${color}`}>
                    <path d={`M1 1L${chevronSize/2} ${chevronSize/2-1}L${chevronSize-1} 1`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          default:
            return null; // Handle other directions if needed
        }
      })()}
    </>
  );
};

export const SemiCircleArrow = ({
  radius = 50,
  chevronSize = 10,
  className = "",
  color = "white",
  strokeWidth = 2
}: {
  radius?: number;
  chevronSize?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}) => {
  // Calculate the semi-circle path
  // We'll use the arc command (A) to draw the semi-circle
  // Starting from the top center, going right and down
  const startX = 1;
  const startY = 0;
  const endX = 1;
  const endY = radius * 2 - 1;
  
  const path = `
    M ${startX} ${startY + 1}
    A ${radius} ${radius / 4 * 3} 0 0 1 ${endX} ${endY}
  `;

  return (
    <div className={`absolute -translate-y-1/2 ${className}`} style={{ width: radius * 4 / 3, height: radius * 2 - 1 }}>
      {/* Semi-circle */}
      <svg
        width={radius * 4 / 3 + 1}
        height={radius * 2}
        fill="none"
        className={`text-${color}`}
      >
        <path
          d={path}
          stroke={color} // Update stroke color to use the color prop
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      
      {/* Chevron at the bottom */}
      <div className="absolute left-0 bottom-0 transform translate-y-1/2 ">
        <svg 
          width={chevronSize / 2} 
          height={chevronSize} 
          viewBox={`-1 0 ${chevronSize / 2 + 1} ${chevronSize}`} 
          fill="none"
          className={`text-${color}`}
        >
          <path 
            d={`M${chevronSize / 2 - 1} 1L0 ${chevronSize / 2}L${chevronSize / 2 - 1} ${chevronSize - 1}`}
            stroke={color} // Update stroke color to use the color prop
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const Curve = ({ className, color = "#666" }: { className: string, color?: string, strokeWidth?: number }) => (
  <div className={`flex h-4 w-full ${className}`}>
    <svg className="" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 94 56">
      <defs>
        <style>
          {`
            .cls-1 {
              fill: none;
              stroke: ${color};
              stroke-width: 4;
              stroke-linecap: round;
            }
          `}
        </style>
      </defs>
      <path className="cls-1" d="M0,53.5h13c16,0,33.5-11.69,33.5-27.5C46.5,6.48,68.01.5,89,.5h5"/>
    </svg>
  </div>
);