import { Plus, X } from "lucide-react";
import { Arrow, SemiCircleArrow, Curve } from "./Arrows";
import { RoundedArrow } from "./RoundedArrow";

interface MACUnitProps {
  className?: string;
  left_input?: number;
  left_input_flush?: number;
  top_input?: number;
  weight?: number;
  acc?: number;
  id?: string;
  is_bottom?: boolean;
  is_right?: boolean;
  is_top?: boolean;
  is_left?: boolean;
  ifmap_buf?: number[][];
  weight_buf?: number[][];
  weight_counter?: number;
  accumulated_results?: number[];
  animationPhase: 'update' | 'translate' | 'idle';
}

export const MACUnit = ({ className, left_input, left_input_flush, top_input, weight, weight_counter, acc, id, is_bottom, is_right, is_top, is_left, ifmap_buf, weight_buf, accumulated_results, animationPhase }: MACUnitProps) => {
  const left_input_active = left_input !== 0;
  const left_input_flush_active = left_input_flush !== 0;
  const top_input_active = top_input !== 0;
  const weight_active = weight !== 0;
  const acc_active = acc !== 0;

  const sumDigits = (id: string | undefined): number => {
    return (id ?? "")
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  };
  
  const is_new_weight = sumDigits(id) === (weight_counter ?? 0) - 1;

  const left_input_color = left_input_active ? "text-red-500" : "text-neutral-500";
  const weight_color = weight_active ? "text-green-500" : "text-neutral-500";
  // const top_input_color = top_input_active ? "text-blue-500" : "text-neutral-500";
  const acc_color = acc_active ? "text-blue-500" : "text-neutral-500";

  console.log('MAC Unit ID:', id, 'Left Input Flush Active:', left_input_flush_active)

  return (
    <div className="relative w-[300px] h-[300px] bg-neutral-900 rounded-2xl border border-neutral-700">
      <p className="text-white font-mono text-neutral-300 text-center text-xs absolute bottom-[10px] left-[10px] leading-none">MAC Unit {id}</p>
      <div className="weight_r absolute flex justify-center items-center absolute w-[50px] h-[25px] bg-black rounded top-[20%] left-1/3 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
        <p className={`absolute font-mono text-white text-xs text-center select-none ${(() => {
          switch (true) {
            case ((animationPhase === 'update' || animationPhase === 'translate') && !is_new_weight && weight_active):
              return 'text-green-300';
            case (animationPhase === 'update' && weight_active && is_new_weight):
              return '-top-[85px]';
            case (animationPhase === 'translate' && weight_active && is_new_weight):
              return 'top-[3px] visible translate-z-10 transition-all duration-1000 ease-in text-green-300';
            case (animationPhase === 'idle' && weight_active):
              return 'text-green-300';
            default:
              return 'invisible';
          }
        })()}`}>
          {weight?.toFixed(2)}
        </p> 
        <p className={`absolute -top-[20px] font-mono text-xs text-center select-none ${weight_color}`}>weight_r</p> 
      </div>  
      <div className="top_input_r absolute flex justify-center items-center absolute w-[50px] h-[25px] bg-black rounded top-[20%] left-2/3 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
        <p className="font-mono text-white text-xs text-center select-none">{top_input?.toFixed(2)}</p> 
        <p className="absolute -top-[20px] font-mono text-neutral-500 text-xs text-center select-none">top_input_r</p> 
      </div>  
      <div className="add_r flex justify-center items-center absolute w-[25px] h-[25px] bg-black rounded-full top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">  
        <X className="w-4 h-4 text-white" />
      </div>
      <div className="mul_r flex justify-center items-center absolute w-[25px] h-[25px] bg-black rounded-full top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">
        <Plus className="w-4 h-4 text-white" /> 
      </div>
      <div className="output_r absolute flex justify-center items-center absolute w-[50px] h-[25px] bg-black rounded top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
        <p className="font-mono text-white text-xs text-center select-none">{acc?.toFixed(2)}</p> 
        <p className={`absolute top-[25px] font-mono text-xs text-center select-none ${acc_color}`}>output_r</p> 
      </div>     
      <div className="input_r absolute flex justify-center items-center absolute w-[25px] h-[50px] bg-black rounded top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
        <div className={`absolute font-mono text-white text-xs text-center -rotate-90 select-none w-[50px] ${(() => {
          switch (true) {
            case (animationPhase === 'update' && left_input_active):
              return `${is_left ? '-left-[100px] text-white' : '-left-[339px] text-red-300'}`;
            case (animationPhase === 'translate' && left_input_active):
              return `left-1/2 -translate-x-1/2 visible translate-z-10 transition-all duration-1000 ease-in text-red-300`;
            case (animationPhase === 'idle' && left_input_active):
              return 'text-red-300';
            default:
              return 'invisible';
          }
        })()}`}>
          {left_input?.toFixed(2)}
        </div>
        <div className={`absolute font-mono text-white text-xs text-center -rotate-90 select-none ${(() => {
          switch (true) {
            case (animationPhase === 'update' && left_input_flush_active && is_right):
              return 'text-red-300';
            case (animationPhase === 'translate' && left_input_flush_active && is_right):
              return `left-1/2 translate-x-[260px] visible translate-z-10 transition-all duration-1000 ease-in opacity-0`;
            default:
              return 'invisible';
          }
        })()}`}>
          {left_input_flush?.toFixed(2)}
          {/* {animationPhase} {id} {left_input_flush} */}
        </div>
        <p className={`absolute -left-[40px] font-mono text-xs text-center select-none -rotate-90 ${(() => {
          switch (true) {
            case (animationPhase === 'update' && left_input_flush_active):
              return "text-red-500";
            case (animationPhase === 'idle' && left_input_active):
              return "text-red-500";
            case (animationPhase === 'translate' && left_input_active):
              return "text-red-500";
            default:
              return 'text-neutral-500';
          }
        })()}`}>
          input_r
          </p> 
      </div>

      {/* Arrows */}
      {is_top ? 
        <Arrow length={37} chevronSize={10} direction="down" color="#888" className="absolute -top-[15px] left-1/3" /> : 
        <Arrow length={55} chevronSize={10} direction="down" color="#888" className="absolute -top-[34px] left-1/3" />
      }    
      <Arrow length={35} chevronSize={10} direction="right" color="#888" className="absolute top-1/2 -left-[15px]" />
      {is_right ? 
        <Arrow length={235} chevronSize={10} direction="right" color="#888" className="absolute top-1/2 left-[83px]" /> : 
        <Arrow length={235} chevronSize={0} direction="right" color="#888" className="absolute top-1/2 left-[83px]" />
      }
      <Arrow length={20} chevronSize={10} direction="down" color="#fff" className="absolute top-[46.5%] left-[50%]" />
      <Arrow length={20} chevronSize={10} direction="down" color="#888" className="absolute top-[66.5%] left-[50%]" />
      {is_bottom ? 
        <Arrow length={45} chevronSize={10} direction="down" color="#888" className="absolute top-[91%] left-[50%]" /> : 
        <Arrow length={55} chevronSize={0} direction="down" color="#888" className="absolute top-[91%] left-[50%]" />
      }
      <RoundedArrow points={[[0, 0], [0, 32], [30, 32]]} color="#888" className="absolute top-[27%] left-1/3" radius={5} />
      <RoundedArrow points={[[0, 0], [0, 17], [20, 17], [20, 46]]} color="#888" className="absolute top-[37.25%] left-[95px] -rotate-90" radius={5} />
      <RoundedArrow points={[[0, 0], [0, 99], [-30, 99]]} color="#fff" className="absolute top-[27%] left-[57%]" radius={5} />
      <RoundedArrow points={[[0, 0], [0, 22], [50, 22], [50, 38]]} color="#888" className="absolute -top-[15px] left-1/2" radius={5} />
    </div>
  );
};

