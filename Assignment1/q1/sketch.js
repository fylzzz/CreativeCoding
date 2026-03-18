function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
}

function draw() {
    background(220);

    let d = 80;

    line(mouseX, 0, mouseX, windowHeight);
    line(0, mouseY, windowWidth, mouseY);

    fill(255, 0, 0);
    circle(mouseX, mouseY, d);
    d -= 20;
    fill(255);
    circle(mouseX, mouseY, d);
    d -= 20;
    fill(255, 0, 0);
    circle(mouseX, mouseY, d);
    d -= 20;
    fill(255);
    circle(mouseX, mouseY, d);

    /*for(let i = 0; i < 4; i++) {
        if(i % 2 == 0) {
            fill(255,0,0);
        }
        else {
            fill(255)
        }
        circle(mouseX, mouseY, d);
        d -= 20;
        //console.log("draw circle " + i + " of size " + d);
        
    }*/
}
