// Simple Temporal Structures - Test Version
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initTemporalStructures, 100);
});

async function initTemporalStructures() {
    const container = document.getElementById('temporal-canvas');
    if (!container) {
        console.error('temporal-canvas container not found');
        return;
    }
    
    console.log('Initializing temporal structures...');
    
    // Clear any existing content
    container.innerHTML = '';
    
    try {
        // Load D3
        if (!window.d3) {
            console.log('Loading D3...');
            await loadScript('https://d3js.org/d3.v7.min.js');
            console.log('D3 loaded successfully');
        }
        
        // Create simple test data
        const testData = createTestData();
        
        // Create the treemap
        createSimpleTreemap(container, testData);
        
    } catch (error) {
        console.error('Error in temporal structures:', error);
        container.innerHTML = '<p style="color: red;">Error: ' + error.message + '</p>';
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log('Script loaded:', src);
            resolve();
        };
        script.onerror = (e) => {
            console.error('Script failed to load:', src, e);
            reject(e);
        };
        document.head.appendChild(script);
    });
}

function createTestData() {
    // Simple test data for major US states across different years
    const years = [1790, 1850, 1900, 1950, 1990];
    const states = [
        { name: 'California', values: [0, 93000, 1485000, 10586000, 29760000], region: 'West' },
        { name: 'Texas', values: [0, 213000, 3049000, 7711000, 16987000], region: 'South' },
        { name: 'New York', values: [340000, 3097000, 7269000, 14830000, 17990000], region: 'Northeast' },
        { name: 'Florida', values: [0, 87000, 529000, 2771000, 12938000], region: 'South' },
        { name: 'Pennsylvania', values: [434000, 2312000, 6302000, 10498000, 11882000], region: 'Northeast' },
        { name: 'Illinois', values: [0, 851000, 4822000, 8712000, 11431000], region: 'Midwest' },
        { name: 'Ohio', values: [0, 1980000, 4158000, 7947000, 10847000], region: 'Midwest' },
        { name: 'Michigan', values: [0, 398000, 2421000, 6372000, 9295000], region: 'Midwest' },
        { name: 'Georgia', values: [83000, 906000, 2216000, 3445000, 6478000], region: 'South' },
        { name: 'North Carolina', values: [394000, 869000, 1894000, 4062000, 6629000], region: 'South' }
    ];
    
    return { years, states };
}

function createSimpleTreemap(container, data) {
    const width = 720;
    const height = 400;
    
    console.log('Creating treemap with data:', data);
    
    // Create title
    const titleDiv = container.appendChild(document.createElement('div'));
    titleDiv.style.cssText = 'font-size: 18px; font-weight: bold; margin-bottom: 10px; text-align: center;';
    titleDiv.textContent = 'US Population by State - Test Data';
    
    // Create year display
    const yearDiv = container.appendChild(document.createElement('div'));
    yearDiv.style.cssText = 'font-size: 16px; margin-bottom: 10px; text-align: center;';
    
    // Create scrubber
    const scrubberDiv = container.appendChild(document.createElement('div'));
    scrubberDiv.style.cssText = 'margin-bottom: 20px; text-align: center;';
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = data.years.length - 1;
    slider.value = 0;
    slider.style.width = '300px';
    
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.style.marginLeft = '10px';
    
    scrubberDiv.appendChild(slider);
    scrubberDiv.appendChild(playButton);
    
    // Create chart container
    const chartContainer = container.appendChild(document.createElement('div'));
    chartContainer.style.cssText = 'border: 1px solid #ddd; background: white; padding: 10px;';
    
    let currentYear = 0;
    let playing = false;
    let interval;
    
    // Color scale for regions
    const colorScale = d3.scaleOrdinal()
        .domain(['Northeast', 'South', 'Midwest', 'West'])
        .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']);
    
    function updateChart(yearIndex) {
        currentYear = yearIndex;
        const year = data.years[yearIndex];
        yearDiv.textContent = `Year: ${year}`;
        
        // Prepare data for this year
        const yearData = data.states
            .map(state => ({
                name: state.name,
                value: state.values[yearIndex] || 0,
                region: state.region
            }))
            .filter(d => d.value > 0)
            .sort((a, b) => b.value - a.value);
        
        console.log(`Year ${year} data:`, yearData);
        
        // Create hierarchy
        const root = d3.hierarchy({ children: yearData })
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        
        // Create treemap
        const treemap = d3.treemap()
            .size([width, height])
            .padding(2)
            .round(true);
        
        treemap(root);
        
        // Clear previous chart
        chartContainer.innerHTML = '';
        
        // Create SVG
        const svg = d3.create('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [0, 0, width, height])
            .style('max-width', '100%')
            .style('height', 'auto');
        
        // Create rectangles
        const leaf = svg.selectAll('g')
            .data(root.leaves())
            .join('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);
        
        leaf.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => colorScale(d.data.region))
            .attr('stroke', 'white')
            .attr('stroke-width', 1);
        
        // Add text
        leaf.append('text')
            .attr('x', 4)
            .attr('y', 16)
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .style('fill', 'white')
            .text(d => d.data.name);
        
        leaf.append('text')
            .attr('x', 4)
            .attr('y', 32)
            .style('font-size', '10px')
            .style('fill', 'white')
            .text(d => d3.format('.2s')(d.data.value));
        
        // Add tooltips
        leaf.append('title')
            .text(d => `${d.data.name}: ${d3.format(',')(d.data.value)}`);
        
        chartContainer.appendChild(svg.node());
    }
    
    // Event handlers
    slider.oninput = function() {
        updateChart(parseInt(this.value));
    };
    
    playButton.onclick = function() {
        if (playing) {
            clearInterval(interval);
            playButton.textContent = 'Play';
            playing = false;
        } else {
            playButton.textContent = 'Pause';
            playing = true;
            interval = setInterval(() => {
                currentYear = (currentYear + 1) % data.years.length;
                slider.value = currentYear;
                updateChart(currentYear);
            }, 1500);
        }
    };
    
    // Initial render
    updateChart(0);
}