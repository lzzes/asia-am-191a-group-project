// Declare global variables

let markers = []; //need this for the polygon layer to reset when you click on new polygon
let currentPopup = null;

//
let selectedArea = null; // to store area polygon clicked state
let selectedYear = null; // to store year button state
let allEventData = []; //to store all the survey data

/*let displayYear = 2023;

const btn = document.querySelector("#yr2023");
btn.addEventListener("click", () => {updateYear(2024)});

function updateYear(yr) {
    displayYear = yr;
    console.log("clicl");
    location.reload();
}*/

let mapOptions = {
    "zoom": 14.5,
    "center" : [-118.44624, 34.07057], //34.07057° N, 118.44624° W
}

let dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQl_X4nqI_LmgvWzm_OMkH-uAkYyf3T8M5wxARgbjR30lbC7cfztoJ6gEvmC57nV7sks846j5uEtaS_/pub?gid=592139015&single=true&output=csv"

// Map Options

// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: mapOptions.center,
    zoom: mapOptions.zoom
});

map.on('load', function() {

    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    
    // Papa.parse(dataUrl, {
    //     download: true, // Tells PapaParse to fetch the CSV data from the URL
    //     header: true, // Assumes the first row of your CSV are column headers
    //     complete: (results) => {
    //         processData(results.data);
    //     }
    // });

    // Load Polygons of Campus

    map.addSource('polygons',{
        'type': 'geojson',
        'data': 'campus-map.geojson'
    })

    map.addLayer({
      id: 'polygons-fill',
      type: 'fill',
      source: 'polygons',
      paint: {
        'fill-color': '#999999',
        'fill-opacity': 0.2
      }
    });

    map.addLayer({
      id: 'polygons-outline',
      type: 'line',
      source: 'polygons',
      paint: {
        'line-color': '#444444',
        'line-width': 2
      }
    });

    Papa.parse(dataUrl, {
    download: true,
    header: true,
    complete: (results) => {
        allEventData = results.data;
        console.log("Loaded", allEventData.length, "rows from the spreadsheet");
        }
    });
    
    setupYearButtons();
    map.on('click','polygons-fill', (e) => {

        let area = e.features[0].properties.Region;
        console.log(area);

        selectedArea = area;   // ← this line was missing

        // Zoom to the centroid
        let centerpt = turf.centroid(e.features[0]).geometry.coordinates;
        console.log(centerpt);
        map.flyTo({center: centerpt, zoom: 16});

        updateDisplay();
    })


    /* Load Targets
    const targets = {
        'Walkout':'Walkout',
        'Rally':'Rally',
        'Die-in':'Die-in',
        'Picket':'Picket',
        'Encampment':'Encampment',
        'Other':'Other'
    };
    map.addControl(new MaplibreLegendControl.MaplibreLegendControl(targets, {
        showDefault: false, 
        showCheckbox: false, 
        onlyRendered: true,
        reverseOrder: true
    }), 'top-right'); */
});

function updateDisplay(){
 
    // Remove any old popup that might still be open
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
    }
 
    // Remove old markers from the map
    markers.forEach(marker => marker.remove());
    markers = [];
 
    // Clear whatever was in the sidebar
    document.getElementById("testimonies").innerHTML = "";
 
    // If no polygon has been clicked yet, just show the starting instructions
    if (selectedArea === null) {
        document.getElementById("testimonies").innerHTML = `
            <div class="instructions">
                <h2>Explore the Map</h2>
                <p>Click on a polygon to get started and see the actions that took place in that area.</p>
            </div>`;
        return;
    }
 
    // Filter the cached spreadsheet rows down to the selected area,
    // and to the selected year if one has been picked
    let matchingRows = allEventData.filter(row => {
        let rowArea = row.Address;
        let areaMatches = (rowArea == selectedArea);
        let yearMatches = (selectedYear === null || row.Year == selectedYear);
        return areaMatches && yearMatches;
    });
 
    matchingRows.forEach(row => processFeature(row));
 
    let yearLabel = (selectedYear === null) ? "all years" : selectedYear;
 
    document.getElementById("testimonies").innerHTML = `
        <div class="instructions">
            <h2>Explore Actions in ${selectedArea} (${yearLabel})</h2>
            <p>
                Click on an action marker on the map to see
                information about that action and any available
                testimonials. Or, click on another area, or another year, to see what's there.
            </p>
        </div>`;
}


function setupYearButtons(){
 
    let yearButtons = document.querySelectorAll("#year button");
 
    yearButtons.forEach(button => {
 
        button.addEventListener("click", () => {
 
            // The button's visible text is the year itself, e.g. "2023"
            let clickedYear = button.textContent.trim();
 
            if (selectedYear == clickedYear) {
                // Clicking the already-selected year again clears the filter
                selectedYear = null;
            } else {
                selectedYear = clickedYear;
            }
 
            // Update which button looks "active"
            yearButtons.forEach(otherButton => {
                otherButton.classList.remove("active-year");
            });
            if (selectedYear !== null) {
                button.classList.add("active-year");
            }
 
            updateDisplay();
        });
    });
}
 


