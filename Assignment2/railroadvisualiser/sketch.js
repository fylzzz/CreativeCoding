let stationArray = [];
let stationRouteData = [];
let mapData;
let mapImage;
let routeData;

function preload() {
    mapData = loadJSON('assets/railways.geojson');
    mapImage = loadImage('assets/map.png');
    routeData = loadStrings('assets/routes.txt');
}

function setup() {
    createCanvas(windowHeight, windowHeight);

    loadStations();
    stationRouteData = routeData.map(name => ({
        stations: name.split(', '),
        colour: color(random(255), random(255), random(255))
    }));
}

function draw() {
    background(220);
    image(mapImage, 0, 0, windowHeight, windowHeight);

    renderRoutes();
    stationArray.forEach(s => s.render());
    stationArray.forEach(s => s.hover());
}

function loadStations() {
    for (let i = 0; i < mapData.features.length; i++) {
        let feature = mapData.features[i];
        let longitude = feature.geometry.coordinates[0];
        let latitude = feature.geometry.coordinates[1];
        
        if (longitude >= 152.946922527076 && longitude <= 153.180247019681 &&
            latitude >= -27.6049449522395 && latitude <= -27.3660874490119) {
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

function renderRoutes() {
    strokeWeight(3);

    for (let i = 0; i < stationRouteData.length; i++) {
        let route = stationRouteData[i];
        stroke(route.colour);
        
        for (let j = 0; j < route.stations.length; j++) {
            let stationStart = stationArray.find(s => s.name === route.stations[j])
            let stationEnd = stationArray.find(s => s.name === route.stations[j + 1])

            if (stationStart && stationEnd) {
                line(stationStart.sx, stationStart.sy, stationEnd.sx, stationEnd.sy);
            }
        }
    }

    stroke(0);
    strokeWeight(1);
}

class Station {
    constructor(name, x, y, status) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.status = status;
        this.sx = 0;
        this.sy = 0;
    }

    render() {
        this.sx = map(this.x, 152.918755, 153.196618, 0, windowHeight);
        this.sy = map(this.y, -27.358992, -27.605666, 0, windowHeight);
        circle(this.sx, this.sy, 10);
    }

    hover() {
        let d = dist(mouseX, mouseY, this.sx, this.sy)
        if (d < 10) {
            if (this.sx > width/2 && this.sy > height/2) {
                rect(mouseX - 210, mouseY - 110, 200, 100);
                text("Name: " + this.name, mouseX - 210, mouseY - 105, 200, 100);
                text("Longitude: " + this.x, mouseX - 210, mouseY - 90, 200, 100);
                text("Latitude: " + this.y, mouseX - 210, mouseY - 75, 200, 100);
                text("Status: " + this.status, mouseX - 210, mouseY - 60, 200, 100);
            } else if (this.sx > width/2) {
                rect(mouseX - 210, mouseY + 10, 200, 100);
                text("Name: " + this.name, mouseX - 210, mouseY + 15, 200, 100);
                text("Longitude: " + this.x, mouseX - 210, mouseY + 30, 200, 100);
                text("Latitude: " + this.y, mouseX - 210, mouseY + 45, 200, 100);
                text("Status: " + this.status, mouseX - 210, mouseY + 60, 200, 100);
            } else if (this.sy > height/2) {
                rect(mouseX + 10, mouseY - 110, 200, 100);
                text("Name: " + this.name, mouseX + 10, mouseY - 105, 200, 100);
                text("Longitude: " + this.x, mouseX + 10, mouseY - 90, 200, 100);
                text("Latitude: " + this.y, mouseX + 10, mouseY - 75, 200, 100);
                text("Status: " + this.status, mouseX + 10, mouseY - 60, 200, 100);
            } else {
                rect(mouseX + 10, mouseY + 10, 200, 100);
                text("Name: " + this.name, mouseX + 10, mouseY + 15, 200, 100);
                text("Longitude: " + this.x, mouseX + 10, mouseY + 30, 200, 100);
                text("Latitude: " + this.y, mouseX + 10, mouseY + 45, 200, 100);
                text("Status: " + this.status, mouseX + 10, mouseY + 60, 200, 100);
            }
        }
    }
}