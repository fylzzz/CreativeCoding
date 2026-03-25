//let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw() {
    //background(255);

    //circles.forEach(c => c.render());
}

function mouseClicked() {
    //circles.push(new Circle(mouseX, mouseY))
    fill(random(255), random(255), random(255));
    circle(mouseX, mouseY, random(20,100));
}

/*class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.d = random(20, 100);
        this.c = color(random(255), random(255), random(255));
    }

    render() {
        fill(this.c);
        circle(this.x, this.y, this.d);
    }
}*/