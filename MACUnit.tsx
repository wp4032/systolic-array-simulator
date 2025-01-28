import { Plus, X } from "lucide-react";
import { Arrow, SemiCircleArrow, Curve } from "./Arrows";
import { RoundedArrow } from "./RoundedArrow";

interface MACUnitProps {
  className?: string;
  left_input?: number;
  top_input?: number;
  weight?: number;
  acc?: number;
}

export const MACUnit = ({ className, left_input, top_input, weight, acc }: MACUnitProps) => (
  <div className="relative w-[300px] h-[300px] bg-neutral-900 rounded-2xl border border-neutral-700">
    <p className="text-white font-mono text-neutral-300 text-center text-md absolute -bottom-[25px] left-[10px] leading-none">MAC Unit</p>
    <div className="weight_r absolute flex justify-center items-center absolute w-[50px] h-[25px] bg-black rounded top-[20%] left-1/3 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
      <p className="font-mono text-white text-xs text-center select-none">{weight?.toFixed(2)}</p> 
      <p className="absolute -top-[20px] font-mono text-neutral-500 text-xs text-center select-none">weight_r</p> 
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
      <p className="absolute top-[25px] font-mono text-neutral-500 text-xs text-center select-none">output_r</p> 
    </div>     
    <div className="input_r absolute flex justify-center items-center absolute w-[25px] h-[50px] bg-black rounded top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
      <p className="font-mono text-white text-xs text-center -rotate-90 select-none">{left_input?.toFixed(2)}</p>
      <p className="absolute -left-[40px] font-mono text-neutral-500 text-xs text-center select-none -rotate-90">input_r</p> 
    </div>

    {/* Arrows */}
    <Arrow length={37} chevronSize={10} direction="down" color="#888" className="absolute -top-[15px] left-1/3" />
    <Arrow length={35} chevronSize={10} direction="right" color="#888" className="absolute top-1/2 -left-[15px]" />
    <Arrow length={235} chevronSize={10} direction="right" color="#888" className="absolute top-1/2 left-[83px]" />
    <Arrow length={20} chevronSize={10} direction="down" color="#fff" className="absolute top-[46.5%] left-[50%]" />
    <Arrow length={20} chevronSize={10} direction="down" color="#888" className="absolute top-[66.5%] left-[50%]" />
    <Arrow length={45} chevronSize={10} direction="down" color="#888" className="absolute top-[91%] left-[50%]" />
    <RoundedArrow points={[[0, 0], [0, 32], [30, 32]]} color="#888" className="absolute top-[27%] left-1/3" radius={5} />
    <RoundedArrow points={[[0, 0], [0, 17], [20, 17], [20, 46]]} color="#888" className="absolute top-[37.25%] left-[95px] -rotate-90" radius={5} />
    <RoundedArrow points={[[0, 0], [0, 99], [-30, 99]]} color="#fff" className="absolute top-[27%] left-[57%]" radius={5} />
    <RoundedArrow points={[[0, 0], [0, 22], [50, 22], [50, 38]]} color="#888" className="absolute -top-[15px] left-1/2" radius={5} />
  </div>

  // <div className="relative w-[300px] h-[300px] bg-neutral-900 rounded-2xl border border-neutral-700">
  //   <p className="text-white font-mono text-neutral-300 text-center text-md absolute -top-[25px] left-[10px] leading-none">MAC Unit</p>
  //   <div className="weight_r flex justify-center items-center absolute w-[75px] h-[25px] bg-black rounded top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
  //     <p className="font-mono text-white text-xs text-center select-none">{weight?.toFixed(2)}</p> 
  //   </div>  
  //   <div className="add_r flex justify-center items-center absolute w-[25px] h-[25px] bg-black rounded-full top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">  
  //     <X className="w-4 h-4 text-white" />
  //   </div>
  //   <div className="mul_r flex justify-center items-center absolute w-[25px] h-[25px] bg-black rounded-full top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">
  //     <Plus className="w-4 h-4 text-white" /> 
  //   </div>
  //   <div className="output_r flex justify-center items-center absolute w-[75px] h-[25px] bg-black rounded top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
  //     <p className="font-mono text-white text-xs text-center select-none">output_r</p> 
  //   </div>     
  //   <div className="flex justify-center items-center absolute w-[25px] h-[75px] bg-black rounded top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
  //     <p className="font-mono text-white text-xs text-center -rotate-90 select-none">input_r</p>
  //   </div>

  //   {/* Values */}
  //   <div className="flex justify-center items-center absolute w-[25px] h-[75px] bg-black rounded top-1/2 -left-[35px] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
  //     <p className="font-mono text-white text-xs text-center -rotate-90 select-none">{left_input?.toFixed(2)}</p>
  //   </div>
  //   <div className="flex justify-center items-center absolute h-[25px] w-[50px] bg-black rounded left-1/2 -top-[35px] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
  //     <p className="font-mono text-white text-xs text-center select-none">{weight?.toFixed(2)}</p>
  //   </div>
  //   <div className="flex justify-center items-center absolute h-[25px] w-[50px] bg-black rounded left-[67.5%] -top-[35px] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
  //     <p className="font-mono text-white text-xs text-center select-none">{top_input?.toFixed(2)}</p>
  //   </div>
  //   <div className="flex justify-center items-center absolute h-[25px] w-[50px] bg-black rounded left-1/2 -bottom-[60px] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
  //     <p className="font-mono text-white text-xs text-center select-none">{acc?.toFixed(2)}</p>
  //   </div>

  //   {/* Arrows */}
  //   <div className="relative w-full h-full">
  //     <Arrow length={235} chevronSize={10} direction="right" color="#888" className="absolute top-1/2 -left-[15px]" />
  //     <Arrow length={55} chevronSize={10} direction="down" color="#888" className="absolute -top-[15px] left-1/2" />
  //     <Arrow length={20} chevronSize={10} direction="down" color="#888" className="absolute top-[26.5%] left-[50%]" />
  //     <Arrow length={20} chevronSize={10} direction="down" color="#fff" className="absolute top-[46.5%] left-[50%]" />
  //     <Arrow length={20} chevronSize={10} direction="down" color="#888" className="absolute top-[66.5%] left-[50%]" />
  //     <Arrow length={55} chevronSize={10} direction="down" color="#888" className="absolute top-[86.5%] left-[50%]" />
  //     <Arrow length={20} chevronSize={10} direction="right" color="#888" className="absolute top-[40%] left-[37%]" />
  //     <Arrow length={55} chevronSize={10} direction="right" color="#888" className="absolute top-1/2 left-[86%]" />
  //     <Arrow length={30} chevronSize={10} direction="left" color="#fff" className="absolute top-[60%] left-[67.5%]" />
  //     <Arrow length={194.5} chevronSize={0} direction="down" color="#fff" className="absolute -top-[15px] left-[67.5%]" />
  //     {/* <SemiCircleArrow radius={20} chevronSize={10} color="#fff" className="absolute top-1/2 left-[55%]" /> */}
  //     <Curve className="absolute top-[39.5%] left-[19.5%] h-[32px]" color="#888" />
  //   </div>
  // </div>
);

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