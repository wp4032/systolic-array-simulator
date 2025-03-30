export class SystolicArray {
  width: number;
  height: number;
  weight_counter: number;
  cells: Array<Array<{ 
    left_input: number, 
    top_input: number, 
    weight: number, 
    acc: number 
  }>>;
  ifmap_buffer: Array<Array<number>>;
  weight_buffer: Array<Array<number>>;
  ofmap_buffer: Array<Array<number>>;
  accumulated_results: Array<number>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.weight_counter = 0;
    this.cells = Array.from({ length: height }, () =>
      Array.from({ length: width+1 }, () => ({
        left_input: 0,
        top_input: 0,
        weight: 0,
        acc: 0
      }))
    );
    this.ifmap_buffer = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    this.weight_buffer = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    this.ofmap_buffer = Array.from({ length: height }, () => Array.from({ length: width }, () => 0));
    this.accumulated_results = Array.from({ length: width }, () => 0);
  }

  load_ifmap(ifmap: Array<Array<number>>) {
    this.ifmap_buffer = ifmap;
    console.log('Loaded IFMAP:', this.ifmap_buffer);
  }

  load_weights(weights: Array<Array<number>>) {
    this.weight_buffer = weights;
    console.log('Loaded WEIGHTS:', this.weight_buffer);
  }

  step() {
    let inputs = Array.from({ length: this.height }, () => 0);
    let weights = Array.from({ length: this.width }, () => 0);

    
    // Load inputs and weights
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if(x+y === this.weight_counter) {
          inputs[x] = this.ifmap_buffer[y][x];
          weights[x] = this.weight_buffer[y][x];
        }
      }
    }
    
    console.log('Step ', this.weight_counter, ' Inputs:', inputs);
    console.log('Step ', this.weight_counter, ' Weights:', weights);

    console.log(this.cells);
    // Shift weights from top and inputs from left
    for (let y = 0; y < this.height; y++) {
      for (let x = this.width; x > 0; x--) {
        this.cells[y][x].left_input = this.cells[y][x-1].left_input;
      }
    }

    // Move top accumulated value to bottom
    for (let x = 0; x < this.width; x++) {
      for (let y = this.height - 1; y > 0; y--) {
        this.cells[y][x].top_input = this.cells[y-1][x].acc;
      }
    }

    // Load new inputs
    for (let y = 0; y < this.height; y++) {
      this.cells[y][0].left_input = inputs[y] || 0;
    }

    // Load new weights from top left to bottom right
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if(x+y === this.weight_counter) {
          this.cells[y][x].weight = weights[x] || 0;
        }
      }
    }

    this.weight_counter++;

    // Compute MAC
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells[y][x].acc = this.cells[y][x].left_input * this.cells[y][x].weight + this.cells[y][x].top_input;
      }
    }

    // Accumulate the results
    for (let x = 0; x < this.width; x++) {
      this.accumulated_results[x] = this.cells[this.height-1][x].acc;
    }

    // Store the result in the ofmap buffer
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if(x+y === this.weight_counter - this.width) {
          this.ofmap_buffer[y][x] = this.accumulated_results[x];
        }
      }
    }
  }

  reverse_step() {
    // Decrement the weight counter first
    if (this.weight_counter > 0) {
      this.weight_counter--;
    } else {
      // Nothing to reverse if we're at the beginning
      return;
    }
    
    // Clear the current accumulated results at the bottom row
    for (let x = 0; x < this.width; x++) {
      if (x + (this.height - 1) === this.weight_counter) {
        this.accumulated_results[x] = 0;
      }
    }
    
    // Revert the ofmap buffer changes
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (x + y === this.weight_counter - this.width + 1) {
          this.ofmap_buffer[y][x] = 0;
        }
      }
    }
    
    // Revert MAC operations
    for (let y = this.height - 1; y >= 0; y--) {
      for (let x = this.width - 1; x >= 0; x--) {
        // Store the current top_input before reverting
        const current_top_input = this.cells[y][x].top_input;
        
        // Revert the accumulation
        this.cells[y][x].acc = 0;
        
        // Shift inputs right (reverse of shifting left)
        if (x < this.width - 1) {
          this.cells[y][x + 1].left_input = 0;
        }
        
        // Shift top inputs up (reverse of shifting down)
        if (y > 0) {
          this.cells[y][x].top_input = 0;
        }
        
        // Clear weights that were loaded in this step
        if (x + y === this.weight_counter) {
          this.cells[y][x].weight = 0;
        }
      }
    }
    
    // Clear inputs that were loaded in this step
    for (let y = 0; y < this.height; y++) {
      if (y === this.weight_counter) {
        this.cells[y][0].left_input = 0;
      }
    }
    
    // Restore the previous state based on the current weight_counter
    // This is a simplified approach - for a complete reverse, you would need to store previous states
    let inputs = Array.from({ length: this.height }, () => 0);
    let weights = Array.from({ length: this.width }, () => 0);
    
    // Load appropriate inputs and weights for the current counter
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (x + y === this.weight_counter) {
          inputs[y] = this.ifmap_buffer[y][x];
          weights[y] = this.weight_buffer[y][x];
        }
      }
    }
    
    // Recompute the current state
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (x + y <= this.weight_counter) {
          this.cells[y][x].acc = this.cells[y][x].left_input * this.cells[y][x].weight + this.cells[y][x].top_input;
        }
      }
    }
    
    console.log('Reversed to step:', this.weight_counter);
  }

  reset() {
    console.log('=== Resetting Array ===');
    this.cells = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width + 1 }, () => ({
        left_input: 0,
        top_input: 0,
        weight: 0,
        acc: 0
      }))
    );
    this.weight_counter = 0;
    this.ifmap_buffer = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => 0));
    this.weight_buffer = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => 0));
    this.ofmap_buffer = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => 0));
    this.accumulated_results = Array.from({ length: this.width }, () => 0);
  }

  printState() {
    console.log('\nCurrent Array State:');
    for (let y = 0; y < this.height; y++) {
      let row = '';
      for (let x = 0; x < this.width; x++) {
        const cell = this.cells[y][x];
        row += `[i:${cell.left_input.toFixed(2)} t:${cell.top_input.toFixed(2)} w:${cell.weight.toFixed(2)} acc:${cell.acc.toFixed(2)}] `;
      }
      console.log(row);
    }
    console.log('Accumulated Results:', this.accumulated_results);
    console.log('OFMAP:', this.ofmap_buffer);
    console.log('\n');
  }

  checkResult() {
    
    const ifmap_flat = this.ifmap_buffer.flat();
    const weight_flat = this.weight_buffer.flat();
    
    const ofmap_calculated = Array.from({ length: this.height }, () => Array(this.width).fill(0));

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        for (let k = 0; k < this.width; k++) {
          ofmap_calculated[y][x] += ifmap_flat[y * this.width + k] * weight_flat[k * this.width + x];
        }
      }
    }

    let correct = true;
    // Compare calculated OFMAP with the stored OFMAP
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.ofmap_buffer[y][x] !== ofmap_calculated[y][x]) {
          console.error(`Mismatch at OFMAP[${y}][${x}]: expected ${ofmap_calculated[y][x]}, got ${this.ofmap_buffer[y][x]}`);
          correct = false;
        }
      }
    }

    if(correct) {
      console.log('OFMAP check complete. No mismatches found.\n');
    }
  }
}
