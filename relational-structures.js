// Relational Structures - Contemporary Digital Artists Network
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initRelationalStructures, 100);
});

async function initRelationalStructures() {
    const container = document.getElementById('relational-container');
    if (!container) {
        console.error('relational-container not found');
        return;
    }
    
    console.log('Initializing relational structures...');
    
    // Clear any existing content
    container.innerHTML = '';
    
    try {
        // Load D3
        if (!window.d3) {
            console.log('Loading D3...');
            await loadScript('https://d3js.org/d3.v7.min.js');
            console.log('D3 loaded successfully');
        }
        
        // Load CSV data
        const [nodesData, edgesData] = await Promise.all([
            loadCSV('./nodes.csv'),
            loadCSV('./edges.csv')
        ]);
        
        // Create the network visualization
        createArtistNetwork(container, nodesData, edgesData);
        
    } catch (error) {
        console.error('Error in relational structures:', error);
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

async function loadCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return d3.csvParse(text);
}

function createArtistNetwork(container, nodesData, edgesData) {
    const width = 1600;
    const height = 1200;
    
    console.log('Creating artist network with nodes:', nodesData.length, 'edges:', edgesData.length);
    
    // Create title
    const titleDiv = container.appendChild(document.createElement('div'));
    titleDiv.style.cssText = 'font-size: 20px; font-weight: 700; margin-bottom: 8px; text-align: center; color: #333;';
    titleDiv.textContent = 'Contemporary Digital Artists Network';
    
    // Create description
    const descDiv = container.appendChild(document.createElement('div'));
    descDiv.style.cssText = 'font-size: 14px; margin-bottom: 20px; text-align: center; color: #666; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.4;';
    descDiv.textContent = 'Interactive network showing relationships between contemporary digital and computational artists. Node size reflects influence, connections show collaborations and mentorships.';
    
    // Create chart container
    const chartContainer = container.appendChild(document.createElement('div'));
    chartContainer.style.cssText = 'border: 1px solid #ddd; background: #fafafa; padding: 15px; border-radius: 8px;';
    
    // Process the data
    const { nodes, links } = processArtistData(nodesData, edgesData);
    
    // Create SVG
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .style('max-width', '100%')
        .style('height', 'auto')
        .style('background', '#ffffff');
    
    // Add arrow marker for directed relationships
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 25)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .append('path')
        .attr('d', 'M 0,-3 L 6,0 L 0,3')
        .attr('fill', '#666')
        .attr('opacity', 0.7);
    
    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links)
            .id(d => d.id)
            .distance(d => {
                // Adjust distance based on relationship strength
                return 120 - (d.strength * 40);
            }))
        .force('charge', d3.forceManyBody()
            .strength(d => {
                // Artists with more followers have stronger repulsion
                return -300 - (d.followers / 200);
            }))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => d.size + 8));
    
    // Create links
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', d => {
            switch(d.relationship) {
                case 'mentorship': return '#e74c3c';
                case 'collaboration': return '#3498db';
                case 'colleagues': return '#2ecc71';
                case 'peer_network': return '#f39c12';
                default: return '#95a5a6';
            }
        })
        .attr('stroke-width', d => Math.sqrt(d.strength) * 3 + 1)
        .attr('stroke-opacity', 0.7)
        .attr('marker-end', d => d.type === 'directed' ? 'url(#arrowhead)' : null);
    
    // Create nodes
    const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', d => d.size)
        .attr('fill', d => d.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2.5)
        .style('cursor', 'pointer')
        .call(drag(simulation));
    
    // Create labels
    const label = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font-size', '11px')
        .style('font-weight', '600')
        .style('fill', '#fff')
        .style('pointer-events', 'none')
        .style('text-shadow', '1px 1px 2px rgba(0,0,0,0.7)')
        .text(d => d.name.split(' ')[0]); // First name only
    
    // Create tooltip
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0, 0, 0, 0.9)')
        .style('color', 'white')
        .style('padding', '12px')
        .style('border-radius', '6px')
        .style('font-size', '13px')
        .style('font-family', 'system-ui, sans-serif')
        .style('pointer-events', 'none')
        .style('opacity', 0)
        .style('max-width', '280px')
        .style('line-height', '1.4');
    
    // Add interactions
    node.on('mouseover', function(event, d) {
        // Highlight connected links
        link.style('stroke-opacity', l => 
            l.source.id === d.id || l.target.id === d.id ? 1 : 0.2
        );
        
        // Show tooltip
        tooltip.transition()
            .duration(200)
            .style('opacity', 1);
        
        tooltip.html(`
            <strong style="color: ${d.color};">${d.name}</strong><br/>
            <span style="color: #bbb;">Role:</span> ${d.role.replace('_', ' ')}<br/>
            <span style="color: #bbb;">Medium:</span> ${d.medium.replace('_', ' ')}<br/>
            <span style="color: #bbb;">Followers:</span> ${d3.format(',')(d.followers)}<br/>
            <span style="color: #bbb;">Projects:</span> ${d.projects}
        `)
        .style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 15) + 'px');
    })
    .on('mouseout', function() {
        link.style('stroke-opacity', 0.7);
        tooltip.transition()
            .duration(300)
            .style('opacity', 0);
    });
    
    // Update positions on tick
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
        
        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
        
        label
            .attr('x', d => d.x)
            .attr('y', d => d.y);
    });
    
    // Add legend
    const legend = svg.append('g')
        .attr('transform', 'translate(20, 20)');
    
    const legendData = [
        { type: 'mentorship', color: '#e74c3c', label: 'Mentorship' },
        { type: 'collaboration', color: '#3498db', label: 'Collaboration' },
        { type: 'colleagues', color: '#2ecc71', label: 'Colleagues' },
        { type: 'peer_network', color: '#f39c12', label: 'Peer Network' }
    ];
    
    const legendItems = legend.selectAll('.legend-item')
        .data(legendData)
        .join('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 18})`);
    
    legendItems.append('line')
        .attr('x1', 0)
        .attr('x2', 16)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 3);
    
    legendItems.append('text')
        .attr('x', 20)
        .attr('y', 0)
        .attr('dy', '0.32em')
        .style('font-size', '11px')
        .style('font-weight', '500')
        .style('fill', '#333')
        .text(d => d.label);
    
    chartContainer.appendChild(svg.node());
    
    function drag(simulation) {
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
        
        return d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);
    }
}

function processArtistData(nodesData, edgesData) {
    console.log('Processing artist network data...');
    
    // Process nodes
    const nodes = nodesData.map(d => ({
        id: d.id,
        name: d.name,
        role: d.role,
        medium: d.medium,
        followers: +d.followers,
        projects: +d.projects,
        size: +d.size,
        color: d.color
    }));
    
    // Process links
    const links = edgesData.map(d => ({
        source: d.source,
        target: d.target,
        relationship: d.relationship,
        collaboration: d.collaboration,
        since: d.since ? +d.since : null,
        strength: +d.strength,
        type: d.type,
        medium_overlap: d.medium_overlap
    }));
    
    console.log('Processed nodes:', nodes.length, 'links:', links.length);
    
    return { nodes, links };
}