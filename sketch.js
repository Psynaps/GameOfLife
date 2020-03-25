// Conways Game of Life
// @Michael Gunn



let grid;
let cols, rows;
let resolution = 40;
let runButton;
let run;

function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    runButton = createButton('Run');
    runButton.mousePressed(begin);
}

function draw() {
    background(255);
    frameRate(1);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(0);
                stroke(0);
            } else {
                fill(255);
                stroke(0);
            }
            rect(x, y, resolution, resolution);
        }
    }

    let next = make2DArray(cols, rows);

    // Compute next generation grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Count living neighbors
            let live = 0;
            let neighbors = countNeighbors(grid, i, j);
            if (grid[i][j] == 1) {
                if (neighbors < 2 || neighbors > 3) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = 1; // Cell Survives
                }
            } else {
                if (neighbors == 3) {
                    next[i][j] = 1; // Cell is born if it has exactly 3 neighbors
                } else {
                    next[i][j] = 0;
                }
            }
        }
    }
    grid = next;
}

// Returns the number of live neighbors for a cell (x, y) on the grid 
// TODO: Implement logic to allow neighbor counting to wrap around the
// edge of the screen to create endless projectiles
function countNeighbors(prev, x, y) {
    let sum = 0;
    for (let i = -1; i < 1; i++) {
        for (let j = -1; j < 1; j++) {
            sum += prev[(x + i + cols) % (cols)][(y + j + rows) % (rows)];
        }
    }
    sum -= prev[x][y]; // The above loop counts myself, which is not desired
    return sum;
}

function begin() {
    run = true;
}

// Creates a 2D array with the specified number of columns and rows, unitialized entries
// Grid indices will be (x, y) 
function make2DArray(cols, rows) {
    let arr = Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Array(rows);
    }
    return arr;
}