export const MiniMACUnit = ({ className }: { className?: string }) => (
  <div className="relative w-[100px] h-[100px] bg-neutral-900 rounded-2xl border border-neutral-700">
    <div className="weight_r flex justify-center items-center absolute w-[25px] h-[9px] bg-black rounded top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
    </div>  
    <div className="add_r flex justify-center items-center absolute w-[9px] h-[9px] bg-black rounded-full top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">  
      <Plus className="w-4 h-4 text-white" /> 
    </div>
    <div className="mul_r flex justify-center items-center absolute w-[9px] h-[9px] bg-black rounded-full top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">
      <X className="w-4 h-4 text-white" />
    </div>
    <div className="output_r flex justify-center items-center absolute w-[27px] h-[9px] bg-black rounded top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
    </div>     
    <div className="flex justify-center items-center absolute w-[9px] h-[27px] bg-black rounded top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
    </div>
    <div className="relative w-full h-full">
      <Arrow length={18} chevronSize={0} strokeWidth={0.5} direction="down" color="#666" className="absolute -top-[5px] left-1/2" />
      <Arrow length={20/3} chevronSize={0} strokeWidth={0.5} direction="down" color="#666" className="absolute top-[26.5%] left-[50%]" />
      <Arrow length={20/3} chevronSize={0} strokeWidth={0.5} direction="down" color="#666" className="absolute top-[66.5%] left-[50%]" />
      <Arrow length={55/3} chevronSize={0} strokeWidth={0.5} direction="down" color="#666" className="absolute top-[86.5%] left-[50%]" />
      <Arrow length={230/3} chevronSize={0} strokeWidth={0.5} direction="right" color="#666" className="absolute top-1/2 -left-[5px]" />
      <Arrow length={20/3} chevronSize={0} strokeWidth={0.5} direction="right" color="#666" className="absolute top-[39.5%] left-[37%]" />
      <Arrow length={55/3} chevronSize={0} strokeWidth={0.5} direction="right" color="#666" className="absolute top-1/2 left-[86%]" />
      <SemiCircleArrow radius={20/3} chevronSize={10/3} strokeWidth={0.5} color="#fff" className="absolute top-1/2 left-[55%]" />
      <Curve className="absolute top-[39.5%] left-[19.5%] h-[10.5px]" />
    </div>
  </div>
);

// export { MACUnit, MiniMACUnit };