/*function processFeature(feature){
    let IDarray = new Array()
    let ID, lng, lat, location, action, date, repression, memory, call, form;
    console.log(feature);
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
           /*  if (memory != false && IDarray.includes(ID) == false){
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
        /*} */
    //}; 


    function processFeature(feature){

    let ID = feature.ID;
    let lng = feature.lng;
    let lat = feature.lat;
    let location = feature["Mapping Location"];
    let action = feature.Name;
    let date = feature.Date;
    let memory = feature["What was the most memorable part of the action? "];
    let call = feature["Short Description/Call"];
    let form = feature["Action Form"];

    let repression = feature["Did the university engage or respond to this action in any way? "];

    if (repression == "Yes") {
        repression = feature["If yes, how? "];
    }

    // ONLY create the marker here
    addMarker(
        lng,
        lat,
        action,
        date,
        form,
        location,
        call,
        repression,
        memory
    );
}

function processData(results){
    let IDarray = new Array(30);

    let ID, lng, lat, location, action, date, repression, memory, call, form;

    let pts = new Array();

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

        // Add locations into array for searching within Polygon
        pts.push([parseFloat(lng), parseFloat(lat)]);

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
    
    let all_events = turf.points(pts)
    // var SC_Events = turf.pointsWithinPolygon(all_events, S_Campus);
    // console.log(SC_Events)

    return all_events

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

/*function addAction(lat,lng,location,action,date,call, form){
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
} */

//if we wanted to we could pass in the action type here. would have to go back a ways though
// because we only arrive here by passing through at least one other function
/*function addMarker(lng,lat,action, date, form){
    let popup_message = `<h2>${action}</h2> <h3>${date}</h3>`

    let clr;
    if (form=="Walkout") clr = "#6A7FDE"
    if (form=="Rally") clr = "#DE7D6A"
    if (form=="Die-in") clr = "#DEC96A"
    if (form=="Picket") clr = "#6CDE6A"
    if (form=="Encampment") clr = "#AE6ADE"
    if (form == "Other") clr = "#DE6ADE"

   const marker = new maplibregl.Marker({color: clr})
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map);

    markers.push(marker);

    return action;
}*/

function addMarker(lng, lat, action, date, form, location, call, repression, memory){

    let popup_message = `<h2>${action}</h2> <h3>${date}</h3>`;

    let clr;

    if (form=="Walkout") clr = "#6A7FDE";
    if (form=="Rally") clr = "#DE7D6A";
    if (form=="Die-in") clr = "#DEC96A";
    if (form=="Picket") clr = "#6CDE6A";
    if (form=="Encampment") clr = "#AE6ADE";
    if (form=="Other") clr = "#DE6ADE";

    const marker = new maplibregl.Marker({color: clr})
        .setLngLat([lng, lat])
        .setPopup(
            new maplibregl.Popup().setHTML(popup_message)
        )
        .addTo(map);

    // Save marker so we can remove it when another polygon is clicked
    markers.push(marker);

    // When marker is clicked, show its information on the left
    marker.getElement().addEventListener("click", function(e) {

        // Prevent the click from also triggering the polygon
        e.stopPropagation();

        
        showAction(
            action,
            date,
            location,
            call,
            repression,
            memory
        );

        map.flyTo({
            center: [lng,lat],
            zoom: 18});

        marker.togglePopup();
        
        if (currentPopup) {
            currentPopup.remove();
        }

        currentPopup = marker.getPopup();

    });

    return action;
}

function showAction(action, date, location, call, repression, memory){

    const testimoniesDef = document.getElementById("testimonies");

    // Clear whatever was previously being displayed
    testimoniesDef.innerHTML = "";

    // Create container
    const wrapper = document.createElement("div");
    wrapper.classList.add("testimonyChunk");

    // Action name
    const heading = document.createElement("h1");
    heading.textContent = action;

    // Location + date
    const heading4 = document.createElement("h3");
    heading4.textContent = location + ", " + date;

    // Action description
    const desc = document.createElement("details");
    const clickForCall = document.createElement("summary");
    clickForCall.textContent = "Click here to see the action's call";

    const callText = document.createElement("p");
    callText.textContent = call;

    desc.appendChild(clickForCall)
    desc.appendChild(callText);
    wrapper.appendChild(desc);


    /*const testimonyHead = document.createElement("h3");
    testimonyHead.textContent = "Testimonials";*/

    wrapper.appendChild(heading);
    wrapper.appendChild(heading4);
    wrapper.appendChild(desc);
    //wrapper.appendChild(testimonyHead);

    /*const desc = document.createElement("p");
    desc.textContent = call;

    wrapper.appendChild(heading);
    wrapper.appendChild(heading4);
    wrapper.appendChild(desc);*/

    // If there is a testimonial, display it
    if (memory && memory !== "false") {

        const testimonyHeading = document.createElement("h2");
        testimonyHeading.textContent = "Testimony:";

        const memoryParagraph = document.createElement("p");
        memoryParagraph.textContent = '“' + memory + '”';

        wrapper.appendChild(testimonyHeading);
        wrapper.appendChild(memoryParagraph);

        // Repression information
        if (repression) {

            const repressionParagraph = document.createElement("p");
            repressionParagraph.textContent =
                "University response: " + repression;

            wrapper.appendChild(repressionParagraph);
        }
    }

    testimoniesDef.appendChild(wrapper);
}

/* modal situation */

// Get the modal
var modal2 = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
window.onload = function() {
    modal2.style.display = "block";
  };
  
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

//window.addEventListener("resize", scroller.resize);

function closeModal(e){
    let parentDiv = e.target.parentElement.id
    console.log(parentDiv)
    /*if(parentDiv != "surveyBtn"){
        modal.style.display = "none";
    }
    if(parentDiv == "menuButtons"){
        modal.style.display = "none";
    }*/
}
document.body.addEventListener('click', function(e) {
    closeModal(e)
        // your code
    // console.log(e.target.id)
});





