let tileArray = [];
let TILE_SIZE;
let startX;
let startY
let player;
let walls
let endTile

function preload() {
    mapData = loadStrings('assets/maze.txt');

    floorSprite = loadImage('assets/grass.png');
    wallSprite = loadImage('assets/cobble.png');
    startSprite = loadImage('assets/planks.png');
    endSprite = loadImage('assets/diamond.png');
    playerSprite = loadImage('assets/player.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    tileArray = mapData.map(line => line.split(''));
    walls = new Group();

    //ensure map fits to screen
    if (tileArray.length > tileArray[0].length) {
        TILE_SIZE = windowHeight/tileArray.length;
    } else {
        TILE_SIZE = windowWidth/tileArray[0].length;
    }

    //iterate through tile map and set sprites
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
                sprite.width = TILE_SIZE;
                sprite.height = TILE_SIZE;
                sprite.immovable = true;
                walls.add(sprite);
                break;
                case '2':
                sprite.addImage(startSprite);
                sprite.scale = TILE_SIZE / startSprite.width;
                startX = col * TILE_SIZE + TILE_SIZE / 2;
                startY = row * TILE_SIZE + TILE_SIZE / 2;
                break;
                case '3':
                sprite.addImage(endSprite);
                sprite.scale = TILE_SIZE / endSprite.width;
                endTile = sprite;
                break;
            }
        }
    }

    //setup player sprite
    player = createSprite(startX, startY, TILE_SIZE, TILE_SIZE);
    player.addImage(playerSprite);
    player.scale = TILE_SIZE / playerSprite.width;
    player.width = TILE_SIZE * 0.7;
    player.height = TILE_SIZE * 0.7;
    player.bounciness = 1;
}

function draw() {
    background(220);
    
    //wait until player is ready
    if(!player) return;

    //handle user input
    if(keyIsDown(87)) {
        player.velocity.y = -3;
        player.rotation = 90;
    }
    if(keyIsDown(83)) {
        player.velocity.y = 3;
        player.rotation = 270;
    }
    if(keyIsDown(65)) {
        player.velocity.x = -3;
        player.rotation = 0;
    }
    if(keyIsDown(68)) {
        player.velocity.x = 3;
        player.rotation = 180; 
    }

    if (!keyIsDown(87) && !keyIsDown(83)) player.velocity.y = 0;
    if (!keyIsDown(65) && !keyIsDown(68)) player.velocity.x = 0;

    //check for collisions with walls and bounce off
    player.bounce(walls);

    //check if player has reached goal and reset
    if(player.overlap(endTile)) {
        player.position.x = startX;
        player.position.y = startY; 
    }

    drawSprites();
}