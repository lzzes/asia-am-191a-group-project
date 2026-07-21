// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.44014, 34.07356], // Starting position [lng, lat]
    zoom: 16 // Starting zoom level
});




function idiot(p1, p2){
    console.log("idiot 1 is: " + p1, "and idiot 2 is: " + p2);
}

//eventlister.. can't put it at the bottom?
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    if (getRandomInt(3) == 0){
        map.flyTo({
            center: [-118.43896,34.07308],
            zoom: 18
        })
        console.log("law")
    }
    else {
         if (getRandomInt(3) == 1){
            map.flyTo({
            center: [-118.44007,34.07489],
            zoom: 18,
            })
            console.log("scult")
         }
         else {
            map.flyTo({
            center: [-118.44209, 34.07391],
            zoom: 18
            })
            console.log("rolfe")
         }
    }
});


function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
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
        })
    });
    console.log("girl. i got this far.")
    document.getElementById("contents").appendChild(newButton);
    console.log("somehow can't get here.")
} 


function init(){
    addMarker(34.07308, -118.43896, "Shapiro Courtyard", "The law school courtyard! Lots of seats + shade from beautiful trees!")
    addMarker(34.07489, -118.44007, "Franklin D. Murphy Sculpture Garden", "Serene and full of art!")
    addMarker(34.07391, -118.44209, "Rolfe Court", "Seating, trees overhead for shade, and usually empty!")
};

init();

