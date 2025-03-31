'use client'

import { SystolicArray } from '@/app/components/nnaccelerator/SystolicArray';
import { useEffect, useState } from 'react';
import { OutputMatrix } from '@/app/components/nnaccelerator/OutputMatrix';
import { InputMatrix } from '@/app/components/nnaccelerator/InputMatrix';
import { MACUnitGrid } from '@/app/components/nnaccelerator/MACUnitGrid';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export interface SystolicSimulatorProps {
  ifmap_buf?: number[][] | null;
  weight_buf?: number[][] | null;
  size?: number;
  debug?: boolean;
  frozen?: boolean;
  frozen_state?: 'init' | 'update' | 'translate' | 'idle';
  step_count?: number;
  looping?: boolean;
  animation_speed?: number;
}

export default function SystolicSimulator({ size=2, debug = false, ifmap_buf, weight_buf, frozen = true, frozen_state = 'init', step_count = 0, looping = false, animation_speed = 2000 }: SystolicSimulatorProps) {
  const [array, setArray] = useState<SystolicArray | null>(null);
  const [stepCount, setStepCount] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'init' | 'update' | 'translate' | 'idle'>(frozen_state);
  const [matricesLocked, setMatricesLocked] = useState(false);

  // Function to generate random inputs/weights
  // const getRandomValues = (size: number) => Array(size).fill(0).map(() => +(Math.random() * 2 - 1).toFixed(2));

  const generateRandomMatrix = (size: number): number[][] => {
    return Array.from({ length: size }, () => 
      Array.from({ length: size }, () => +(Math.random() * 2 - 1).toFixed(2))
    );
  };

  useEffect(() => {
    const newArray = new SystolicArray(size, size);
    if (ifmap_buf) {
      newArray.load_ifmap(ifmap_buf);
    }
    else {
      newArray.load_ifmap(generateRandomMatrix(size));
    }
    if (weight_buf) {
      newArray.load_weights(weight_buf);
    }
    else {
      newArray.load_weights(generateRandomMatrix(size));
    }
    setArray(newArray);
  }, [size, ifmap_buf, weight_buf]);

  // Effect to initialize the array to the specified step_count
  useEffect(() => {
    if (array && step_count > 0) {
      // Execute step() operation until we reach the desired step_count
      for (let i = 0; i < step_count; i++) {
        array.step();
      }
      // Update the local step count state to match
      setStepCount(step_count);
    }
  }, [array, step_count, ifmap_buf, weight_buf]);

  // Effect for automatic looping animation
  useEffect(() => {
    if (!array || !looping) return;
    
    let animationTimer: NodeJS.Timeout;
    
    const runLoopingAnimation = () => {
      // First go to the specified step_count
      if (stepCount < step_count) {
        array.step();
        setStepCount(prev => prev + 1);
        setAnimationPhase('update');
      } else {
        // After reaching step_count, cycle through animation phases
        if (animationPhase === 'update') {
          setAnimationPhase('translate');
        } else if (animationPhase === 'translate') {
          setAnimationPhase('idle');
        } else if (animationPhase === 'idle') {
          setAnimationPhase('update');
          // Don't step the array during looping, just cycle through phases
        }
      }
      
      // Schedule the next animation step
      animationTimer = setTimeout(runLoopingAnimation, animation_speed);
    };
    
    // Start the animation
    animationTimer = setTimeout(runLoopingAnimation, animation_speed);
    
    // Cleanup function
    return () => {
      clearTimeout(animationTimer);
    };
  }, [array, looping, animationPhase, stepCount, step_count, animation_speed]);

  const handleNextStep = () => {
    if (!array || looping) return;
    
    if (animationPhase === 'init') {
      // Lock the matrices and move to update phase
      setMatricesLocked(true);
      setAnimationPhase('update');
      array.step();
      console.log("update");
    } else if (animationPhase === 'update') {
      // Move from update to translate
      setAnimationPhase('translate');
      console.log("translate");
    } else if (animationPhase === 'translate') {
      // Move from translate to idle
      setAnimationPhase('idle');
      console.log("idle");
    } else if (animationPhase === 'idle') {
      // Move from idle to the next step's update phase
      if (stepCount < 2 * size - 1) {
        // If we haven't reached the end, go to next step
        setStepCount(prev => prev + 1);
        array.step();
        setAnimationPhase('update');
        console.log("update");
      } else {
        // If we've completed all steps, reset everything
        array.checkResult();
        array.reset();
        
        // Load new random values after animation is done
        const ifmap_buf = generateRandomMatrix(size);
        array.load_ifmap(ifmap_buf);
        const weight_buf = generateRandomMatrix(size);
        array.load_weights(weight_buf);
        
        setStepCount(0);
        setAnimationPhase('init');
        console.log("init");
      }
    }
  };

  const handlePreviousStep = () => {
    if (!array || animationPhase === 'init' || (stepCount === 0 && animationPhase === 'update')) return;
    
    if (animationPhase === 'update' && stepCount > 0) {
      // If we're in update phase, revert the step and go back to idle
      array.reverse_step();
      setStepCount(prev => prev - 1);
      setAnimationPhase('idle');
      console.log("reverted to idle");
    } else if (animationPhase === 'translate') {
      // If we're in translate phase, go back to update
      setAnimationPhase('update');
      console.log("reverted to update");
    } else if (animationPhase === 'idle') {
      // If we're in idle phase, go back to translate
      setAnimationPhase('translate');
      console.log("reverted to translate");
    }
  };

  return (
      <div className="flex justify-center items-center flex-col mb-12 mt-12 2xl:mb-16 2xl:mt-20">
        <div className="flex flex-col items-center gap-4">
          {debug && (
            <>
              <p className="text-white text-center text-xs">Current Phase: {animationPhase}</p>
              <p className="text-white text-center text-xs">Step: {stepCount} / {2 * size}</p>
              <div className="flex gap-4">
                <button 
                  onClick={handlePreviousStep}
                  disabled={animationPhase === 'init'}
                  className={`px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors ${
                    (animationPhase === 'init' || (stepCount === 0 && animationPhase === 'update')) ? 'opacity-50' : ''
                  }`}
                >
                  Previous Step
                </button>
                <button 
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Next Step
                </button>
              </div>
            </>
          )}
        </div>
        <div className="relative flex flex-col items-center justify-start relative w-[450px] sm:w-[500px] md:w-[500px] lg:w-[600px] xl:w-[625px] h-[450px] sm:h-[500px] md:h-[500px] lg:h-[600px] xl:h-[625px] 2xl:h-[850px]">
          {/* Weight Matrix on top */}
          <div className="absolute -top-6 sm:-top-12 md:-top-12 lg:-top-8 xl:-top-8 2xl:-top-12 left-1/2 -translate-x-1/2 mb-8 scale-[48%] sm:scale-[60%] md:scale-[60%] lg:scale-[70%] xl:scale-[80%] 2xl:scale-[100%]">
            <InputMatrix 
              rows={2} 
              cols={2} 
              input={true} 
              matrixName='Weight'
              locked={matricesLocked}
              values={array?.weight_buffer}
              animationState={animationPhase}
              weight_counter={array?.weight_counter}
              systolic_array_size={size}
              // ref={(matrixRef) => {
              //   // You can access matrix values using matrixRef.getValues()
              // }}
            />
          </div>
          
          <div className="absolute w-full top-1/2 translate-y-[-50%] flex items-center justify-center">
            {/* Input Matrix on the left */}
            <div className="absolute left-[6.5rem] sm:left-20 md:left-20 lg:left-24 xl:left-20 2xl:-left-8 top-1/2 -translate-y-1/2 -translate-x-full scale-[48%] sm:scale-[60%] md:scale-[60%] lg:scale-[70%] xl:scale-[80%] 2xl:scale-[100%]">
              <InputMatrix 
                rows={2} 
                cols={2} 
                input={true} 
                matrixName='Input'
                locked={matricesLocked}
                values={array?.ifmap_buffer}
                animationState={animationPhase}
                weight_counter={array?.weight_counter}
                systolic_array_size={size}
                // ref={(matrixRef) => {
                //   // You can access matrix values using matrixRef.getValues()
                // }}
              />
            </div>
            
            {/* MAC Units grid */}
            <div className="scale-[48%] sm:scale-[60%] md:scale-[60%] lg:scale-[70%] xl:scale-[0.7] 2xl:scale-[1.0]">
              <MACUnitGrid array={array} size={size} animationPhase={animationPhase} scale={1.0}/>
            </div>
          </div>
          {/* Output Matrix on bottom */}
          <div className="absolute -bottom-8 sm:-bottom-16 md:-bottom-16 lg:-bottom-12 2xl:-bottom-12 left-1/2 -translate-x-1/2 mt-8 scale-[48%] sm:scale-[60%] md:scale-[60%] lg:scale-[70%] xl:scale-[80%] 2xl:scale-[100%]">
            <OutputMatrix 
              rows={2} 
              cols={2} 
              input={false} 
              matrixName='Output'
              values={array?.ofmap_buffer}
              animationState={animationPhase}
            />
          </div>
          
          {!frozen && (
            <>
              {/* Systolic Array buttons */}
              <button 
                onClick={handlePreviousStep}
                disabled={animationPhase === 'init'}
                className={`absolute bottom-[2.5%] sm:bottom-[-4%] md:bottom-[-4%] lg:bottom-[0.5%] -translate-y-1/2 left-[30%] w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-white hover:bg-neutral-900 transition-colors ${
                  (animationPhase === 'init' || (stepCount === 0 && animationPhase === 'update')) ? 'opacity-50' : ''
                }`}
              >
                <FaAngleLeft />
              </button>
              <button 
                onClick={handleNextStep}
                className="absolute bottom-[2.5%] sm:bottom-[-4%] md:bottom-[-4%] lg:bottom-[0.5%] -translate-y-1/2 right-[30%] w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-white hover:bg-neutral-900 transition-colors"
              >
                <FaAngleRight />
              </button>
            </>
          )}
        </div>
      </div>
  );
}