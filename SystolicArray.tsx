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
  prev_cells: Array<Array<Array<{ 
    left_input: number, 
    top_input: number, 
    weight: number, 
    acc: number 
  }>>>;
  prev_ifmap_buffer: Array<Array<Array<number>>>;
  prev_weight_buffer: Array<Array<Array<number>>>;
  prev_ofmap_buffer: Array<Array<Array<number>>>;
  prev_accumulated_results: Array<Array<number>>;

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
    // Saves the previous states as vectors
    this.prev_cells = [];
    this.prev_ifmap_buffer = [];
    this.prev_weight_buffer = [];
    this.prev_ofmap_buffer = [];
    this.prev_accumulated_results = [];
  }

  load_ifmap(ifmap: Array<Array<number>>) {
    if(this.ifmap_buffer) {
      this.prev_ifmap_buffer.push(JSON.parse(JSON.stringify(this.ifmap_buffer)));
    }
    this.ifmap_buffer = ifmap;
  }

  load_weights(weights: Array<Array<number>>) {
    if(this.weight_buffer) {
      this.prev_weight_buffer.push(JSON.parse(JSON.stringify(this.weight_buffer)));
    }
    this.weight_buffer = weights;
  }

  step() {
    console.log('Stepping...', this.cells);
    
    const inputs = Array.from({ length: this.height }, () => 0);
    const weights = Array.from({ length: this.width }, () => 0);

    // Create deep copies of all buffers to preserve previous state
    this.prev_ifmap_buffer.push(JSON.parse(JSON.stringify(this.ifmap_buffer)));
    this.prev_weight_buffer.push(JSON.parse(JSON.stringify(this.weight_buffer)));
    this.prev_ofmap_buffer.push(JSON.parse(JSON.stringify(this.ofmap_buffer)));
    this.prev_accumulated_results.push([...this.accumulated_results]);
    
    // Deep copy the cells structure and append to history
    this.prev_cells.push(Array.from({ length: this.height }, (_, y) =>
      Array.from({ length: this.width+1 }, (_, x) => ({
        left_input: this.cells[y][x].left_input,
        top_input: this.cells[y][x].top_input,
        weight: this.cells[y][x].weight,
        acc: this.cells[y][x].acc
      }))
    ));

    console.log('Stepping...', this.prev_cells);
    
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
    if(this.weight_counter >= 0) {
      this.weight_counter--;
      this.cells = this.prev_cells.pop() || [];
      this.ifmap_buffer = this.prev_ifmap_buffer.pop() || [];
      this.weight_buffer = this.prev_weight_buffer.pop() || [];
      this.ofmap_buffer = this.prev_ofmap_buffer.pop() || [];
      this.accumulated_results = this.prev_accumulated_results.pop() || [];
    }
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
    this.prev_cells = [];
    this.prev_ifmap_buffer = [];
    this.prev_weight_buffer = [];
    this.prev_ofmap_buffer = [];
    this.prev_accumulated_results = [];
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
