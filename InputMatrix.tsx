import React, { useState, useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import { RoundedArrow } from "./RoundedArrow";

interface MatrixProps {
  rows: number;
  cols: number;
  input?: boolean;
  values?: number[][];
  className?: string;
  matrixName?: string;
  locked?: boolean;
  animationState?: string;
  weight_counter?: number;
  systolic_array_size?: number;
}

export interface MatrixRef {
  getValues: () => number[][];
}

export const InputMatrix = forwardRef<MatrixRef, MatrixProps>(({ rows, cols, input = false, values, className, matrixName, locked = false, animationState, weight_counter, systolic_array_size }, ref) => {
  const defaultValues = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => values?.[i]?.[j] ?? 0)
  );
  
  const [matrixValues, setMatrixValues] = useState(defaultValues);
  const [highlightedCells, setHighlightedCells] = useState<boolean[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );
  const prevValuesRef = useRef<number[][]>(defaultValues);

  // Expose the getValues method to parent components
  useImperativeHandle(ref, () => ({
    getValues: () => matrixValues
  }));

  const bracket_height = 40 * rows + 8;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, i: number, j: number) => {
    const key = e.key;
    
    // Only allow digits
    if (!/^\d$/.test(key)) {
      e.preventDefault();
      return;
    }
    
    const currentValue = matrixValues[i][j];
    const currentStr = currentValue.toFixed(2);
    
    // Shift digits to the left and add new digit to the right
    const newStr = currentStr.slice(1) + key;
    const newValue = parseFloat(newStr) * 10;
    
    // Update the matrix value
    const newMatrixValues = [...matrixValues];
    newMatrixValues[i][j] = newValue;
    setMatrixValues(newMatrixValues);
    
    e.preventDefault();
  };

  useEffect(() => {
    if (values) {
      setMatrixValues(values);
    }
  }, [values]);

  // Update values and highlight cells based on weight_counter
  useEffect(() => {
    // Clear any existing highlights when animation state changes
    setHighlightedCells(Array.from({ length: rows }, () => Array(cols).fill(false)));
    if (animationState === "update" && values) {
      const newValues = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => values?.[i]?.[j] ?? 0)
      );
      
      // Create new highlights based on weight_counter logic
      const newHighlights = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => {
          if (weight_counter !== undefined) {
            // Highlight based on weight_counter logic similar to MACUnit
            return weight_counter - 1 == i + j;
          }
          return false;
        })
      );
      
      setMatrixValues(newValues);
      setHighlightedCells(newHighlights);
      prevValuesRef.current = newValues;
      
      // Reset highlights after a short delay
      const timer = setTimeout(() => {
        setHighlightedCells(Array.from({ length: rows }, () => Array(cols).fill(false)));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [animationState, values, rows, cols, weight_counter, systolic_array_size]);

  return (
    <div className="relative m-4">
      {/* Left bracket */}
      <div className="absolute -left-[10px] -top-[10px] -translate-y-1/2">
        <RoundedArrow 
          points={[[0, 0], [-5, 0], [-5, -bracket_height], [0, -bracket_height]]} 
          color="#666" 
          strokeWidth={0.75}
          className="transform" 
          radius={2} 
          arrowHeadSize={0}
        />
      </div>

      {/* Right bracket */}
      <div className="absolute -right-[5px] -top-[10px] -translate-y-1/2">
        <RoundedArrow 
          points={[[0, 0], [5, 0], [5, -bracket_height], [0, -bracket_height]]} 
          color="#666" 
          strokeWidth={0.75}
          className="transform" 
          radius={2} 
          arrowHeadSize={0}
        />
      </div>
      
      
      <div className={`inline-grid gap-2 ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 60px)` }}>
        {matrixValues.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              inputMode="numeric"
              value={val.toFixed(2)}
              disabled={!input || locked}
              onKeyDown={(e) => input && !locked && handleKeyPress(e, i, j)}
              readOnly
              className={`text-center text-white font-mono text-sm px-2 py-1 bg-black border rounded ${
                highlightedCells[i]?.[j] ? "border-red-500" : "border-neutral-700"
              } ${
                input && !locked ? "focus:outline-none focus:border-red-500" : "text-neutral-500"
              } transition-colors duration-300 ease-in`}
            />
          ))
        )}
      </div>
      <p className="mt-2 text-center text-sm font-light">
        {matrixName}
      </p>
    </div>
  );
});
