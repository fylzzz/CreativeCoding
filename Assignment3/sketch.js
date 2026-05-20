let playerObj;
let bulletObj = [];
let enemyObj = [];

let sceneList = [];
let currentScene;
let finishScreenReady = false;
let startGameReady = false;

let menuButton;
let endButton;

let shipSprite;
let bgVideo;
let videoStarted = false;

let lastSpawn = 0;
const spawnTimer = 5000;

let score = 0;
let missed = 0;
let playTime = 0;
let loadStartTime = 0;
let gameStartTime = 0;

function preload() {
    shipSprite = loadImage('assets/ship.png');
    scoresheet = loadJSON('assets/scoresheet.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bgVideo = createVideo('assets/backgroundvideo.mp4');
    bgVideo.hide();
    bgVideo.volume(0);  

    sceneList = ["menu", "load", "main", "finish"];
    currentScene = sceneList[0];
    playerObj = new Player(windowWidth/2, windowHeight/1.2, 3);
    enemyObj.push(new Enemy(windowWidth/2, 10, 1));
}

function draw() {
    background(220);

    if (!videoStarted) {
        bgVideo.loop();
        videoStarted = true;
    }

    switch (currentScene) {
        case "menu":
            background(10);
            fill(255);
            textAlign(CENTER, CENTER)
            textSize(52);
            text("Asteroid Defender", windowWidth/2, windowHeight/3);

            if (!startGameReady) {
            menuButton = createButton("Start Game");
            menuButton.position(windowWidth/2, windowHeight/3 + 60);
            menuButton.style('transform', 'translateX(-50%)');
            menuButton.mousePressed(() => {
                menuButton.remove();
                currentScene = sceneList[1];
                });
            }
            startGameReady = true;
            break;
        case "load":
            if (!loadStartTime) loadStartTime = millis();
            if (millis() - loadStartTime >= 5000) {
                loadStartTime = 0;
                gameStartTime = millis();
                resetGame();
                currentScene = sceneList[2];
            }
            background(10);
            fill(255);
            textAlign(CENTER, CENTER);
            text("Loading...", windowWidth/2, windowHeight/2);
            break;
        case "main":
            // -------------------
            // Polling
            // -------------------
            handleInput(playerObj);

            // -------------------
            // Update
            // -------------------
            if (millis() - lastSpawn >= spawnTimer) {
                spawnEnemy();
                lastSpawn = millis();
            }

            playTime = millis() - gameStartTime;

            bulletObj = bulletObj.filter(b => {
                if (b.y < -20) return false;

                for (let i = enemyObj.length - 1; i >= 0; i--) {
                    let e = enemyObj[i];
                    if (dist(b.x, b.y, e.x, e.y) < 15) {
                        e.health--;
                        if (e.health <= 0) {
                            e.sprite.remove();
                            enemyObj.splice(i, 1);
                            score += 500;
                        }
                        return false;
                    }
                }
                return true;
            });

            enemyObj = enemyObj.filter(e => {
                if (e.y > windowHeight + 20) {
                    e.sprite.remove();
                    missed++;
                    return false;
                }
                return true;
            });

            if (missed >= 3) {
                currentScene = sceneList[3];
                finishScreenReady = false;
            }

            // -------------------
            // Render
            // -------------------
            image(bgVideo, 0, 0, windowWidth, windowHeight);

            playerObj.render();
            enemyObj.forEach(e => e.render());
            bulletObj.forEach(b => b.render());

            fill(10);
            rect(windowWidth/1.5, 0, (windowWidth-windowWidth/1.5), windowHeight);
            fill(255);
            textSize(52);
            text("SCORE: " + score, windowWidth/1.5 + 50, 100, (windowWidth-windowWidth/1.5-50), 100);
            text("TIME: " + (playTime/1000).toFixed(4), windowWidth/1.5 + 50, 200, (windowWidth-windowWidth/1.5-50), 100);
            text("MISSED: " + missed, windowWidth/1.5 + 50, 300, (windowWidth-windowWidth/1.5-50), 100);

            drawSprites();

            break;
        case "finish":
            background(10);
            fill(255);
            textAlign(CENTER, CENTER)
            textSize(52);
            text("Game Over", windowWidth/2, windowHeight/3);

            text("Hi-Score:", windowWidth/2, windowHeight/2);
            textSize(36);
            text("Date: " + scoresheet.date + "/" + scoresheet.month, windowWidth/2, windowHeight/2 + 50);
            text("Score: " + scoresheet.score, windowWidth/2, windowHeight/2 + 80);
            text("Time: " + scoresheet.time.toFixed(4), windowWidth/2, windowHeight/2 + 110);

            if (!finishScreenReady) {
                let data = { month: month(), date: day(), score: score, time: (playTime/1000) };
                saveJSON(data, 'scoresheet.json');

                endButton = createButton("Return to Menu");
                endButton.position(windowWidth/2, windowHeight/3 + 60);
                endButton.style('transform', 'translateX(-50%)');
                endButton.mousePressed(() => {
                    endButton.remove();
                    startGameReady = false;
                    currentScene = sceneList[0];
                });

                finishScreenReady = true;
            }
    }
}

function resetGame() {
    score = 0;
    missed = 0;
    playTime = 0;
    lastSpawn = 0;
    bulletObj = [];
    enemyObj.forEach(e => e.sprite.remove());
    enemyObj = [];
    playerObj.x = windowWidth / 2;
    playerObj.y = windowHeight / 1.2;
}

function spawnEnemy() {
    enemyObj.push(new Enemy(random(0, windowWidth/1.5), 0, 1));
}

function handleInput(player) {
    if (keyIsDown(65)) {
        player.x -= player.speed;
    }
    if (keyIsDown(68)) {
        player.x += player.speed;
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

        this.sprite = createSprite(x, y, 20, 20);
    }

    render() {
        this.y += this.speed;
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
    }
}