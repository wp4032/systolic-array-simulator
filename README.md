# Systolic Array Simulator
A visual and interactive systolic array simulator for matrix multiplication, built with React and TypeScript. This simulator helps visualize how data flows through systolic arrays, commonly used in neural network accelerators like Google's TPU.

<div align="center">
  <img src="./assets/output.gif" alt="Systolic Array Animation" width="1080"/>
</div>

## Features
- Interactive step-by-step visualization of systolic array computation
- Support for custom input and weight matrices
- Visual representation of MAC units and data flow
- Animation phases: init, update, translate, idle
- Configurable array size and animation speed
- Debug mode for detailed state inspection

## Usage

### Basic Implementation
```tsx
import SystolicSimulator from './SystolicSimulator';

function MyComponent() {
  return (
    <SystolicSimulator 
      size={2}
      debug={false}
      animation_speed={2000}
    />
  );
}
```

### Props
- `size` (number, default: 2): Size of the systolic array (NxN)
- `debug` (boolean, default: false): Enable debug mode with step controls
- `ifmap_buf` (number[][], optional): Input feature map matrix
- `weight_buf` (number[][], optional): Weight matrix
- `frozen` (boolean, default: true): Freeze animation state
- `frozen_state` ('init' | 'update' | 'translate' | 'idle', default: 'init'): Initial animation state
- `step_count` (number, default: 0): Initial step count
- `looping` (boolean, default: false): Enable continuous animation
- `animation_speed` (number, default: 2000): Animation speed in milliseconds

### Advanced Usage
```tsx
const inputMatrix = [
  [1.0, 2.0],
  [2.0, 1.0]
];

const weightMatrix = [
  [1.0, 0.0],
  [0.0, 1.0]
];

function MyAdvancedComponent() {
  return (
    <SystolicSimulator 
      size={2}
      debug={true}
      ifmap_buf={inputMatrix}
      weight_buf={weightMatrix}
      animation_speed={1500}
    />
  );
}
```

## Components
- `SystolicSimulator`: Main component that orchestrates the simulation
- `InputMatrix`: Handles input and weight matrix visualization
- `MACUnit`: Individual multiply-accumulate unit
- `MACUnitGrid`: Grid layout for MAC units
- `OutputMatrix`: Displays computation results
- `RoundedArrow`: Visualizes data flow between units

## License
MIT License with Citation Requirement

Copyright (c) 2025 William Pan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

1. The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

2. Any academic or technical publications that use or reference this software must cite:
   ```
   Pan, William. (2025). Systolic Array Simulator. GitHub Repository.
   https://github.com/wp4032/william-pan.com
   ```

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Author
William Pan - [GitHub](https://github.com/wp4032) - [Website](https://william-pan.com)