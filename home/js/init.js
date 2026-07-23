// Initialize the map
const map = new maplibregl.Map({
    container: 'maps', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.44014, 34.07356], // Starting position [lng, lat]
    zoom: 16 // Starting zoom level
});





function addMarker(lat,lng,location,message,person, date){
    let popup_message = `<h2>${location}</h2> <h3>${person}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,message,person,location,date);
    return message
}

// creating not just the button but the whole testimonial chunk too
 function createButtons(lat,lng,message,person,location,date){
    //stuff i need to define in order to add things to portfolio section
    const portfolio = document.getElementById("portfolio");
    const wrapper = document.createElement("div");
    wrapper.classList.add("testimonyChunk");

    // all of da button stuffs
    const newButton = document.createElement("button"); 
    newButton.id = "button"+person;
    newButton.innerHTML = person;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.classList.add("button-17")
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: 18
        })
    });
   
    // make a new header w the location + date
    const heading = document.createElement("h4");
    heading.textContent = location + ", " + date; 

    // insert the testimonial text
    const paragraph = document.createElement("p");
    paragraph.textContent = message; 

    // i don;t really know the guide online told me to do this. something about the divisions
    wrapper.appendChild(newButton);
    wrapper.appendChild(heading);
    wrapper.appendChild(paragraph);
    portfolio.appendChild(wrapper);
} 


function init(){
    addMarker(34.07308, -118.43896, "Shapiro Courtyard", "Here i experienced the world.", "Testimonial 1", "Spring 2024")
    addMarker(34.07489, -118.44007, "Franklin D. Murphy Sculpture Garden", "I read things here", "Testimonial 2", "Fall 2025")
    addMarker(34.07391, -118.44209, "Rolfe Court", "I planned things here", "Testimonial 3", "Winter 2024")
};

init();

