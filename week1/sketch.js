let object;

function setup() {
    loadModel('/week1/assets/cube.obj', true, handleModel, handleError);
    createCanvas(800, 600, WEBGL);
}

function draw() {
    if(!object) {
        console.error("Unable to load object");      
        return;
    }

    background(220);
    //orbitControl(3, 3, 3);
    model(object);
}

function keyPressed() {
    switch(key) {
    case 'a':
        //console.log(key);
        rotateZ(-frameCount * 0.01);
        break;
    case 'd':
        rotateZ(frameCount * 0.01);
        break;
    default:
        break;
    }
}

function handleModel(data) {
    object = data;
    console.log(object.gid);
}

function handleError(error) {
    console.error(error);
}