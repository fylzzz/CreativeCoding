let comedy = 6;
let action = 8;
let romance = 3;
let drama = 5;
let scifi = 4;

let largest;

let padding;

function setup() {
    createCanvas(windowWidth, windowHeight);
    padding = windowWidth/10;
    largest = max(comedy, action, romance, drama, scifi);

    while(largest % 5 != 0) {
        largest++;
    }
    //console.log(largest);
}

function draw() {
    background(220);

    fill(0);
    drawGraph();
}

function drawGraph() {
    graphHeight = windowHeight-padding*2;
    strokeWeight(5);
    line(padding, padding, padding, windowHeight-padding);
    line(padding, windowHeight-padding, windowWidth-padding, windowHeight-padding);
    strokeWeight(2);
    for(i = 0; i <= 5; i++) {
        line(padding, padding + graphHeight/5*i, windowWidth-padding, padding + graphHeight/5*i);
    }
}