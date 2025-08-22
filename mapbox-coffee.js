mapboxgl.accessToken = 'pk.eyJ1Ijoic2g0NzcxIiwiYSI6ImNtZGNpNXV1czE2MXMyaW9meWozNGh1YmEifQ.THlvSfp7C1bY2ivHS5b6hA';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'mapbox-container-1', // Make sure this matches your HTML container ID
    style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for coffee aesthetic
    center: [-20, 0], // Centered for global view
    zoom: 2,
    projection: 'naturalEarth', // Better projection for global visualization
    pitch: 0,
    bearing: 0
});

// Coffee regions GeoJSON data - comprehensive dataset
const coffeeRegionsData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-75.6919, 4.5709] // Colombia
            },
            "properties": {
                "name": "Colombian Andes",
                "country": "Colombia",
                "production": "Major",
                "varieties": "Arabica (Caturra, Castillo, Colombia)",
                "altitude": "1,200-2,000m",
                "flavorNotes": "Balanced acidity, medium body, caramel sweetness",
                "culturalSignificance": "Coffee Cultural Landscape UNESCO World Heritage Site",
                "processingMethod": "Washed",
                "harvestSeason": "October-February"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [38.7469, 9.1450] // Ethiopia
            },
            "properties": {
                "name": "Ethiopian Highlands",
                "country": "Ethiopia",
                "production": "Major",
                "varieties": "Heirloom Arabica varieties",
                "altitude": "1,500-2,200m",
                "flavorNotes": "Complex floral and fruity profiles",
                "culturalSignificance": "Birthplace of coffee, traditional coffee ceremony",
                "processingMethod": "Natural/Washed",
                "harvestSeason": "October-December"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-89.2182, 13.7942] // El Salvador
            },
            "properties": {
                "name": "Salvadoran Volcanoes",
                "country": "El Salvador",
                "production": "Regional",
                "varieties": "Bourbon, Pacas, Pacamara",
                "altitude": "1,000-1,800m",
                "flavorNotes": "Sweet, chocolatey, volcanic soil influence",
                "culturalSignificance": "Small family farms, traditional methods",
                "processingMethod": "Washed",
                "harvestSeason": "November-March"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [106.8451, -6.2088] // Java, Indonesia
            },
            "properties": {
                "name": "Java",
                "country": "Indonesia",
                "production": "Major",
                "varieties": "Typica, Catimor",
                "altitude": "750-1,500m",
                "flavorNotes": "Full body, earthy, herbal characteristics",
                "culturalSignificance": "Dutch colonial heritage, wet-hulling tradition",
                "processingMethod": "Wet-hulled (Giling Basah)",
                "harvestSeason": "May-September"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-84.0739, 9.7489] // Costa Rica
            },
            "properties": {
                "name": "Central Valley",
                "country": "Costa Rica",
                "production": "Regional",
                "varieties": "Caturra, Catuai, Villa Sarchi",
                "altitude": "1,000-1,700m",
                "flavorNotes": "Bright acidity, citrus and chocolate notes",
                "culturalSignificance": "Pioneer in sustainable coffee practices",
                "processingMethod": "Honey/Washed",
                "harvestSeason": "November-March"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [37.9062, -0.0236] // Kenya
            },
            "properties": {
                "name": "Kenyan Highlands",
                "country": "Kenya",
                "production": "Major",
                "varieties": "SL28, SL34, Ruiru 11",
                "altitude": "1,400-2,100m",
                "flavorNotes": "Wine-like acidity, black currant, citrus",
                "culturalSignificance": "Cooperative system supporting smallholders",
                "processingMethod": "Washed (double fermentation)",
                "harvestSeason": "October-December"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-77.3947, 18.1096] // Jamaica Blue Mountain
            },
            "properties": {
                "name": "Blue Mountain",
                "country": "Jamaica",
                "production": "Emerging",
                "varieties": "Blue Mountain Arabica",
                "altitude": "900-1,700m",
                "flavorNotes": "Mild, well-balanced, subtle complexity",
                "culturalSignificance": "Premium coffee, strict quality control",
                "processingMethod": "Washed",
                "harvestSeason": "August-March"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [98.6917, 3.5952] // Sumatra
            },
            "properties": {
                "name": "Sumatra Mandheling",
                "country": "Indonesia",
                "production": "Major",
                "varieties": "Typica, Catimor, Linie S",
                "altitude": "750-1,500m",
                "flavorNotes": "Full body, earthy, herbal, low acidity",
                "culturalSignificance": "Wet-hulling creates unique flavor profile",
                "processingMethod": "Wet-hulled (Giling Basah)",
                "harvestSeason": "September-December"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-155.5828, 19.8968] // Hawaii Kona
            },
            "properties": {
                "name": "Kona",
                "country": "USA (Hawaii)",
                "production": "Emerging",
                "varieties": "Typica (Kona)",
                "altitude": "150-900m",
                "flavorNotes": "Smooth, mild, nutty with low acidity",
                "culturalSignificance": "Only commercial coffee grown in USA",
                "processingMethod": "Washed",
                "harvestSeason": "August-January"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [120.9842, 14.5995] // Philippines
            },
            "properties": {
                "name": "Philippine Cordilleras",
                "country": "Philippines",
                "production": "Regional",
                "varieties": "Arabica, Robusta, Liberica, Excelsa",
                "altitude": "1,000-1,800m",
                "flavorNotes": "Full body, earthy, unique variety profiles",
                "culturalSignificance": "Indigenous farming communities, rare varieties",
                "processingMethod": "Natural/Washed",
                "harvestSeason": "November-February"
            }
        }
    ]
};

