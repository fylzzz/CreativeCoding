function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    background(3, 28, 75);

    translate(windowWidth/2, windowHeight/2);

    //lantern glow
    fill(255, 255, 0, 100);
    circle(0, 0, 200);
    fill(255, 255, 0, 75);
    circle(0, 0, 220);
    fill(255, 255, 0, 50);
    circle(0, 0, 240);

    //lantern body
    rectMode(CENTER);
    fill(50);
    rect(0, 0, 100, 170, 20);
    fill(100);
    rect(0, -80, 150, 30, 20);
    fill(255, 255, 0, 100);
    rect(0, 0, 50, 120, 20)

    //fireflies
    renderFirefly(200, 200, 0.01);
    renderFirefly(350, 200, -0.03);
    renderFirefly(300, 300, 0.005);
    renderFirefly(200, 300, -0.01);
}

function renderFirefly(xPos, yPos, speed) {
    push();
    let angle = frameCount * speed;
    rotate(angle);
    
    fill(255, 0, 0, 255);
    circle(xPos, yPos, 20);
    fill(255, 255, 0, 200);
    circle(xPos, yPos, 30);
    fill(255, 255, 0, 100);
    circle(xPos, yPos, 40);
    pop();
}