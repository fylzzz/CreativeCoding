let playerObj;
let bulletObj = [];

let sceneList = [];
let currentScene;

let shipSprite;

function preload() {
    shipSprite = loadImage('assets/ship.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    sceneList = ["menu", "load", "main", "finish"];
    currentScene = sceneList[2];
    playerObj = new Player(windowWidth/2, windowHeight/1.2, 3);
}

function draw() {
    background(220);

    switch (currentScene) {
        case "menu":
            break;
        case "load":
            break;
        case "main":
            handleInput(playerObj);
            playerObj.render();
            bulletObj.forEach(b => b.render());
            drawSprites();
            break;
        case "finish":
            break;
    }
}

function handleInput(player) {
    console.log("handling");
    if (keyIsDown(65)) {
        player.x -= player.speed;
        console.log("left");
    }
    if (keyIsDown(68)) {
        player.x += player.speed;
        console.log("right");
    }
    if (mouseIsPressed && mouseButton == LEFT && millis() - player.lastShot > player.shootCooldown) {
        bulletObj.push(new Bullet(player.x, player.y - player.sprite.height));
        player.lastShot = millis();
    }
}

class Player {
    constructor(x, y, lives) {
        this.x = x;
        this.y = y;
        this.lives = lives;
        this.speed = 3;

        this.lastShot = 0;
        this.shootCooldown = 200;

        this.sprite = createSprite(x, y, 64, 64);
        this.sprite.addImage(shipSprite);
    }

    render() {
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
    }
}

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
    }

    render() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, 10, 20);
        this.y -= this.speed;
    }
}

class Enemy {
    constructor(x, y, health) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.speed = 3;
    }

    render() {
        fill(255);
        circle(this.x, this.y, 10);
    }
}