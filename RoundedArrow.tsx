import React from 'react';

interface RoundedArrowProps {
  points: [number, number][];
  className?: string;
  color?: string;
  strokeWidth?: number;
  arrowHeadSize?: number;
  radius?: number;
}

export const RoundedArrow: React.FC<RoundedArrowProps> = ({
  points,
  className = '',
  color = 'black',
  strokeWidth = 2,
  arrowHeadSize = 5,
  radius = 10,
}) => {
  if (points.length < 2) return null;

  // Calculate SVG bounds
  const minX = Math.min(...points.map(p => p[0])) - strokeWidth;
  const minY = Math.min(...points.map(p => p[1])) - strokeWidth;
  const maxX = Math.max(...points.map(p => p[0])) + radius + strokeWidth;
  const maxY = Math.max(...points.map(p => p[1])) + radius + strokeWidth;
  
  const width = maxX - minX;
  const height = maxY - minY;

  const pathData = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point[0]} ${point[1]}`;
    if (i === points.length - 1) return `${acc} L ${point[0]} ${point[1]}`;

    const prev = points[i - 1];
    const current = point;
    const next = points[i + 1];

    // Calculate direction vectors
    const dx1 = current[0] - prev[0];
    const dy1 = current[1] - prev[1];
    const dx2 = next[0] - current[0];
    const dy2 = next[1] - current[1];

    // Only handle 90-degree turns
    if (Math.abs(dx1 * dx2 + dy1 * dy2) < 0.001) {
      // Calculate the start and end points of the arc
      const startX = current[0] - Math.sign(dx1) * radius;
      const startY = current[1] - Math.sign(dy1) * radius;
      const endX = current[0] + Math.sign(dx2) * radius;
      const endY = current[1] + Math.sign(dy2) * radius;

      // Determine sweep flag based on turn direction (inverted from previous version)
      const sweep = dx1 * dy2 - dy1 * dx2 > 0 ? 1 : 0;

      return `${acc} L ${startX} ${startY} A ${radius} ${radius} 0 0 ${sweep} ${endX} ${endY}`;
    }

    return `${acc} L ${current[0]} ${current[1]}`;
  }, '');

  // Add arrow head
  const [lastX, lastY] = points[points.length - 1];
  const [prevX, prevY] = points[points.length - 2];
  
  // Calculate arrow head direction
  const dx = lastX - prevX;
  const dy = lastY - prevY;
  const angle = Math.atan2(dy, dx);
  
  const arrowHeadPath = `
    M ${lastX - arrowHeadSize * Math.cos(angle - Math.PI/3)} ${lastY - arrowHeadSize * Math.sin(angle - Math.PI/3)}
    L ${lastX} ${lastY}
    L ${lastX - arrowHeadSize * Math.cos(angle + Math.PI/3)} ${lastY - arrowHeadSize * Math.sin(angle + Math.PI/3)}
  `;

  return (
    <svg 
      className={`absolute -translate-x-[2px] -translate-y-[2px] ${className}`} 
      fill="none"
      viewBox={`${minX} ${minY} ${width} ${height}`}
      width={width}
      height={height}
    >
      <path
        d={pathData}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={arrowHeadPath}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 