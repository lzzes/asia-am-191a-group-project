// Declare global variables


const mapOptions = {
    "zoom": 15,
    "center" : [-118.442199,34.072225],
}

// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapOptions.center,
    zoom: mapOptions.zoom
});

function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}


let results;
map.on('load',function(){
    console.log("girl. it's loaded.")
    fetch('untitled.geojson')
         .then(data =>{
            return data.json();
    })
         .then(data =>{
            console.log(data)
            data.features.forEach(processData);
    })
});

function processData(result){
    console.log(result)
    let longitude = result.geometry.coordinates[0]
    let latitude = result.geometry.coordinates[1]
    let title = result.properties.place
    let color = result.properties.color
    let description = result.properties.description
    addMarker(latitude,longitude,title,description)
}


function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.classList.add("button-17")
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: 18

        })
    })
    document.getElementById("contents").appendChild(newButton);
}




//.forEach => 
//to add to arrays use arrayName.push(thing)