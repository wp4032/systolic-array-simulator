import React, { useState, useImperativeHandle, forwardRef } from "react";
import { RoundedArrow } from "./RoundedArrow";

interface MatrixProps {
  rows: number;
  cols: number;
  input?: boolean;
  values?: number[][];
  className?: string;
  matrixName?: string;
}

export interface MatrixRef {
  getValues: () => number[][];
}

export const Matrix = forwardRef<MatrixRef, MatrixProps>(({ rows, cols, input = false, values, className, matrixName }, ref) => {
  const defaultValues = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => values?.[i]?.[j] ?? 0)
  );
  
  const [matrixValues, setMatrixValues] = useState(defaultValues);

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
              disabled={!input}
              onKeyDown={(e) => input && handleKeyPress(e, i, j)}
              readOnly
              className={`text-center text-white font-mono text-sm px-2 py-1 bg-black border rounded border-neutral-700 ${
                input ? "focus:outline-none focus:border-blue-500" : "text-neutral-500 cursor-not-allowed"
              }`}
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
