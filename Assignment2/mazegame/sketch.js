let tileArray = [];
let TILE_SIZE;

function preload() {
    mapData = loadStrings('assets/maze.txt');

    floorSprite = loadImage('assets/grass.png');
    wallSprite = loadImage('assets/cobble.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    tileArray = mapData.map(line => line.split(''));

    //ensure map fits to screen
    if (tileArray.length > tileArray[0].length) {
        TILE_SIZE = windowHeight/tileArray.length;
    } else {
        TILE_SIZE = windowWidth/tileArray[0].length;
    }

    for (let row = 0; row < tileArray.length; row++) {
        for (let col = 0; col < tileArray[row].length; col++) {
            let char = tileArray[row][col];
            console.log(`[${row}][${col}] = ${char}`);
            let sprite = createSprite(col * TILE_SIZE + TILE_SIZE / 2, row * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE);
            switch (tileArray[row][col]) {
                case '0':
                sprite.addImage(floorSprite);
                sprite.scale = TILE_SIZE / floorSprite.width;
                break;
                case '1':
                sprite.addImage(wallSprite);
                sprite.scale = TILE_SIZE / wallSprite.width;
                break;
                case '2':
                fill(0, 0, 255);
                break;
                case '3':
                fill(0, 0, 0);
                break;
            }
        }
    }
}

function draw() {
    background(220);
    
    /*for (let row = 0; row < tileArray.length; row++) {
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
    }*/
   drawSprites();
}
