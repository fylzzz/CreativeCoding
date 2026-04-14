function preload() {
    mapData = loadStrings('/assets/map.txt');

}

function setup() {
    createCanvas(800, 600);
    print(mapData);
}

function draw() {
    background(220);
}
