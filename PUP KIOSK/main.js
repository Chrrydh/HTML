// Function to show the tooltip
function showPlaceInfo(image, title, description, clickEvent = false, x = 0, y = 0) {
    const display = document.getElementById('display');

    // Update the content inside the tooltip
    display.innerHTML = `
        <img src="${image}" alt="${title}" />
        <h3>${title}</h3>
        <p>${description}</p>
    `;

    if (clickEvent) {
        // Get the map's container to ensure positioning relative to it
        const mapContainer = document.querySelector('.pupmap');

        // Calculate the position relative to the map container
        const mapRect = mapContainer.getBoundingClientRect();
        const offsetX = mapRect.left + window.scrollX;
        const offsetY = mapRect.top + window.scrollY;

        // Position the tooltip using x and y coordinates relative to the map
        display.style.left = `${offsetX + x}px`; // Offset x based on map position
        display.style.top = `${offsetY + y}px`;  // Offset y based on map position
        display.style.transform = 'translate(-50%, -100%)'; // Center above the location
        display.classList.add('fixed'); // Add fixed class for click-based positioning
    } else {
        // Attach mousemove event for hover (dynamic tooltip positioning)
        document.addEventListener('mousemove', (event) => {
            display.style.left = `${event.pageX + 15}px`; // 15px to the right of the cursor
            display.style.top = `${event.pageY + 15}px`; // 15px below the cursor
            display.style.transform = ''; // Reset transform for dynamic placement
            display.classList.remove('fixed'); // Remove fixed class if added before
        });
    }

    // Show the tooltip by adding the "show" class
    display.classList.add('show');
}

// Function to hide the tooltip
function detachPlaceInfo() {
    const display = document.getElementById('display');
    display.classList.remove('show'); // Hide the tooltip
    display.innerHTML = ''; // Clear tooltip content
}