// Custom styling functions
function getCircleRadius(production) {
    switch(production) {
        case 'Major': return 14;
        case 'Regional': return 10;
        case 'Emerging': return 7;
        default: return 6;
    }
}

function getCircleColor(production) {
    switch(production) {
        case 'Major': return '#8B4513';      // Dark brown for major producers
        case 'Regional': return '#D2691E';   // Orange-brown for regional
        case 'Emerging': return '#F4A460';   // Light brown for emerging
        default: return '#DEB887';           // Beige for others
    }
}

// Wait for map to load before adding data
map.on('load', () => {
    console.log('Map loaded successfully');
    
    // Add the coffee regions data source
    map.addSource('coffee-regions', {
        type: 'geojson',
        data: coffeeRegionsData,
        cluster: false
    });

    // Add circle layer for coffee regions with data-driven styling
    map.addLayer({
        id: 'coffee-circles',
        type: 'circle',
        source: 'coffee-regions',
        paint: {
            'circle-radius': [
                'case',
                ['==', ['get', 'production'], 'Major'], 14,
                ['==', ['get', 'production'], 'Regional'], 10,
                7
            ],
            'circle-color': [
                'case',
                ['==', ['get', 'production'], 'Major'], '#8B4513',
                ['==', ['get', 'production'], 'Regional'], '#D2691E',
                '#F4A460'
            ],
            'circle-opacity': 0.85,
            'circle-stroke-width': 3,
            'circle-stroke-color': '#d4af37', // Gold border
            'circle-stroke-opacity': 1
        }
    });

    // Add labels layer
    map.addLayer({
        id: 'coffee-labels',
        type: 'symbol',
        source: 'coffee-regions',
        layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': [
                'case',
                ['==', ['get', 'production'], 'Major'], 14,
                ['==', ['get', 'production'], 'Regional'], 12,
                10
            ],
            'text-anchor': 'top',
            'text-offset': [0, 1.5],
            'text-allow-overlap': false,
            'text-ignore-placement': false
        },
        paint: {
            'text-color': '#f5deb3', // Cream color for text
            'text-halo-color': '#2c1810', // Dark brown halo
            'text-halo-width': 2,
            'text-halo-blur': 1
        }
    });

    // Mouse interaction handlers
    map.on('mouseenter', 'coffee-circles', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'coffee-circles', () => {
        map.getCanvas().style.cursor = '';
    });

    // Click event handler for detailed popups
    map.on('click', 'coffee-circles', (e) => {
        const feature = e.features[0];
        const properties = feature.properties;
        const coordinates = feature.geometry.coordinates.slice();

        // Ensure popup appears over the feature clicked
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Create rich popup content with coffee-themed styling
        const popupHTML = `
            <div style="font-family: Arial, sans-serif; min-width: 250px; max-width: 350px;">
                <div style="background: #d4af37; color: #2c1810; padding: 12px; border-radius: 8px 8px 0 0; margin-bottom: 12px;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: bold;">☕ ${properties.name}</h3>
                    <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.8;">${properties.country}</p>
                </div>
                
                <div style="padding: 0 12px 12px 12px;">
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #d4af37;">Production Level:</strong> 
                        <span style="background: ${getCircleColor(properties.production)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                            ${properties.production}
                        </span>
                    </div>
                    
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #d4af37;">Altitude:</strong> ${properties.altitude}
                    </div>
                    
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #d4af37;">Varieties:</strong> ${properties.varieties}
                    </div>
                    
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #d4af37;">Flavor Notes:</strong> ${properties.flavorNotes}
                    </div>
                    
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #d4af37;">Processing:</strong> ${properties.processingMethod}
                    </div>
                    
                    <div style="margin-bottom: 8px;">
                        <strong style="color: #d4af37;">Harvest Season:</strong> ${properties.harvestSeason}
                    </div>
                    
                    <div style="margin-bottom: 0;">
                        <strong style="color: #d4af37;">Cultural Significance:</strong> ${properties.culturalSignificance}
                    </div>
                </div>
            </div>
        `;

        new mapboxgl.Popup({
            offset: 25,
            closeButton: true,
            closeOnClick: true
        })
        .setLngLat(coordinates)
        .setHTML(popupHTML)
        .addTo(map);
    });
});

// Add navigation controls
map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// Add fullscreen control
map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

// Add scale control
map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
}), 'bottom-right');