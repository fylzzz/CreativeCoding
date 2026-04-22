let stationArray = [];
let mapData;
let mapImage;
let routeData;

function preload() {
    mapData = loadJSON('assets/railways.geojson');
    mapImage = loadImage('assets/map.png');
    routeData = loadStrings('assets/routes.txt');
}

function setup() {
    createCanvas(800, 600);

    loadStations();
}

function draw() {
    background(220);
}

function loadStations() {
    for (i = 0; i < mapData.features.length; i++) {
        let feature = mapData.features[i];
        let longitude = feature.geometry.coordinates[0];
        let latitude = feature.geometry.coordinates[1];
        
        if (152.946922527076 <= longitude <= 153.180247019681 && -27.6049449522395 <= latitude <= -27.3660874490119) {
        let station = new Station(
            feature.properties.NAME,
            longitude,
            latitude,
            feature.properties.RAILSTATIONSTATUS);
        
            stationArray.push(station);
            console.log(station);
        }
    }
}

class Station {
    constructor(name, x, y, status) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.status = status;
    }
}