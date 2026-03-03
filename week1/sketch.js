let object;

function preload() {
    //object = loadModel('/assets/Lightning.obj', true, handleModel, handleError);
    fetch('/assets/Lightning.obj')
        .then(r => r.text())
        .then(text => {
            console.log('File size:', text.length, 'chars');
            console.log('First 200 chars:', text.substring(0, 200));
        });
}

function setup() {
    createCanvas(800, 600, WEBGL);
}

function draw() {
    if(!object) return;

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