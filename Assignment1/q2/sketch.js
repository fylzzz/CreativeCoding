let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);

    circles.forEach(c => c.show());
}

function mouseClicked() {
    circles.push(new Circle(mouseX, mouseY))
}

class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.d = random(20, 100);
        this.c = color(random(255), random(255), random(255));
    }

    show() {
        fill(this.c);
        circle(this.x, this.y, this.d);
    }
}