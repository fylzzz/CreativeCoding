let playerObj;
let bulletObj = [];
let enemyObj = [];

let sceneList = [];
let currentScene;
let finishScreenReady = false;
let startGameReady = false;

let font;

let menuButton;
let endButton;

let laserSound;
let asteroidSound;
let deathSound
let bgm;

let shipSprite;
let laserSprite;
let astSprite1;
let astSprite2;
let astSprite3;
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
    laserSprite = loadImage('assets/laser.png');
    astSprite1 = loadImage('assets/asteroid1.png');
    astSprite2 = loadImage('assets/asteroid2.png');
    astSprite3 = loadImage('assets/asteroid3.png');

    scoresheet = loadJSON('assets/scoresheet.json');

    laserSound = loadSound('assets/laser.wav');
    asteroidSound = loadSound('assets/asteroid.wav');
    deathSound = loadSound('assets/ship.wav');
    bgm = loadSound('assets/bgm.wav');

    font = loadFont('assets/font.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noSmooth();

    textFont(font);

    bgVideo = createVideo('assets/backgroundvideo.mp4');
    bgVideo.hide();
    bgVideo.volume(0);

    bgm.loop();

    sceneList = ["menu", "load", "main", "finish"];
    currentScene = sceneList[0];
    playerObj = new Player(windowWidth/2, windowHeight - 20, 3);
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
            menuButton = createButton("START GAME");
            menuButton.size(200, 100);
            menuButton.position(windowWidth/2, windowHeight/3 + 60);
            menuButton.addClass('button');
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
                bgm.play();
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
                if (b.y < -20) { 
                    b.sprite.remove();    
                    return false;
                }

                for (let i = enemyObj.length - 1; i >= 0; i--) {
                    let e = enemyObj[i];
                    if (dist(b.x, b.y, e.x, e.y) < 40) {
                        e.health--;
                        b.sprite.remove();
                        if (e.health <= 0) {
                            enemyObj.splice(i, 1);
                            e.handleDeath();
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
                if (dist(e.x, e.y, playerObj.x, playerObj.y) < 60) {
                    e.sprite.remove();
                    bgm.stop();
                    deathSound.play();
                    currentScene = sceneList[3];
                    finishScreenReady = false;
                    return false;
                }
                return true;
            });

            if (missed >= 3) {
                bgm.stop();
                deathSound.play();
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

            let currentEntry = { month: month(), date: day(), score: score, time: (playTime/1000) };

            // Best from saved scoresheet
            let savedBest = Array.isArray(scoresheet)
                ? scoresheet.reduce((best, s) => s.score > best.score ? s : best, scoresheet[0])
                : scoresheet;

            // Show whichever is higher
            let hiScore = currentEntry.score > savedBest.score ? currentEntry : savedBest;

            text("Hi-Score:", windowWidth/2, windowHeight/2);
            textSize(36);
            text("Date: " + hiScore.date + "/" + hiScore.month, windowWidth/2, windowHeight/2 + 50);
            text("Score: " + hiScore.score, windowWidth/2, windowHeight/2 + 80);
            text("Time: " + hiScore.time.toFixed(4), windowWidth/2, windowHeight/2 + 110);

            if (!finishScreenReady) {
                let data = { month: month(), date: day(), score: score, time: (playTime/1000) };

                endButton = createButton("Return to Menu");
                endButton.position(windowWidth/2, windowHeight/3 + 60);
                endButton.addClass('button');
                endButton.style('transform', 'translateX(-50%)');
                endButton.mousePressed(() => {
                    endButton.remove();
                    let updatedSheet = Array.isArray(scoresheet) ? scoresheet : [scoresheet];
                    updatedSheet.push(currentEntry);
                    scoresheet = updatedSheet;
                    saveJSON(updatedSheet, 'scoresheet.json');
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
    enemyObj.push(new Enemy(random(0, windowWidth/1.5), 0, 1, floor(random(1, 4))));
}

function handleInput(player) {
    if (keyIsDown(65)) {
        player.x -= player.speed;
    }
    if (keyIsDown(68)) {
        player.x += player.speed;
    }

    const halfW = player.sprite.width / 2;
    player.x = constrain(player.x, halfW, windowWidth / 1.5 - halfW);

    if (mouseIsPressed && mouseButton == LEFT && millis() - player.lastShot > player.shootCooldown) {
        bulletObj.push(new Bullet(player.x, player.y - player.sprite.height/2));
        laserSound.play();
        player.lastShot = millis();
    }
}

class Player {
    constructor(x, y, lives) {
        this.x = x;
        this.y = y;
        this.lives = lives;
        this.speed = 5;

        this.lastShot = 0;
        this.shootCooldown = 200;

        this.sprite = createSprite(x, y, 64, 64);
        this.sprite.scale = 4;
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

        this.sprite = createSprite(x, y, 64, 64);
        this.sprite.scale = 4;
        this.sprite.addImage(laserSprite);
    }

    render() {
        this.y -= this.speed;
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
    }
}

class Enemy {
    constructor(x, y, health, type) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.type = type;

        this.sprite = createSprite(x, y, 20, 20);
        this.sprite.scale = 4;
        switch(type) {
            case 1:
                this.sprite.addImage(astSprite1);
                this.speed = 1;
                break;
            case 2:
                this.sprite.addImage(astSprite2);
                this.speed = 2;
                break;
            case 3:
                this.sprite.addImage(astSprite3);
                this.speed = 3;
                break;
        }
        
    }

    render() {
        this.y += this.speed;
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
    }

    handleDeath() {
        switch(this.type) {
            case 1:
                enemyObj.push(new Enemy(this.sprite.position.x - 40, 0, 1, 2));
                enemyObj.push(new Enemy(this.sprite.position.x + 40, 0, 1, 2));
                break;
            case 2:
                enemyObj.push(new Enemy(this.sprite.position.x - 40, 0, 1, 3));
                enemyObj.push(new Enemy(this.sprite.position.x + 40, 0, 1, 3));
                break;
            case 3:
                break;
        }
        asteroidSound.play();
        this.sprite.remove();
    }
}