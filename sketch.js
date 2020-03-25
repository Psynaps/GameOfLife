// Conways Game of Life
// @Michael Gunn



let grid;
let cols, rows;
let resolution = 10;
let runButton;
let seedButton, testButton, clearButton, pulsarButton;
let speedSlider;
let run;

function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // grid[i][j] = floor(random(2));
            grid[i][j] = 0;
        }
    }

    seedButton = createButton('Random Seed');
    seedButton.mousePressed(randomInit);
    seedButton.position(60, height + 5);

    runCheckbox = createCheckbox('Run', false);
    runCheckbox.changed(runChecked);

    l1 = createP('Speed:');
    l1.position(170, height - 10);

    speedSlider = createSlider(1, 5, 2, 1);
    speedSlider.position(215, height + 4);

    clearButton = createButton('Clear');
    clearButton.mousePressed(clearGrid);
    clearButton.position(355, height + 5);

    clearButton = createButton('Pulsar');
    clearButton.mousePressed(pulsar);
    clearButton.position(415, height + 5);
    run = false;

}

function draw() {
    background(255);
    frameRate(speedSlider.value());
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
    // console.log('x');

    run = runCheckbox.checked();
    if (run) {
        // console.log('y');
        let next = make2DArray(cols, rows);
        // Compute next generation grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                // Count living neighbors
                let neighbors = countNeighbors(grid, i, j);
                let state = grid[i][j];
                if (grid[i][j] == 1) {
                    if (neighbors < 2 || neighbors > 3) {
                        next[i][j] = 0; // Cell dies from over or underpopulation 
                    } else {
                        next[i][j] = 1; // Cell survives
                    }
                } else {
                    if (neighbors == 3) {
                        next[i][j] = 1; // Cell is born if it has exactly 3 neighbors
                    } else {
                        next[i][j] = 0; // Cell remains dead
                    }
                }

                // if (state == 0 && neighbors == 3) {
                //     next[i][j] = 1;
                // } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                //     next[i][j] = 0;
                // } else {
                //     next[i][j] = state;
                // }
            }
        }
        grid = next;
    }
}

// Sets the cell clicked on to be alive
function mousePressed() {

    let col = floor(mouseX / resolution);
    let row = floor(mouseY / resolution);
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
        grid[col][row] = grid[col][row] ? 0 : 1;
    }
}

// Returns the number of live neighbors for a cell (x, y) on the grid 
// TODO: Implement logic to allow neighbor counting to wrap around the
// edge of the screen to create endless projectiles
function countNeighbors(prev, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            sum += prev[(x + i + cols) % (cols)][(y + j + rows) % (rows)];
        }
    }
    sum -= prev[x][y]; // The above loop counts myself, which is not desired
    return sum;
}

// Begin evolution
function begin() {
    run = true;
    console.log('begin');
}

// Reinitializes the grid with a random distribution of 0's and 1's
function randomInit() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

// Sets all cells in the grid to 0
function clearGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
}

// Clears the grid and creates a pulsar
function pulsar() {
    let centerX = floor(cols / 2);
    let centerY = floor(rows / 2);

    clearGrid();
    grid[centerX + 1][centerY + 2] = 1;
    grid[centerX + 1][centerY + 3] = 1;
    grid[centerX + 1][centerY + 4] = 1;

    grid[centerX + 2][centerY + 6] = 1;
    grid[centerX + 3][centerY + 6] = 1;
    grid[centerX + 4][centerY + 6] = 1;

    grid[centerX + 3][centerY + 1] = 1;
    grid[centerX + 2][centerY + 1] = 1;
    grid[centerX + 4][centerY + 1] = 1;

    grid[centerX + 6][centerY + 2] = 1;
    grid[centerX + 6][centerY + 3] = 1;
    grid[centerX + 6][centerY + 4] = 1;



    grid[centerX - 1][centerY + 2] = 1;
    grid[centerX - 1][centerY + 3] = 1;
    grid[centerX - 1][centerY + 4] = 1;

    grid[centerX - 2][centerY + 6] = 1;
    grid[centerX - 3][centerY + 6] = 1;
    grid[centerX - 4][centerY + 6] = 1;

    grid[centerX - 3][centerY + 1] = 1;
    grid[centerX - 2][centerY + 1] = 1;
    grid[centerX - 4][centerY + 1] = 1;

    grid[centerX - 6][centerY + 2] = 1;
    grid[centerX - 6][centerY + 3] = 1;
    grid[centerX - 6][centerY + 4] = 1;




    grid[centerX + 1][centerY - 2] = 1;
    grid[centerX + 1][centerY - 3] = 1;
    grid[centerX + 1][centerY - 4] = 1;

    grid[centerX + 2][centerY - 6] = 1;
    grid[centerX + 3][centerY - 6] = 1;
    grid[centerX + 4][centerY - 6] = 1;

    grid[centerX + 3][centerY - 1] = 1;
    grid[centerX + 2][centerY - 1] = 1;
    grid[centerX + 4][centerY - 1] = 1;

    grid[centerX + 6][centerY - 2] = 1;
    grid[centerX + 6][centerY - 3] = 1;
    grid[centerX + 6][centerY - 4] = 1;



    grid[centerX - 1][centerY - 2] = 1;
    grid[centerX - 1][centerY - 3] = 1;
    grid[centerX - 1][centerY - 4] = 1;

    grid[centerX - 2][centerY - 6] = 1;
    grid[centerX - 3][centerY - 6] = 1;
    grid[centerX - 4][centerY - 6] = 1;

    grid[centerX - 3][centerY - 1] = 1;
    grid[centerX - 2][centerY - 1] = 1;
    grid[centerX - 4][centerY - 1] = 1;

    grid[centerX - 6][centerY - 2] = 1;
    grid[centerX - 6][centerY - 3] = 1;
    grid[centerX - 6][centerY - 4] = 1;

}

function runChecked() {
    run = run ? false : true;
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