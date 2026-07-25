// Initialize the maps

const map1 = new maplibregl.Map({
    container: 'map1', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.44450, 34.07009], // Starting position [lng, lat] 34.07009° N, 118.44450° W
    zoom: 13 // Starting zoom level
});

const map2 = new maplibregl.Map({
    container: 'map2', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.44450, 34.07009], // Starting position [lng, lat]
    zoom: 13 // Starting zoom level
});

const map3 = new maplibregl.Map({
    container: 'map3', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.44450, 34.07009], // Starting position [lng, lat]
    zoom: 13 // Starting zoom level
});

function addMarker(lat,lng,location,message,person,date, portfolio, map){
    let popup_message = `<h2>${location}</h2> <h3>${person}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,message,person,location,date, portfolio, map);
    return message
}

function createButtons(lat,lng,message,person,location,date, portfolio, map){
    //stuff i need to define in order to add things to portfolio section
    const portfolioDef = document.getElementById(portfolio);
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

    // insert paragraph of testimonial text
    const paragraph = document.createElement("p");
    paragraph.textContent = message; 

    // i don;t really know the guide online told me to do this. something about the divisions
    wrapper.appendChild(newButton);
    wrapper.appendChild(heading);
    wrapper.appendChild(paragraph);
    portfolioDef.appendChild(wrapper);
} 

function init(){
    addMarker(
        34.07308, -118.43896, 
        "Shapiro Courtyard", 
        "Here i experienced the world. More text more text more text paragraph paragraph paragraph More text more text more text paragraph paragraph paragraph More text more text more text paragraph paragraph paragraph", 
        "Testimonial 1", 
        "Spring 2024", 
        "portfolio1", map1)
    addMarker(34.07489, -118.44007, 
        "Franklin D. Murphy Sculpture Garden", 
        "2 Here i experienced the world. More text more text more text paragraph paragraph paragraph More text more text more text paragraph paragraph paragraph More text more text more text paragraph paragraph paragraph", 
        "Testimonial 2", 
        "Fall 2025", 
        "portfolio2", map2)
    addMarker(34.07391, -118.44209, 
        "Rolfe Court", 
        "3Here i experienced the world. More text more text more text paragraph paragraph paragraph More text more text more text paragraph paragraph paragraph More text more text more text paragraph paragraph paragraph", 
        "Testimonial 3", 
        "Winter 2024", 
        "portfolio3", map3)
};

init();

// polygon stuff
map1.on('load', () => {
    map1.addSource('ucla', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [
                            -118.4449953,
                            34.0687278
                        ],
                        [
                            -118.4451171,
                            34.0670702
                        ],
                        [
                            -118.4429265,
                            34.0669664
                        ],
                        [
                            -118.4417628,
                            34.0670183
                        ],
                        [
                            -118.4417674,
                            34.0651578
                        ],
                        [
                            -118.4422637,
                            34.0639645
                        ],
                        [
                            -118.4412745,
                            34.0640533
                        ],
                        [
                            -118.4402276,
                            34.0656406
                        ],
                        [
                            -118.4391636,
                            34.0671427
                        ],
                        [
                            -118.4390267,
                            34.0696695
                        ],
                        [
                            -118.4383515,
                            34.0711001
                        ],
                        [
                            -118.4372642,
                            34.0721928
                        ],
                        [
                            -118.437929,
                            34.0741901
                        ],
                        [
                            -118.4387703,
                            34.0762808
                        ],
                        [
                            -118.4391432,
                            34.077926
                        ],
                        [
                            -118.439614,
                            34.0781434
                        ],
                        [
                            -118.4407835,
                            34.0774213
                        ],
                        [
                            -118.4424331,
                            34.0773854
                        ],
                        [
                            -118.444017,
                            34.0768488
                        ],
                        [
                            -118.4447282,
                            34.0756822
                        ],
                        [
                            -118.4451273,
                            34.073916
                        ],
                        [
                            -118.4462326,
                            34.0734727
                        ],
                        [
                            -118.4486567,
                            34.0733708
                        ],
                        [
                            -118.4493959,
                            34.0728972
                        ],
                        [
                            -118.4495766,
                            34.0711658
                        ],
                        [
                            -118.4490328,
                            34.0698628
                        ],
                        [
                            -118.4484991,
                            34.0687426
                        ],
                        [
                            -118.4450229,
                            34.0687426
                        ],
                        [
                            -118.4449953,
                            34.0687278
                        ]
                    ]
                ]
            }
        }
    });

    map1.addLayer({
        'id': 'ucla',
        'type': 'fill',
        'source': 'ucla',
        'layout': {},
        'paint': {
            'fill-color': 'rgb(255, 200, 200)',
            'fill-opacity': 0.7
        }
    });
});

map2.on('load', () => {
    map2.addSource('ucla', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [
                            -118.4449953,
                            34.0687278
                        ],
                        [
                            -118.4451171,
                            34.0670702
                        ],
                        [
                            -118.4429265,
                            34.0669664
                        ],
                        [
                            -118.4417628,
                            34.0670183
                        ],
                        [
                            -118.4417674,
                            34.0651578
                        ],
                        [
                            -118.4422637,
                            34.0639645
                        ],
                        [
                            -118.4412745,
                            34.0640533
                        ],
                        [
                            -118.4402276,
                            34.0656406
                        ],
                        [
                            -118.4391636,
                            34.0671427
                        ],
                        [
                            -118.4390267,
                            34.0696695
                        ],
                        [
                            -118.4383515,
                            34.0711001
                        ],
                        [
                            -118.4372642,
                            34.0721928
                        ],
                        [
                            -118.437929,
                            34.0741901
                        ],
                        [
                            -118.4387703,
                            34.0762808
                        ],
                        [
                            -118.4391432,
                            34.077926
                        ],
                        [
                            -118.439614,
                            34.0781434
                        ],
                        [
                            -118.4407835,
                            34.0774213
                        ],
                        [
                            -118.4424331,
                            34.0773854
                        ],
                        [
                            -118.444017,
                            34.0768488
                        ],
                        [
                            -118.4447282,
                            34.0756822
                        ],
                        [
                            -118.4451273,
                            34.073916
                        ],
                        [
                            -118.4462326,
                            34.0734727
                        ],
                        [
                            -118.4486567,
                            34.0733708
                        ],
                        [
                            -118.4493959,
                            34.0728972
                        ],
                        [
                            -118.4495766,
                            34.0711658
                        ],
                        [
                            -118.4490328,
                            34.0698628
                        ],
                        [
                            -118.4484991,
                            34.0687426
                        ],
                        [
                            -118.4450229,
                            34.0687426
                        ],
                        [
                            -118.4449953,
                            34.0687278
                        ]
                    ]
                ]
            }
        }
    });

    map2.addLayer({
        'id': 'ucla',
        'type': 'fill',
        'source': 'ucla',
        'layout': {},
        'paint': {
            'fill-color': 'rgb(255, 200, 200)',
            'fill-opacity': 0.7
        }
    });
});

map3.on('load', () => {
    map3.addSource('ucla', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                'coordinates': [
                    [
                        [
                            -118.4449953,
                            34.0687278
                        ],
                        [
                            -118.4451171,
                            34.0670702
                        ],
                        [
                            -118.4429265,
                            34.0669664
                        ],
                        [
                            -118.4417628,
                            34.0670183
                        ],
                        [
                            -118.4417674,
                            34.0651578
                        ],
                        [
                            -118.4422637,
                            34.0639645
                        ],
                        [
                            -118.4412745,
                            34.0640533
                        ],
                        [
                            -118.4402276,
                            34.0656406
                        ],
                        [
                            -118.4391636,
                            34.0671427
                        ],
                        [
                            -118.4390267,
                            34.0696695
                        ],
                        [
                            -118.4383515,
                            34.0711001
                        ],
                        [
                            -118.4372642,
                            34.0721928
                        ],
                        [
                            -118.437929,
                            34.0741901
                        ],
                        [
                            -118.4387703,
                            34.0762808
                        ],
                        [
                            -118.4391432,
                            34.077926
                        ],
                        [
                            -118.439614,
                            34.0781434
                        ],
                        [
                            -118.4407835,
                            34.0774213
                        ],
                        [
                            -118.4424331,
                            34.0773854
                        ],
                        [
                            -118.444017,
                            34.0768488
                        ],
                        [
                            -118.4447282,
                            34.0756822
                        ],
                        [
                            -118.4451273,
                            34.073916
                        ],
                        [
                            -118.4462326,
                            34.0734727
                        ],
                        [
                            -118.4486567,
                            34.0733708
                        ],
                        [
                            -118.4493959,
                            34.0728972
                        ],
                        [
                            -118.4495766,
                            34.0711658
                        ],
                        [
                            -118.4490328,
                            34.0698628
                        ],
                        [
                            -118.4484991,
                            34.0687426
                        ],
                        [
                            -118.4450229,
                            34.0687426
                        ],
                        [
                            -118.4449953,
                            34.0687278
                        ]
                    ]
                ]
            }
        }
    });

    map3.addLayer({
        'id': 'ucla',
        'type': 'fill',
        'source': 'ucla',
        'layout': {},
        'paint': {
            'fill-color': 'rgb(255, 200, 200)',
            'fill-opacity': 0.7
        }
    });
});

