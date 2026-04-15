let tileArray = [];

function preload() {
    mapData = loadStrings('assets/maze.txt');

    floorSprite = loadImage('assets/grass.png');
    wallSprite = loadImage('assets/cobble.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    tileArray = mapData.map(line => line.split(''));

    TILE_SIZE = tileArray.length;

    for (let row = 0; row < tileArray.length; row++) {
        for (let col = 0; col < tileArray[row].length; col++) {
            let char = tileArray[row][col];
            console.log(`[${row}][${col}] = ${char}`);
        }
    }
}

function draw() {
    background(220);
    
    for (let row = 0; row < tileArray.length; row++) {
        for (let col = 0; col < tileArray[row].length; col++) {
            switch (tileArray[row][col]) {
                case '0':
                fill(255, 0, 0);
                break;
                case '1':
                fill(0, 255, 0);
                break;
                case '2':
                fill(0, 0, 255);
                break;
                case '3':
                fill(0, 0, 0);
                break;
            }
            rect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}
