let object;

function preload() {
    loadModel('/assets/cube.obj', true, handleModel, handleError);
}

function setup() {
    createCanvas(800, 600, WEBGL);
}

function draw() {
    if(!object) {
        console.error("Unable to load object");
        
        return;
    }

    background(220);

    model(object);
}

function handleModel(data) {
    object = data;
    console.log(object.gid);
}

function handleError(error) {
    console.error(error);
}