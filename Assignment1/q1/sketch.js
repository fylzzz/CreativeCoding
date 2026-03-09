function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
}

function draw() {
    background(220);

    line(mouseX, 0, mouseX, windowHeight);
    line(0, mouseY, windowWidth, mouseY);

    let d = windowWidth/30;

    for(let i = 0; i < 4; i++)   {
        switch(i)   {
            case 0:
            case 2:
                fill(255, 0, 0);
                circle(mouseX, mouseY, d);
                break;
            case 1:
            case 3:
                fill(255, 255, 255);
                circle(mouseX, mouseY, d);
                break;
        default:
            break;
        }
        //console.log("draw circle " + i + " of size " + d);
        d -= 20;
    }
}
