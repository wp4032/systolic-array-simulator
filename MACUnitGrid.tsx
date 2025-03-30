import React from 'react';
import { MACUnit } from './MACUnit';
import { SystolicArray } from './SystolicArray';

interface MACUnitGridProps {
  array: SystolicArray | null;
  size: number;
  scale?: number;
  animationPhase: 'init' | 'update' | 'translate' | 'idle';
}

export const MACUnitGrid: React.FC<MACUnitGridProps> = ({ array, size, animationPhase, scale=0.5 }) => {

  
  return (
    <div className="flex justify-center items-center" style={{ width: `${scale * 620}px`, height: `${scale * 620}px` }}>
      <div 
        className={`absolute flex justify-center items-center grid grid-cols-2 gap-8 w-[620px]`}
        style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
      >
        {Array.from({ length: size }).map((_, x) => (
          Array.from({ length: size }).map((_, y) => (
            <div 
              key={`${x}-${y}`} 
              className="w-[300px] h-[300px] flex items-center justify-center cursor-pointer"
            >
              <MACUnit 
                left_input={array?.cells[x]?.[y]?.left_input} 
                left_input_flush={array?.cells[x]?.[y+1]?.left_input}
                top_input={array?.cells[x]?.[y]?.top_input}
                weight={array?.cells[x]?.[y]?.weight}
                acc={array?.cells[x]?.[y]?.acc}
                id={`${x}${y}`}
                is_right={y === size - 1}
                is_bottom={x === size - 1} 
                is_top={x === 0}
                is_left={y === 0}
                animationPhase={animationPhase}
                ifmap_buf={array?.ifmap_buffer}
                weight_buf={array?.weight_buffer}
                ofmap_buf={array?.ofmap_buffer}
                accumulated_results={array?.accumulated_results}
                weight_counter={array?.weight_counter}
                systolic_array_size={size}
              />
            </div>
          ))
        ))}
      </div>
    </div>
  );
};