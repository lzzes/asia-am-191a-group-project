// Declare global variables

/*let displayYear = 2023;

const btn = document.querySelector("#yr2023");
btn.addEventListener("click", () => {updateYear(2024)});

function updateYear(yr) {
    displayYear = yr;
    console.log("clicl");
    location.reload();
}*/

let mapOptions = {
    "zoom": 15,
    "center" : [-118.442199,34.072225],
}

let dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl_X4nqI_LmgvWzm_OMkH-uAkYyf3T8M5wxARgbjR30lbC7cfztoJ6gEvmC57nV7sks846j5uEtaS_/pub?gid=592139015&single=true&output=csv"

// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: mapOptions.center,
    zoom: mapOptions.zoom
});

map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: (results) => {
            processData(results.data);
        }
    });
});


function processData(results){
    let IDarray = new Array(30);

    let ID, lng, lat, location, action, date, repression, memory, call, form;
    results.forEach(feature => {
        console.log(feature)
        ID = feature.ID;
        lng = feature.lng;
        lat = feature.lat;
        location = feature["Mapping Location"];
        action = feature.Name;
        date = feature.Date;
        year = feature.Year;
        memory = feature["What was the most memorable part of the action? "];
        call = feature["Short Description/Call"];
        form = feature["Action Form"];

        repression = feature["Did the university engage or respond to this action in any way? "];
        if (repression == "Yes") {
            repression = feature["If yes, how? "];
        }
        /*if (year == displayYear) {*/
            //if testimonial exists AND the event has not already been added:
            if (memory != false && IDarray.includes(ID) == false){
                IDarray.push(ID);
                addTestimonial(lng,lat,ID,location,action,date,repression,memory,call, form);
            }
            //else if testimonial exists for an already-added event:
            else if (memory != false){
                repeatTestimonial(repression,memory, form);
            }
            //else, the action has no testimony
            else {
                addAction(lat,lng,location,action,date,call, form);
            }
        /*}*/
    });
}

function addTestimonial(lng,lat,ID,location,action,date,repression,memory,call, form){
    //stuff i need to define in order to add things to portfolio section
    const testimoniesDef = document.getElementById("testimonies");
    const wrapper = document.createElement("div");
    wrapper.classList.add("testimonyChunk");

    // all of da button stuffs
    const newButton = document.createElement("button"); 
    newButton.id = "button"+action;
    newButton.innerHTML = action;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.classList.add("button-17")
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: 19
        })
    });
   
    // make a new header w the location + date
    const heading3 = document.createElement("h4");
    heading3.textContent = location + ", " + date; 

    const desc = document.createElement("p");
    desc.textContent = call;

    const spacer = document.createElement("br");

    const heading4 = document.createElement("b");
    heading4.textContent = "One person testifies:"

    // insert paragraph of testimonial text
    const paragraph1 = document.createElement("p");
    paragraph1.textContent = 'Testified repression: ' + repression;

    // insert paragraph of testimonial text
    const paragraph2 = document.createElement("p");
    paragraph2.textContent = 'Testified memory: "' + memory + '"';

    // i don;t really know the guide online told me to do this. something about the divisions
    wrapper.appendChild(newButton);
    wrapper.appendChild(heading3);
    wrapper.appendChild(desc);
    wrapper.appendChild(spacer);
    wrapper.appendChild(heading4);
    wrapper.appendChild(paragraph1);
    wrapper.appendChild(paragraph2);
    testimoniesDef.appendChild(wrapper);

    addMarker(lng,lat,action, date, form);
}

function repeatTestimonial(repression,memory){
    const testimoniesDef = document.getElementById("testimonies");
    const wrapper = document.createElement("div");
    wrapper.classList.add("testimonyChunk");

        // make a new header w the location + date
    const heading = document.createElement("b");
    heading.textContent = "Another testifies:";

    // insert paragraph of testimonial text
    const paragraph1 = document.createElement("p");
    paragraph1.textContent = "Testified repression: " + repression;

    // insert paragraph of testimonial text
    const paragraph2 = document.createElement("p");
    paragraph2.textContent = 'Testified memory: "' + memory + '"';

    // i don;t really know the guide online told me to do this. something about the divisions
    wrapper.appendChild(heading);
    wrapper.appendChild(paragraph1);
    wrapper.appendChild(paragraph2);
    testimoniesDef.appendChild(wrapper);
}

function addAction(lat,lng,location,action,date,call, form){
 //stuff i need to define in order to add things to portfolio section
    const actionsDef = document.getElementById("actions");
    const wrapper = document.createElement("div");
    wrapper.classList.add("testimonyChunk");

    // all of da button stuffs
    const newButton = document.createElement("button"); 
    newButton.id = "button"+action;
    newButton.innerHTML = action;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.classList.add("button-17")
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
            zoom: 19
        })
    });
   
    // make a new header w the location + date
    const heading = document.createElement("h4");
    heading.textContent = location + ", " + date;  

    const desc = document.createElement("p");
    desc.textContent = call;

    // i don;t really know the guide online told me to do this. something about the divisions
    wrapper.appendChild(newButton);
    wrapper.appendChild(heading);
    wrapper.appendChild(desc);
    actionsDef.appendChild(wrapper);

    addMarker(lng,lat,action, date, form);
}

//if we wanted to we could pass in the action type here. would have to go back a ways though
// because we only arrive here by passing through at least one other function
function addMarker(lng,lat,action, date, form){
    let popup_message = `<h2>${action}</h2> <h3>${date}</h3>`

    let clr;
    if (form=="Walkout") clr = "#6A7FDE"
    if (form=="Rally") clr = "#DE7D6A"
    if (form=="Die-in") clr = "#DEC96A"
    if (form=="Picket") clr = "#6CDE6A"
    if (form=="Encampment") clr = "#AE6ADE"
    if (form == "Other") clr = "#DE6ADE"

    new maplibregl.Marker({color: clr})
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map)
    return action;
}
