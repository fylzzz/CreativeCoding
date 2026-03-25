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

    strokeWeight(10);
    textAlign(LEFT, CENTER);
    text((largest/5*1), padding-20, padding + graphHeight/5*4);
    text((largest/5*2), padding-20, padding + graphHeight/5*3);
    text((largest/5*3), padding-20, padding + graphHeight/5*2);
    text((largest/5*4), padding-20, padding + graphHeight/5*1);
    text((largest/5*5), padding-20, padding + graphHeight/5*0);

    strokeWeight(2);
    line(padding, padding + graphHeight/5*0, windowWidth-padding, padding + graphHeight/5*0);
    line(padding, padding + graphHeight/5*1, windowWidth-padding, padding + graphHeight/5*1);
    line(padding, padding + graphHeight/5*2, windowWidth-padding, padding + graphHeight/5*2);
    line(padding, padding + graphHeight/5*3, windowWidth-padding, padding + graphHeight/5*3);
    line(padding, padding + graphHeight/5*4, windowWidth-padding, padding + graphHeight/5*4);

    comedyBar();
    actionBar();
    romanceBar();
    dramaBar();
    scifiBar();
}

function comedyBar() {
    fill(255, 0, 0);
    rectMode(CORNERS);
    rect(padding+10, windowHeight-padding, padding+110, (windowHeight - padding - graphHeight/largest*comedy));
    text("Comedy", padding+30, windowHeight-padding+15);
}

function actionBar() {
    fill(0, 255, 0);
    rectMode(CORNERS);
    rect(padding+120, windowHeight-padding, padding+220, (windowHeight - padding - graphHeight/largest*action));
    text("Action", padding+140, windowHeight-padding+15);
}

function romanceBar() {
    fill(0, 0, 255);
    rectMode(CORNERS);
    rect(padding+230, windowHeight-padding, padding+330, (windowHeight - padding - graphHeight/largest*romance));
    text("Romance", padding+250, windowHeight-padding+15);
}

function dramaBar() {
    fill(255, 255, 0);
    rectMode(CORNERS);
    rect(padding+340, windowHeight-padding, padding+440, (windowHeight - padding - graphHeight/largest*drama));
    text("Drama", padding+360, windowHeight-padding+15);
}

function scifiBar() {
    fill(255, 0, 255);
    rectMode(CORNERS);
    rect(padding+450, windowHeight-padding, padding+550, (windowHeight - padding - graphHeight/largest*scifi));
    text("Sci-Fi", padding+470, windowHeight-padding+15);
}