// Function to handle sidebar click events
function goToPlace(placeId) {
    // Map of place IDs to corresponding details
    const placeDetails = {
        'place-1': {
            image: 'images/pupanonas.png',
            title: 'Anonas Street',
            description: 'This is Anonas Street and this is where PUP can be found.',
            coords: { x: 780, y: 100 },
        },
        'place-2': {
            image: 'images/puppnr.png',
            title: 'PNR Sta. Mesa Station',
            description: 'This is where the train station can be found and one of the modes of transportation for Pupians.',
            coords: { x: 815, y: 130 },
        },
        'place-3': {
            image: 'images/pupteresa.png',
            title: 'Teresa Street',
            description: 'This is Teresa Street and it is near the PUP Campus.',
            coords: { x: 840, y: 200 },
        },
        'place-4': {
            image: 'images/puppylon.png',
            title: 'PUP Pylon',
            description: 'The Triad of pillars stand for wisdom to contrive, strength to support, and beauty to adorn any great undertaking.',
            coords: { x: 760, y: 180 },
        },
        'place-5': {
            image: 'images/pupmainentrance.jpg',
            title: 'PUP Main Entrance',
            description: 'This gate is intended for the entry of the PUPians, Faculty Members, and other PUP Officials.',
            coords: { x: 770, y: 210 },
        },
        'place-6': {
            image: 'images/pupguard.png',
            title: 'PUP Guard House',
            description: 'This is where the guards can be found to secure the university.',
            coords: { x: 740, y: 225 },
        },
        'place-7': {
            image: 'images/pupviccc.jpg',
            title: 'PUP Visitor Information Center',
            description: 'This guides the visitor from other places to the location of different buildings or transaction places.',
            coords: { x: 720, y: 180 },
        },
        'place-8': {
            image: 'images/pupovall.jpeg',
            title: 'PUP Oval',
            description: 'This is where students go for Physical Education activities, and some of the biggest events also happen here.',
            coords: { x: 660, y: 400 },
        },
        'place-9': {
            image: 'images/pupparking1.JPG',
            title: 'PUP Parking Area',
            description: 'This place is intended for the parking of different vehicles.',
            coords: { x: 700, y: 80 },
        },
        'place-10': {
            image: 'images/puptbv.jpg',
            title: 'PUP Tennis Court',
            description: 'This is where you can play outdoor activities like tennis.',
            coords: { x: 650, y: 120 },
        },
        'place-11': {
            image: 'images/pupbball.jpg',
            title: 'PUP Basketball and Volleyball Court',
            description: 'This is where you can play outdoor activities like basketball and volleyball.',
            coords: { x: 550, y: 150 },
        },
        'place-12': {
            image: 'images/pupgym.jpg',
            title: 'PUP Gymnasium',
            description: 'This is where big events like recognition rites and graduation take place.',
            coords: { x: 630, y: 80 },
        },
        'place-13': {
            image: 'images/puppooll.jpg',
            title: 'PUP Swimming Pool',
            description: 'This is where swimming classes take place.',
            coords: { x: 500, y: 60 },
        },
        'place-14': {
            image: 'images/pupparking2.jpg',
            title: 'PUP Parking Area',
            description: 'This place is intended for the parking of different vehicles.',
            coords: { x: 450, y: 120 },
        },
        'place-15': {
            image: 'images/pupoblesik.jpg',
            title: 'PUP Obelisk',
            description: 'The Obelisk, standing majestic on its base, depicts the strength of PUP as an institution of higher learning.',
            coords: { x: 500, y: 180 },
        },
        'place-16': {
            image: 'images/pupmabini.jpg',
            title: 'PUP Mabini Shrine',
            description: 'It is noted for being the residence of Filipino military leader Apolinario Mabini who figured in the Philippine Revolution.',
            coords: { x: 570, y: 230 },
        },
        'place-17': {
            image: 'images/pupwalkway.jpg',
            title: 'PUP Walkway',
            description: 'This is where the students walk on their way to their respective classrooms.',
            coords: { x: 500, y: 350 },
        },
        'place-18': {
            image: 'images/pupgab.jpg',
            title: 'Gabriela Silang Community Building',
            description: 'This is the PUP Gabriela Silang Community Building.',
            coords: { x: 750, y: 400 },
        },
        'place-19': {
            image: 'images/pupflag.jpg',
            title: 'PUP Flag Pole',
            description: 'This flag pole serves as the one that creates our identity, for us being Filipinos.',
            coords: { x: 480, y: 250 },
        },
        'place-20': {
            image: 'images/pupchapel.jpg',
            title: 'PUP Interfaith Chapel',
            description: 'The Interfaith Chapel is a nondenominational Christian church located inside PUP.',
            coords: { x: 440, y: 380 },
        },
        'place-21': {
        image: 'images/pupparking5.jpg',
        title: 'Parking Area',
        description: 'This is one of the parking areas inside the PUP campus.',
        coords: { x: 462, y: 330 }, // Updated from HTML
    },
    'place-22': {
        image: 'images/pupnfs.jpg',
        title: 'Nutrition and Food Science Building',
        description: 'This building is where classes for nutrition and food science are held.',
        coords: { x: 375, y: 509 }, // Updated from HTML
    },
    'place-23': {
        image: 'images/pupparking4.jpg',
        title: 'Parking Area',
        description: 'Another parking area for students and staff.',
        coords: { x: 296, y: 506 }, // Updated from HTML
    },
    'place-24': {
        image: 'images/pupferry.jpg',
        title: 'Ferry Station',
        description: 'This is the ferry station located near the PUP campus.',
        coords: { x: 219, y: 464 }, // Updated from HTML
    },
    'place-25': {
        image: 'images/puppasig.jpg',
        title: 'Pasig River',
        description: 'This is the well-known Pasig River located near the campus.',
        coords: { x: 32, y: 2 }, // Updated from HTML
    },
    'place-26': {
        image: 'images/pupsouthwing.png',
        title: 'South Wing',
        description: 'This is the South Wing of the Main Building.',
        coords: { x: 299, y: 372 }, // Updated from HTML
    },
    'place-27': {
        image: 'images/pupwestwing.jpg',
        title: 'West Wing',
        description: 'This is the West Wing of the Main Building.',
        coords: { x: 329, y: 326 }, // Updated from HTML
    },
    'place-28': {
        image: 'images/pupnorthwing.jpg',
        title: 'North Wing',
        description: 'This is the North Wing of the Main Building.',
        coords: { x: 350, y: 324 }, // Updated from HTML
    },
    'place-29': {
        image: 'images/pupeastwing.jpg',
        title: 'East Wing',
        description: 'This is the East Wing of the Main Building.',
        coords: { x: 316, y: 386 }, // Updated from HTML
    },
    'place-30': {
        image: 'images/pupdome.jpg',
        title: 'Dome',
        description: 'The dome is the central part of the Main Building.',
        coords: { x: 331, y: 327 }, // Updated from HTML
    },
    'place-31': {
        image: 'images/pupparking4.jpg',
        title: 'Parking Area',
        description: 'This is another parking area in the campus.',
        coords: { x: 296, y: 506 }, // Updated from HTML
    },
    'place-32': {
        image: 'images/pupcanteen.png',
        title: 'Student and University Canteen',
        description: 'This is where students can find food and snacks on campus.',
        coords: { x: 184, y: 212 }, // Updated from HTML
    },
    'place-33': {
        image: 'images/pupampi.jpeg',
        title: 'Amphitheater',
        description: 'The amphitheater is used for cultural and arts live performances.',
        coords: { x: 341, y: 261 }, // Updated from HTML
    },
    'place-34': {
        image: 'images/puplagoon.jpg',
        title: 'Lagoon',
        description: 'The lagoon serves as a park and open space for students.',
        coords: { x: 403, y: 136 }, // Updated from HTML
    },
    'place-35': {
        image: 'images/pupcdr.jpg',
        title: 'Charlie Del Rosario Hall',
        description: 'A structure dedicated to the memory of Charlie Del Rosario.',
        coords: { x: 161, y: 143 }, // Updated from HTML
    },
    'place-36': {
        image: 'images/puplab.jpg',
        title: 'Laboratory High School',
        description: 'This is where high school Pupians are usually found.',
        coords: { x: 158, y: 14 }, // Updated from HTML
    },
    'place-37': {
        image: 'images/pupparking3.jpg',
        title: 'Parking Area',
        description: 'This is a designated parking area for campus vehicles.',
        coords: { x: 258, y: 67 }, // Updated from HTML
    },
    'place-38': {
        image: 'images/pupninoy.jpg',
        title: 'Ninoy Aquino Library',
        description: 'A central hub for learning and research for students.',
        coords: { x: 392, y: 60 }, // Updated from HTML
    },
    'place-39': {
        image: 'images/pupparking2.jpg',
        title: 'Parking Area',
        description: 'One of the many parking areas available for vehicles.',
        coords: { x: 452, y: 75 }, // Updated from HTML
    },
    'place-40': {
        image: 'images/pupwater.jpg',
        title: 'Water Pump/Tank Facility',
        description: 'This is the water pump/tank facility in the campus.',
        coords: { x: 246, y: 12 }, // Updated from HTML
    },
    'place-41': {
        image: 'images/pupprint.jpg',
        title: 'Printing Press Building',
        description: 'Responsible for producing university materials and newspapers.',
        coords: { x: 73, y: 5 }, // Updated from HTML
    },
    'place-42': {
        image: 'images/puppe.jpg',
        title: 'Physical Education Building',
        description: 'This is where physical education classes are held.',
        coords: { x: 430, y: 9 }, // Updated from HTML
    },
    'place-43': {
        image: 'images/pupalumni.jpg',
        title: 'Tahanan ng Alumni',
        description: 'The hub for alumni activities and reunions.',
        coords: { x: 459, y: 37 }, // Updated from HTML
    },
    'place-44': {
        image: 'images/pupparking5.jpg',
        title: 'Parking Area',
        description: 'Another parking area for university vehicles.',
        coords: { x: 462, y: 327 }, // Updated from HTML
    },
    'place-45': {
        image: 'images/pupwalkway.jpg',
        title: 'Walkway',
        description: 'This is a walkway that connects various parts of the campus.',
        coords: { x: 731, y: 218 }, // Updated from HTML
    },
    };

    // Get the data for the selected place
    const placeData = placeDetails[placeId];
    if (placeData) {
        // Show the tooltip at the specified coordinates with the corresponding data
        showPlaceInfo(
            placeData.image,
            placeData.title,
            placeData.description,
            true,
            placeData.coords.x,
            placeData.coords.y
        );
    } else {
        console.error('Place not found:', placeId); // Debugging log if a place ID is missing
    }
}
