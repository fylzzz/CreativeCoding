let xSlider;
let ySlider;
let pauseButton;
let buttonLabel = "Pause";

function setup() {
    createCanvas(windowWidth, windowHeight);

    ball = new Ball(windowWidth/2, windowHeight/2);

    xSlider = createSlider(0, 10, 1);
    xSlider.position(20, 580);
    ySlider = createSlider(0, 10, 1);
    ySlider.position(20, 560);

    pauseButton = createButton(buttonLabel);
    pauseButton.position(20, 20);
    pauseButton.mouseClicked(pauseClicked);
}

function draw() {
    background(220);

    ball.updateBall(xSlider.value(), ySlider.value());
    ball.renderBall();
}

function pauseClicked() {
    if (buttonLabel == "Pause") {
        ball.pauseBall();
        buttonLabel = "Play";
    } else if (buttonLabel == "Play") {
        ball.resumeBall();
        buttonLabel = "Pause";
    }
    pauseButton.html(buttonLabel);
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xVel = 1;
        this.yVel = 1;
    }

    renderBall() {
        fill(255, 0, 0);
        circle(this.x, this.y, 20);
        console.debug(this.x, this.y);
    }

    updateBall(xSpeed, ySpeed) {
        this.x += this.xVel * xSpeed;
        this.y += this.yVel * ySpeed;

        if (this.x >= windowWidth - 10 || this.x <= 10) this.xVel *= -1;
        if (this.y >= windowHeight - 10 || this.y <= 10) this.yVel *= -1;
    }

    pauseBall() {
        this.storedxVel = this.xVel;
        this.storedyVel = this.yVel;
        this.xVel = 0;
        this.yVel = 0;
    }

    resumeBall() {
        this.xVel = this.storedxVel;
        this.yVel = this.storedyVel;
    }
}