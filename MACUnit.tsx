import { Plus, X } from "lucide-react";
import { Arrow, SemiCircleArrow, Curve } from "./Arrows";

export const MACUnit = ({ className }: { className?: string }) => (
  <div className="relative w-[300px] h-[300px] bg-neutral-900 rounded-2xl border border-neutral-700">
    <p className="text-white font-mono text-neutral-300 text-center text-md absolute -top-[25px] left-[10px] leading-none">MAC Unit</p>
    <div className="weight_r flex justify-center items-center absolute w-[75px] h-[25px] bg-black rounded top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
      <p className="font-mono text-white text-xs text-center select-none">weight_r</p> 
    </div>  
    <div className="add_r flex justify-center items-center absolute w-[25px] h-[25px] bg-black rounded-full top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">  
      <Plus className="w-4 h-4 text-white" /> 
    </div>
    <div className="mul_r flex justify-center items-center absolute w-[25px] h-[25px] bg-black rounded-full top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none border border-neutral-700">
      <X className="w-4 h-4 text-white" />
    </div>
    <div className="output_r flex justify-center items-center absolute w-[75px] h-[25px] bg-black rounded top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-neutral-700">
      <p className="font-mono text-white text-xs text-center select-none">output_r</p> 
    </div>     
    <div className="flex justify-center items-center absolute w-[25px] h-[75px] bg-black rounded top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 border border-neutral-700">  
      <p className="font-mono text-white text-xs text-center -rotate-90 select-none">input_r</p>
    </div>
    <div className="relative w-full h-full">
      <Arrow length={55} chevronSize={10} direction="down" color="#aaa" className="absolute -top-[15px] left-1/2" />
      <Arrow length={20} chevronSize={10} direction="down" color="#aaa" className="absolute top-[26.5%] left-[50%]" />
      <Arrow length={20} chevronSize={10} direction="down" color="#aaa" className="absolute top-[66.5%] left-[50%]" />
      <Arrow length={55} chevronSize={10} direction="down" color="#aaa" className="absolute top-[86.5%] left-[50%]" />
      <Arrow length={235} chevronSize={10} direction="right" color="#aaa" className="absolute top-1/2 -left-[15px]" />
      <Arrow length={20} chevronSize={10} direction="right" color="#aaa" className="absolute top-[40%] left-[37%]" />
      <Arrow length={55} chevronSize={10} direction="right" color="#aaa" className="absolute top-1/2 left-[86%]" />
      <SemiCircleArrow radius={20} chevronSize={10} color="#fff" className="absolute top-1/2 left-[55%]" />
      <Curve className="absolute top-[39.5%] left-[19.5%] h-[32px]" color="#aaa" />
    </div>
  </div>
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